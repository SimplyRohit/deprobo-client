import { AnchorProvider, Program } from "@coral-xyz/anchor";
import IDL from "@/components/contract/idl/prediction_market.json";
import type { PredictionMarket } from "@/components/contract/types/prediction_market";
import { Cluster, PublicKey } from "@solana/web3.js";
export { PredictionMarket, IDL };
export const programId = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!);
export const cluster = process.env.NEXT_PUBLIC_SOLANA_ENDPOINT! as Cluster;

export function getProgram(
  provider: AnchorProvider,
  address?: PublicKey
): Program<PredictionMarket> {
  return new Program(
    {
      ...IDL,
      address: address ? address.toBase58() : IDL.address,
    } as PredictionMarket,
    provider
  );
}
