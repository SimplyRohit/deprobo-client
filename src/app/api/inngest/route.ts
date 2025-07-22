import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import {
  handleSolanaBatch,
  handleSolanaTransaction,
} from "@/inngest/handlers/solana-events";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [handleSolanaBatch, handleSolanaTransaction],
});
