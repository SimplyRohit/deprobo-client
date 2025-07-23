import { NextRequest, NextResponse } from "next/server";
import { BorshCoder, Idl } from "@coral-xyz/anchor";
import IDL from "@/contract/prediction_market.json";
import { db } from "@/db";
import { marketsTable, betsTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import * as anchor from "@coral-xyz/anchor";
export const dynamic = "force-dynamic";

const coder = new BorshCoder(IDL as Idl);

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== process.env.HELIUS_WEBHOOK_TOKEN) {
    console.warn("Unauthorized webhook call");
    return NextResponse.json(
      { status: 401, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();
  if (!Array.isArray(body)) {
    console.warn("Invalid payload shape");
    return NextResponse.json(
      { status: 400, message: "Invalid body format" },
      { status: 400 }
    );
  }

  for (const tx of body) {
    try {
      const logs: string[] = tx?.meta?.logMessages || [];
      const dataLine = logs.find((line) => line.startsWith("Program data:"));
      if (!dataLine) {
        console.log("No program data found");
        continue;
      }
      const buffer = Buffer.from(dataLine.split("Program data: ")[1], "base64");
      // @ts-expect-error decoder is typed loosely
      const decoded = coder.events.decode(buffer);
      if (!decoded) {
        console.log("Failed to decode event");
        continue;
      }

      switch (decoded.name) {
        case "MarketCreated":
          await db.insert(marketsTable).values({
            marketid: decoded.data.market.toBase58(),
            authority: decoded.data.authority.toBase58(),
            question: decoded.data.question,
            category: decoded.data.category,
            createdAt: Number(decoded.data.created_at),
            closeTime: Number(decoded.data.close_time),
          });
          console.log(decoded.name);
          break;

        case "BetPlaced":
          await db.transaction(async (txDb) => {
            const amountSOL =
              Number(decoded.data.amount) / anchor.web3.LAMPORTS_PER_SOL;
            const marketid = decoded.data.market.toBase58();
            const authority = decoded.data.user.toBase58();
            const outcome = decoded.data.outcome as boolean;

            await txDb
              .insert(betsTable)
              .values({ marketid, authority, amount: amountSOL, outcome });
            const poolField = outcome ? "yesPool" : "noPool";
            const userCount = outcome ? "yesUsers" : "noUsers";

            await txDb
              .update(marketsTable)
              .set({
                [poolField]: sql`${
                  (marketsTable as any)[poolField]
                } + ${amountSOL}`,
                [userCount]: sql`${(marketsTable as any)[userCount]} + 1`,
              })
              .where(eq(marketsTable.marketid, marketid));
          });
          console.log(decoded.name);
          break;

        case "MarketResolved":
          await db
            .update(marketsTable)
            .set({
              resolved: true,
              winningOutcome: decoded.data.winning_outcome as boolean,
            })
            .where(eq(marketsTable.marketid, decoded.data.market.toBase58()));
          console.log(decoded.name);
          break;

        case "WinningsClaimed":
          await db
            .update(betsTable)
            .set({ claimed: true })
            .where(eq(betsTable.authority, decoded.data.user.toBase58()));
          console.log(decoded.name);
          break;

        default:
          console.info(`[Skipped] Unhandled event: ${decoded.name}`);
      }
    } catch (e) {
      console.error("Error processing transaction:", e);
    }
  }

  // await inngest.send({
  //   name: "solana/batch.received",
  //   data: { body },
  // });
  return NextResponse.json({
    status: 200,
    message: "Processed all transactions.",
  });
}
