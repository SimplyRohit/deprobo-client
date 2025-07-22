import { Inngest } from "inngest";
export const inngest = new Inngest({
  id: "solana",
  eventKey: process.env.INNGEST_EVENT_KEY,
});
