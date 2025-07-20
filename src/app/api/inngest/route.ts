// app/api/inngest/route.ts
import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { handleSolanaEvent } from "@/inngest/handlers/solana-events";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [handleSolanaEvent],
});
