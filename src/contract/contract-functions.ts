"use client";
import { PublicKey } from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAnchorProvider } from "@/providers/solana-provider";
import { toast } from "sonner";
import { getProgram, programId } from "./contract-exports";
import * as anchor from "@coral-xyz/anchor";

export function useContractFunctions() {
  const explorerUrl = (sig: string) =>
    `https://explorer.solana.com/tx/${sig}?cluster=devnet`;
  const provider = useAnchorProvider();
  const program = useMemo(
    () => getProgram(provider, programId),
    [provider, programId]
  );
  const publicKey = useMemo(
    () => provider.wallet.publicKey,
    [provider.wallet.publicKey]
  );

  const createMarket = useMutation({
    mutationKey: ["PredictionMarket", "createMarket"],
    mutationFn: async ({
      question,
      close_time,
      category,
    }: {
      question: string;
      close_time: number;
      category: string;
    }) => {
      const creator = publicKey!;
      if (!creator) throw new Error("Wallet not connected");
      const createdAt = new anchor.BN(Math.floor(Date.now() / 1000));
      const createdAtSeed = createdAt.toTwos(64).toArrayLike(Buffer, "le", 8);
      const closeTime = createdAt.add(
        new anchor.BN(Math.floor(close_time * 3600))
      );
      const [marketPda] = await PublicKey.findProgramAddress(
        [Buffer.from("market"), creator.toBuffer(), createdAtSeed],
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
    onSuccess: (sig) =>
      toast.success("Market Created:", {
        action: {
          label: "View",
          onClick: () => {
            window.open(explorerUrl(sig!));
          },
        },
      }),
    onError: (err) => {
      console.log(err);
    },
  });

  const placeBet = useMutation({
    mutationKey: ["PredictionMarket", "placeBet"],
    mutationFn: async ({
      marketPda,
      amountLamports,
      outcome,
    }: {
      marketPda: PublicKey;
      amountLamports: number;
      outcome: boolean;
    }) => {
      const user = publicKey;
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
        .placeBet(
          new anchor.BN(amountLamports * anchor.web3.LAMPORTS_PER_SOL),
          outcome
        )
        .accounts({
          market: marketPda,
          user,
          yesPool: yesPoolPda,
          noPool: noPoolPda,
        })
        .rpc();

      return txSig;
    },
    onSuccess: (sig) =>
      toast.success("Bet Placed:", {
        action: {
          label: "View",
          onClick: () => {
            window.open(explorerUrl(sig));
          },
        },
      }),
    onError: (err) => {
      console.log(err);
    },
  });

  const resolveMarket = useMutation({
    mutationKey: ["PredictionMarket", "resolveMarket"],
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
    onSuccess: (sig) =>
      toast.success("Market Resolved:", {
        action: {
          label: "View",
          onClick: () => {
            window.open(explorerUrl(sig));
          },
        },
      }),
    onError: (err) => {
      console.log(err);
    },
  });

  const claimWinnings = useMutation({
    mutationKey: ["PredictionMarket", "claimWinnings"],
    mutationFn: async ({ marketPda }: { marketPda: PublicKey }) => {
      const user = publicKey;
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
    onSuccess: (sig) =>
      toast.success("Winning claimed:", {
        action: {
          label: "View",
          onClick: () => {
            window.open(explorerUrl(sig));
          },
        },
      }),
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    program,
    programId,
    createMarket,
    placeBet,
    resolveMarket,
    claimWinnings,
    publicKey,
  };
}
