"use client";
import { PublicKey } from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAnchorProvider } from "@/providers/solana-provider";
import { toast } from "sonner";
import { cluster, getProgram, programId } from "./contract-exports";
import * as anchor from "@coral-xyz/anchor";
export function useContractFunctions() {
  const provider = useAnchorProvider();
  const program = useMemo(() => getProgram(provider, programId), [provider]);

  const createMarket = useMutation({
    mutationKey: ["PredictionMarket", "createMarket", { cluster }],
    mutationFn: async ({
      question,
      close_time,
      category,
    }: {
      question: string;
      close_time: number;
      category: string;
    }) => {
      const creator = provider.wallet.publicKey!;
      if (!creator) throw new Error("Wallet not connected");
      const createdAt = new anchor.BN(Math.floor(Date.now() / 1000));
      const createdAtSeed = createdAt.toTwos(64).toArrayLike(Buffer, "le", 8);
      const closeTime = createdAt.add(
        new anchor.BN(Math.floor(close_time * 3600))
      );
      console.log(createdAt.ton, closeTime);
      const [marketPda, marketBump] = await PublicKey.findProgramAddress(
        [Buffer.from("market"), creator.toBuffer(), createdAtSeed],
        program.programId
      );

      console.log("Market PDA:", marketPda.toBase58());

      const [yesPoolPda] = await PublicKey.findProgramAddress(
        [Buffer.from("yes_pool"), marketPda.toBuffer()],
        program.programId
      );

      const [noPoolPda] = await PublicKey.findProgramAddress(
        [Buffer.from("no_pool"), marketPda.toBuffer()],
        program.programId
      );

      const txSig = await program.methods
        .createMarket(createdAt, closeTime, question, category)
        .accounts({
          creator,
          // @ts-expect-error // im aspecting the wr
          market: marketPda,
          yesPool: yesPoolPda,
          noPool: noPoolPda,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      return txSig;
    },
    onSuccess: (sig) => toast.success(`Created: ${sig}`),
    onError: (err) => {
      console.error(err);
      toast.error("Failed to create market");
    },
  });

  const placeBet = useMutation({
    mutationKey: ["PredictionMarket", "placeBet", { cluster }],
    mutationFn: async ({
      marketPda,
      amountLamports,
      outcome,
    }: {
      marketPda: PublicKey;
      amountLamports: number;
      outcome: boolean;
    }) => {
      const user = provider.wallet.publicKey;
      if (!user) throw new Error("Wallet not connected");

      const [yesPoolPda] = await PublicKey.findProgramAddress(
        [Buffer.from("yes_pool"), marketPda.toBuffer()],
        program.programId
      );

      const [noPoolPda] = await PublicKey.findProgramAddress(
        [Buffer.from("no_pool"), marketPda.toBuffer()],
        program.programId
      );

      const txSig = await program.methods
        .placeBet(amountLamports, outcome)
        .accounts({
          market: marketPda,
          user,
          yesPool: yesPoolPda,
          noPool: noPoolPda,
        })
        .rpc();

      return txSig;
    },
    onSuccess: (sig) => toast.success(`Bet placed: ${sig}`),
    onError: (err) => {
      console.error(err);
      toast.error("Failed to place bet");
    },
  });

  const resolveMarket = useMutation({
    mutationKey: ["PredictionMarket", "resolveMarket", { cluster }],
    mutationFn: async ({
      marketPda,
      outcome,
    }: {
      marketPda: PublicKey;
      outcome: boolean;
    }) => {
      const txSig = await program.methods
        .resolveMarket(outcome)
        .accounts({
          market: marketPda,
        })
        .rpc();

      return txSig;
    },
    onSuccess: (sig) => toast.success(`Market resolved: ${sig}`),
    onError: (err) => {
      console.error(err);
      toast.error("Failed to resolve market");
    },
  });

  const claimWinnings = useMutation({
    mutationKey: ["PredictionMarket", "claimWinnings", { cluster }],
    mutationFn: async ({ marketPda }: { marketPda: PublicKey }) => {
      const user = provider.wallet.publicKey;
      if (!user) throw new Error("Wallet not connected");

      const [betPda] = await PublicKey.findProgramAddress(
        [Buffer.from("bet"), user.toBuffer(), marketPda.toBuffer()],
        program.programId
      );

      const [yesPoolPda] = await PublicKey.findProgramAddress(
        [Buffer.from("yes_pool"), marketPda.toBuffer()],
        program.programId
      );
      const [noPoolPda] = await PublicKey.findProgramAddress(
        [Buffer.from("no_pool"), marketPda.toBuffer()],
        program.programId
      );

      const txSig = await program.methods
        .claimWinnings()
        .accounts({
          market: marketPda,
          yesPool: yesPoolPda,
          noPool: noPoolPda,
          bet: betPda,
        })
        .rpc();

      return txSig;
    },
    onSuccess: (sig) => toast.success(`Winnings claimed: ${sig}`),
    onError: (err) => {
      console.error(err);
      toast.error("Failed to claim winnings");
    },
  });

  return {
    program,
    programId,
    createMarket,
    placeBet,
    resolveMarket,
    claimWinnings,
  };
}
