import { NextRequest, NextResponse } from "next/server";
import { BorshCoder, Idl, Event } from "@coral-xyz/anchor";
import IDL from "@/contract/prediction_market.json";
export const runtime = "nodejs";
import { db } from "@/db";
import { marketsTable, betsTable } from "@/db/schema";
import { sql, eq } from "drizzle-orm";
interface DecodedEvent {
  name: string;
  data: Record<string, unknown>;
}

let config: string[] = [];

function deserializeEvent(base64Data: string): DecodedEvent {
  const coder = new BorshCoder(IDL as Idl);
  const buffer = Buffer.from(base64Data, "base64");
  // @ts-expect-error buffer is not a Uint8Array
  const event = coder.events.decode(buffer);
  if (!event) {
    throw new Error("BorshCoder failed: No event returned.");
  }
  return event as DecodedEvent;
}

async function processEvent(body: any) {
  try {
    if (!Array.isArray(body) || !body[0]?.meta?.logMessages) {
      console.error("Invalid payload structure");
      return;
    }

    config = body[0].meta.logMessages;

    const instructionLine = config.find((line) =>
      line.includes("Program log: Instruction:")
    );
    const dataLine = config.find((line) => line.startsWith("Program data:"));
    const instructionName =
      instructionLine?.split("Instruction: ")[1] ?? "Unknown";
    const programData = dataLine?.split("Program data: ")[1] ?? "";

    console.log(`Instruction: ${instructionName}`);
    console.log(`Program Data: ${programData}`);

    if (!programData) {
      console.error("No program data found");
      return;
    }

    const decoded = deserializeEvent(programData);
    console.log("Decoded Event:", decoded);

    switch (decoded.name) {
      case "MarketCreated":
        await db.insert(marketsTable).values({
          category: decoded.data["category"] as string,
          closeTime: Number(decoded.data["close_time"]),
          createdAt: Number(decoded.data["created_at"]),
          marketid: decoded.data["market"].toBase58(),
          question: decoded.data["question"] as string,
          authority: decoded.data["authority"].toBase58(),
        });

        console.log(
          `Market created: ${decoded.data["market"]} by ${decoded.data["authority"]}`
        );
        break;

      case "BetPlaced":
        await db.transaction(async (tx) => {
          await tx.insert(betsTable).values({
            amount: decoded.data["amount"] as number,
            outcome: decoded.data["outcome"] as boolean,
            authority: decoded.data["user"].toBase58(),
            marketid: decoded.data["market"].toBase58(),
          });

          if (decoded.data["outcome"] === true) {
            await tx
              .update(marketsTable)
              .set({ totalYes: sql`${marketsTable.totalYes} + 1` })
              .where(
                eq(marketsTable.marketid, decoded.data["market"].toBase58())
              );
          } else {
            await tx
              .update(marketsTable)
              .set({ totalNo: sql`${marketsTable.totalNo} + 1` })
              .where(
                eq(marketsTable.marketid, decoded.data["market"].toBase58())
              );
          }
        });
        console.log(
          await `Bet placed on market ${decoded.data["market"]} by user ${decoded.data["user"]}`
        );
        break;

      case "MarketResolved":
        await db
          .update(marketsTable)
          .set({
            resolved: true,
            winningOutcome: decoded.data["winning_outcome"] as boolean,
          })
          .where(eq(marketsTable.marketid, decoded.data["market"].toBase58()));

        console.log(
          `Market ${decoded.data["market"]} resolved with outcome: ${decoded.data["winning_outcome"]}`
        );
        break;

      case "WinningsClaimed":
        await db
          .update(betsTable)
          .set({
            claimed: true,
          })
          .where(eq(betsTable.authority, decoded.data["user"].toBase58()));
        console.log(
          `Winnings claimed for market ${decoded.data["market"]} by user ${decoded.data["user"]}`
        );
        break;

      default:
        console.log(`[Unhandled] Event name: ${decoded.name}`);
        break;
    }
  } catch (err) {
    console.error("[Helius Webhook] Async processing error:", err);
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const response = NextResponse.json({ status: 200 });
  processEvent(body);
  return response;
}
