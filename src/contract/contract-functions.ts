"use client";
import { PublicKey } from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAnchorProvider } from "@/providers/solana-provider";
import { toast } from "sonner";
import { cluster, getProgram, programId } from "./contract-exports";
import * as anchor from "@coral-xyz/anchor";
import { sha256 } from "js-sha256";

export function useContractFunctions() {
  const provider = useAnchorProvider();
  const program = useMemo(
    () => getProgram(provider, programId),
    [provider, programId]
  );

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
      const creatorid = provider.wallet.publicKey!;
      if (!creatorid) throw new Error("Wallet not connected");
      console.log(question.trim());
      const shahex = sha256.hex(question.trim());
      const hex = Buffer.from(shahex, "hex");
      const [marketPda] = await PublicKey.findProgramAddress(
        [Buffer.from("market"), creatorid.toBuffer(), hex],
        program.programId
      );
      console.log(marketPda);

      const [yesPoolPda] = await PublicKey.findProgramAddress(
        [Buffer.from("yes_pool"), marketPda.toBuffer()],
        program.programId
      );

      const [noPoolPda] = await PublicKey.findProgramAddress(
        [Buffer.from("no_pool"), marketPda.toBuffer()],
        program.programId
      );
      const txSig = await program.methods
        .createMarket(question, close_time, category)
        .accounts({
          creator: creatorid,
          // @ts-expect-error  issue bcz of invaild contract type
          market: marketPda,
          yesPool: yesPoolPda,
          noPool: noPoolPda,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      return txSig;
    },
    onSuccess: (signature) => toast.success(signature),
    onError: (e) => {
      console.log(e);
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
      const user = provider.wallet.publicKey!;
      if (!user) throw new Error("Wallet not connected");
      const [yesPoolPda] = await PublicKey.findProgramAddress(
        [Buffer.from("yes_pool"), marketPda.toBuffer()],
        program.programId
      );
      const [noPoolPda] = await PublicKey.findProgramAddress(
        [Buffer.from("no_pool"), marketPda.toBuffer()],
        program.programId
      );
      const txSig = program.methods
        .placeBet(amountLamports, outcome)
        .accounts({
          market: marketPda,
          user: user,
          yesPool: yesPoolPda,
          noPool: noPoolPda,
        })
        .rpc();
      return txSig;
    },
    onSuccess: (signature) => {
      toast.success(signature);
    },
    onError: () => {
      toast.error("Failed to run program");
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
      const user = provider.wallet.publicKey!;
      if (!user) throw new Error("Wallet not connected");

      const txSig = program.methods
        .resolveMarket(outcome)
        .accounts({
          market: marketPda,
        })
        .rpc();
      return txSig;
    },
    onSuccess: (signature) => {
      toast.success(signature);
    },
    onError: () => {
      toast.error("Failed to run program");
    },
  });

  const claimWinnings = useMutation({
    mutationKey: ["PredictionMarket", "claimWinnings", { cluster }],
    mutationFn: async ({ marketPda }: { marketPda: PublicKey }) => {
      const user = provider.wallet.publicKey!;
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

      const txSig = program.methods
        .claimWinnings()
        .accounts({
          market: marketPda,
          noPool: noPoolPda,
          yesPool: yesPoolPda,
          bet: betPda,
        })
        .rpc();
      return txSig;
    },
    onSuccess: (signature) => {
      toast.success(signature);
    },
    onError: () => {
      toast.error("Failed to run program");
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
