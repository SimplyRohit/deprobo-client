import { NextRequest, NextResponse } from "next/server";
import { BorshCoder, Idl } from "@coral-xyz/anchor";
import IDL from "@/contract/prediction_market.json";
import { db } from "@/db";
import { marketsTable, betsTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import * as anchor from "@coral-xyz/anchor";
import crypto from "crypto";
import { QuickNodeTransaction, WebhookPayload } from "@/lib/types";

export const dynamic = "force-dynamic";

const coder = new BorshCoder(IDL as Idl);

export async function POST(req: NextRequest) {
  const nonce = req.headers.get("x-qn-nonce") || "";
  const timestamp = req.headers.get("x-qn-timestamp") || "";
  const givenSignature = req.headers.get("x-qn-signature") || "";

  if (!nonce || !timestamp || !givenSignature) {
    console.error("Missing QuickNode signature headers");
    return NextResponse.json({ status: 200, message: "Missing headers" });
  }

  const rawBody = await req.text();
  const signatureData = nonce + timestamp + rawBody;
  const hmac = crypto.createHmac(
    "sha256",
    Buffer.from(process.env.HELIUS_WEBHOOK_TOKEN!)
  );
  hmac.update(Buffer.from(signatureData));
  const computedSignature = hmac.digest("hex");

  if (
    !crypto.timingSafeEqual(
      Buffer.from(computedSignature, "hex"),
      Buffer.from(givenSignature, "hex")
    )
  ) {
    console.warn("Invalid QuickNode signature");
    return NextResponse.json({ status: 200, message: "Invalid signature" });
  }

  const body: WebhookPayload = JSON.parse(rawBody);
  let transactions: QuickNodeTransaction[] = [];

  if (Array.isArray(body?.data)) {
    transactions = body.data.flat();
  } else {
    console.warn("Invalid body: no data array");
    return NextResponse.json({ status: 200, message: "Invalid payload" });
  }

  for (const tx of transactions) {
    try {
      const logs: string[] = tx?.logs || tx?.meta?.logMessages || [];
      const dataLine = logs.find((line) => line.startsWith("Program data:"));
      if (!dataLine) {
        console.log(`[${tx.signature}] No Program data found`);
        continue;
      }

      const buffer = Buffer.from(dataLine.split("Program data: ")[1], "base64");
      // @ts-expect-error decoder is typed loosely

      const decoded = coder.events.decode(buffer);
      if (!decoded) {
        console.log(`[${tx.signature}] Failed to decode event`);
        continue;
      }
      switch (decoded.name) {
        case "MarketCreated": {
          const marketid = decoded.data.market.toBase58();
          const existing = await db
            .select()
            .from(marketsTable)
            .where(eq(marketsTable.marketid, marketid))
            .limit(1);

          if (existing.length) {
            console.log(`[${tx.signature}] Market ${marketid} already exists`);
            continue;
          }
          await db.insert(marketsTable).values({
            marketid,
            authority: decoded.data.authority.toBase58(),
            question: decoded.data.question,
            category: decoded.data.category,
            createdAt: Number(decoded.data.created_at),
            closeTime: Number(decoded.data.close_time),
          });
          console.log(decoded.name);
          break;
        }

        case "BetPlaced": {
          const amountSOL =
            Number(decoded.data.amount) / anchor.web3.LAMPORTS_PER_SOL;
          const marketid = decoded.data.market.toBase58();
          const authority = decoded.data.user.toBase58();
          const outcome = decoded.data.outcome as boolean;

          await db.insert(betsTable).values({
            marketid,
            authority,
            amount: amountSOL,
            outcome,
          });
          const poolField = outcome ? "yesPool" : "noPool";
          const userCount = outcome ? "yesUsers" : "noUsers";
          await db
            .update(marketsTable)
            .set({
              [poolField]: sql`${marketsTable[poolField]} + ${amountSOL}`,
              [userCount]: sql`${marketsTable[userCount]} + 1`,
            })
            .where(eq(marketsTable.marketid, marketid));

          console.log(decoded.name);
          break;
        }

        case "MarketResolved": {
          await db
            .update(marketsTable)
            .set({
              resolved: true,
              winningOutcome: decoded.data.winning_outcome as boolean,
            })
            .where(eq(marketsTable.marketid, decoded.data.market.toBase58()));

          console.log(decoded.name);
          break;
        }

        case "WinningsClaimed": {
          await db
            .update(betsTable)
            .set({ claimed: true })
            .where(eq(betsTable.authority, decoded.data.user.toBase58()));

          console.log(decoded.name);
          break;
        }

        default:
          console.log(decoded.name);
      }
    } catch (err) {
      console.error("Processing error:", err);
    }
  }

  return NextResponse.json({
    status: 200,
    message: `Processed  transactions`,
  });
}
