// import { NextRequest, NextResponse } from "next/server";
// import { BorshCoder } from "@coral-xyz/anchor";
// import { PublicKey } from "@solana/web3.js";
// import type { Idl } from "@coral-xyz/anchor";
// import IDL from "@/contract/prediction_market.json";

// export const runtime = "nodejs";

// // BorshCoder implementation
// function deserializeWithBorshCoder(base64Data: string) {
//   try {
//     const coder = new BorshCoder(IDL as Idl);
//     const buffer = Buffer.from(base64Data, "base64");
//     const event = coder.events.decode(buffer);
//     console.log("Successfully decoded event:", event);
//     return event;
//   } catch (error) {
//     console.error("BorshCoder deserialization error:", error);
//     try {
//       return fallbackDeserialize(base64Data);
//     } catch (fallbackError) {
//       console.error("Fallback deserialization also failed:", fallbackError);
//       throw error;
//     }
//   }
// }

// function fallbackDeserialize(base64Data: string) {
//   const buffer = Buffer.from(base64Data, "base64");
//   const discriminator = Array.from(buffer.slice(0, 8));
//   const eventDiscriminators = {
//     MarketResolved: [89, 67, 230, 95, 143, 106, 199, 202],
//     BetPlaced: [88, 88, 145, 226, 126, 206, 32, 0],
//   };
//   let eventType = null;
//   for (const [name, disc] of Object.entries(eventDiscriminators)) {
//     if (discriminator.every((val, i) => val === disc[i])) {
//       eventType = name;
//       break;
//     }
//   }
//   if (!eventType) {
//     throw new Error(
//       `Unknown event discriminator: [${discriminator.join(", ")}]`
//     );
//   }
//   const data = buffer.slice(8); // Skip discriminator
//   const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
//   switch (eventType) {
//     case "MarketResolved":
//       return {
//         name: "MarketResolved",
//         data: {
//           market: new PublicKey(data.slice(0, 32)),
//           winningOutcome: view.getUint8(32) === 1,
//         },
//       };

//     case "BetPlaced":
//       let offset = 0;
//       const market = new PublicKey(data.slice(offset, offset + 32));
//       offset += 32;
//       const user = new PublicKey(data.slice(offset, offset + 32));
//       offset += 32;
//       const amount = view.getBigUint64(offset, true); // little endian
//       offset += 8;
//       const outcome = view.getUint8(offset) === 1;
//       offset += 1;
//       const totalYes = view.getBigUint64(offset, true);
//       offset += 8;
//       const totalNo = view.getBigUint64(offset, true);
//       return {
//         name: "BetPlaced",
//         data: {
//           market,
//           user,
//           amount,
//           outcome,
//           totalYes,
//           totalNo,
//         },
//       };

//     default:
//       throw new Error(`Unknown event type: ${eventType}`);
//   }
// }

// function formatEventData(event: any) {
//   const formatted = {
//     eventName: event.name,
//     data: {},
//   };

//   for (const [key, value] of Object.entries(event.data)) {
//     if (value instanceof PublicKey) {
//       formatted.data[key] = value.toString();
//     } else if (typeof value === "bigint") {
//       formatted.data[key] = value.toString();
//     } else {
//       formatted.data[key] = value;
//     }
//   }

//   return formatted;
// }

// let config: any;

// async function handler(req: NextRequest) {
//   if (req.method === "GET") {
//     console.log("[Helius Webhook] This is a GET request");
//     return NextResponse.json({ config }, { status: 200 });
//   }

//   if (req.method === "POST") {
//     const response = NextResponse.json({ status: "ok" }, { status: 200 });

//     req
//       .json()
//       .then(async (body) => {
//         console.log("[Helius Webhook] This is a POST request");
//         config = body[0].meta.logMessages;

//         const instructionLine = config.find((line: string) =>
//           line.includes("Program log: Instruction:")
//         );

//         const dataLine = config.find((line: string) =>
//           line.startsWith("Program data:")
//         );

//         let instructionName = "";
//         if (instructionLine) {
//           instructionName = instructionLine.split("Instruction: ")[1] || "";
//         }

//         let programData = "";
//         if (dataLine) {
//           programData = dataLine.split("Program data: ")[1] || "";
//         }

//         console.log(`Instruction: ${instructionName}`);
//         console.log(`Program Data: ${programData}`);

//         if (programData) {
//           try {
//             const deserializedData = deserializeWithBorshCoder(programData);
//             const formattedData = formatEventData(deserializedData);
//             console.log(
//               "Deserialized Event Data:",
//               JSON.stringify(formattedData, null, 2)
//             );
//             switch (deserializedData.name) {
//               case "MarketResolved":
//                 console.log(
//                   `Market ${deserializedData.data.market} resolved with outcome: ${deserializedData.data.winningOutcome}`
//                 );
//                 break;

//               case "BetPlaced":
//                 console.log(
//                   `Bet placed on market ${deserializedData.data.market} by user ${deserializedData.data.user}`
//                 );
//                 console.log(
//                   `Amount: ${deserializedData.data.amount}, Outcome: ${deserializedData.data.outcome}`
//                 );
//                 console.log(
//                   `Total Yes: ${deserializedData.data.totalYes}, Total No: ${deserializedData.data.totalNo}`
//                 );
//                 break;

//               default:
//                 console.log(`Unknown event type: ${deserializedData.name}`);
//             }
//           } catch (error) {
//             console.error("Deserialization error:", error);
//             console.error("Raw program data:", programData);
//           }
//         }
//       })
//       .catch((err) => {
//         console.error("[Helius Webhook] JSON Parse Error:", err);
//       });

//     return response;
//   }
//   return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
// }

// export const GET = handler;
// export const POST = handler;
// //
