// import { inngest } from "../client";
// import { BorshCoder, Idl } from "@coral-xyz/anchor";
// import IDL from "@/contract/prediction_market.json";
// import { db } from "@/db";
// import { marketsTable, betsTable } from "@/db/schema";
// import { eq, sql } from "drizzle-orm";
// import * as anchor from "@coral-xyz/anchor";

// const coder = new BorshCoder(IDL as Idl);
// export const handleSolanaBatch = inngest.createFunction(
//   { id: "handle-solana-batch" },
//   { event: "solana/batch.received" },
//   async ({ event, step }) => {
//     const { body } = event.data;
//     console.log("got the body");

//     if (!Array.isArray(body)) {
//       console.log("Invalid batch structure");
//       return { status: "bad_payload" };
//     }

//     await Promise.all(
//       body.map((tx) =>
//         step.sendEvent("Fan out", {
//           name: "solana/transaction.received",
//           data: tx,
//         })
//       )
//     );

//     return { status: "fan_out_complete", count: body.length };
//   }
// );

// export const handleSolanaTransaction = inngest.createFunction(
//   { id: "handle-solana-transaction" },
//   { event: "solana/transaction.received" },
//   async ({ event }) => {
//     const tx = event.data;
//     console.log("got the bodytx");

//     if (!tx?.meta?.logMessages) {
//       console.log("No logMessages in transaction");
//       return { status: "bad_tx" };
//     }

//     const logMessages: string[] = tx.meta.logMessages;
//     const dataLine = logMessages.find((line) =>
//       line.startsWith("Program data:")
//     );
//     const programData = dataLine?.split("Program data: ")[1] ?? "";

//     if (!programData) {
//       console.log("No program data found");
//       return { status: "no_program_data" };
//     }

//     const buffer = Buffer.from(programData, "base64");
//     // @ts-expect-error  just want to ignore this file
//     const decoded = coder.events.decode(buffer);

//     if (!decoded) {
//       console.log("Failed to decode event");
//       return { status: "decode_failed" };
//     }

//     console.log(`Decoded: ${decoded.name}`);

//     switch (decoded.name) {
//       case "MarketCreated":
//         await db.insert(marketsTable).values({
//           category: decoded.data["category"] as string,
//           closeTime: Number(decoded.data["close_time"]),
//           createdAt: Number(decoded.data["created_at"]),
//           marketid: decoded.data["market"].toBase58(),
//           question: decoded.data["question"] as string,
//           authority: decoded.data["authority"].toBase58(),
//         });
//         break;

//       case "BetPlaced":
//         await db.transaction(async (tx) => {
//           const amount =
//             (decoded.data["amount"] as number) / anchor.web3.LAMPORTS_PER_SOL;
//           console.log(amount);
//           const outcome = decoded.data["outcome"] as boolean;
//           const authority = decoded.data["user"].toBase58();
//           const marketid = decoded.data["market"].toBase58();

//           await tx.insert(betsTable).values({
//             amount,
//             authority,
//             marketid,
//             outcome,
//           });

//           if (outcome) {
//             await tx
//               .update(marketsTable)
//               .set({
//                 yesPool: sql`${marketsTable.yesPool} + ${amount}`,
//                 yesUsers: sql`${marketsTable.yesUsers} + 1`,
//               })
//               .where(eq(marketsTable.marketid, marketid));
//           } else {
//             await tx
//               .update(marketsTable)
//               .set({
//                 noPool: sql`${marketsTable.noPool} + ${amount}`,
//                 noUsers: sql`${marketsTable.noUsers} + 1`,
//               })
//               .where(eq(marketsTable.marketid, marketid));
//           }
//         });
//         break;

//       case "MarketResolved":
//         await db
//           .update(marketsTable)
//           .set({
//             resolved: true,
//             winningOutcome: decoded.data["winning_outcome"] as boolean,
//           })
//           .where(eq(marketsTable.marketid, decoded.data["market"].toBase58()));
//         break;

//       case "WinningsClaimed":
//         await db
//           .update(betsTable)
//           .set({ claimed: true })
//           .where(eq(betsTable.authority, decoded.data["user"].toBase58()));
//         break;

//       default:
//         console.log(`[Unhandled] Event name: ${decoded.name}`);
//         break;
//     }

//     return { status: "ok" };
//   }
// );
