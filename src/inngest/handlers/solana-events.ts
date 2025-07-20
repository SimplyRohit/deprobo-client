import { inngest } from "../client";
import { BorshCoder, Idl } from "@coral-xyz/anchor";
import IDL from "@/contract/prediction_market.json";
import { db } from "@/db";
import { marketsTable, betsTable } from "@/db/schema";
import { sql, eq } from "drizzle-orm";

const coder = new BorshCoder(IDL as Idl);

export const handleSolanaEvent = inngest.createFunction(
  { id: "handle-solana-event" },
  { event: "solana/event.received" },
  async ({ event }) => {
    const { body } = event.data;

    if (!Array.isArray(body) || !body[0]?.meta?.logMessages) {
      console.error("Invalid payload structure");
      return { status: "bad_payload" };
    }

    const logMessages: string[] = body[0].meta.logMessages;
    const dataLine = logMessages.find((line) =>
      line.startsWith("Program data:")
    );
    const programData = dataLine?.split("Program data: ")[1] ?? "";

    if (!programData) {
      console.error("No program data found");
      return { status: "no_program_data" };
    }

    const buffer = Buffer.from(programData, "base64");
    // @ts-expect-error
    const decoded = coder.events.decode(buffer);

    if (!decoded) {
      console.error("Failed to decode event");
      return { status: "decode_failed" };
    }

    console.log(`Decoded: ${decoded.name}`);

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
        break;

      case "BetPlaced":
        await db.transaction(async (tx) => {
          await tx.insert(betsTable).values({
            amount: decoded.data["amount"] as number,
            outcome: decoded.data["outcome"] as boolean,
            authority: decoded.data["user"].toBase58(),
            marketid: decoded.data["market"].toBase58(),
          });
        });
        break;

      case "MarketResolved":
        await db
          .update(marketsTable)
          .set({
            resolved: true,
            winningOutcome: decoded.data["winning_outcome"] as boolean,
          })
          .where(eq(marketsTable.marketid, decoded.data["market"].toBase58()));
        break;

      case "WinningsClaimed":
        await db
          .update(betsTable)
          .set({ claimed: true })
          .where(eq(betsTable.authority, decoded.data["user"].toBase58()));
        break;

      default:
        console.log(`[Unhandled] Event name: ${decoded.name}`);
        break;
    }

    return { status: "ok" };
  }
);
