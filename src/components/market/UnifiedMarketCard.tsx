"use client";

import { useEffect, useMemo, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Users } from "lucide-react";
import { useContractFunctions } from "@/contract/contract-functions";
import { ActiveMarket, MyBetMarket, ResolvedMarket } from "@/lib/types";

const formatTimeLeft = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${h}h ${m}m ${s}s`;
};

export default function UnifiedMarketCard({
  market,
  mode,
  wallet,
}: {
  market: ActiveMarket | MyBetMarket | ResolvedMarket;
  mode: "active" | "my-bets" | "resolved";
  wallet: WalletContextState;
}) {
  const [betAmount, setBetAmount] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const { placeBet, resolveMarket, claimWinnings } = useContractFunctions();

  const marketid = market.marketid;
  const question = market.question;
  const createdAt = (market.createdAt || 0) * 1000;
  const totalYes = market.yesUsers;
  const totalNo = market.noUsers;

  const closeTime = (market as ActiveMarket).closeTime * 1000;
  const yesPool = (market as ActiveMarket).yesPool;
  const noPool = (market as ActiveMarket).noPool;

  const traders = totalYes + totalNo;
  const yesPercentage = traders ? (totalYes / traders) * 100 : 0;
  const noPercentage = traders ? (totalNo / traders) * 100 : 0;

  const won =
    (market as MyBetMarket).resolved &&
    (market as MyBetMarket).userOutcome ===
      (market as MyBetMarket).winningOutcome;

  useEffect(() => {
    if (mode !== "active") return;

    const updateTime = () => {
      const remaining = Math.max(
        Math.floor((closeTime - Date.now()) / 1000),
        0
      );
      setTimeLeft(remaining);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [closeTime, mode]);

  const potentialReturn = useMemo(() => {
    const calc = (amt: number, own: number, opp: number) => {
      const loserPoolAfterFee = opp * 0.8;
      const totalOwnPool = own + amt;
      if (totalOwnPool === 0) return 0;
      const share = amt / totalOwnPool;
      return parseFloat((amt + share * loserPoolAfterFee).toFixed(2));
    };
    return {
      yes: calc(betAmount, yesPool, noPool),
      no: calc(betAmount, noPool, yesPool),
    };
  }, [betAmount, yesPool, noPool]);

  const isInvalidBet = betAmount < 1 || betAmount > 10;

  const handleBet = async (amount: number, outcome: boolean) => {
    try {
      await placeBet.mutateAsync({
        marketPda: new PublicKey(marketid),
        amountLamports: amount,
        outcome,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleResolve = async (outcome: boolean) => {
    try {
      await resolveMarket.mutateAsync({
        marketPda: new PublicKey(marketid),
        outcome,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleClaim = async () => {
    try {
      await claimWinnings.mutateAsync({ marketPda: new PublicKey(marketid) });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Card className="relative w-full font-bold max-w-[360px] p-6 text-white rounded-lg flex flex-col justify-between">
      <div>
        <h1 className="flex my-2 text-gray-400 text-sm  items-center">
          <Users className="w-4 h-4 mr-2 stroke-3" /> Traders {traders}
        </h1>
        <h1 className="text-lg">
          {question.length > 26 ? question.slice(0, 28) + "..." : question}
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <DialogTitle className="text-end cursor-pointer text-xs opacity-80 text-emerald-600">
              SeeMore
            </DialogTitle>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <h1 className="break-words">{question}</h1>
          </DialogContent>
        </Dialog>

        <div className="flex justify-between">
          <p className="text-gray-400 text-sm mb-4">
            {new Date(createdAt).toLocaleDateString()}{" "}
            {new Date(createdAt).toLocaleTimeString()}
          </p>
          {mode === "active" && (
            <p
              className={cn(
                "text-gray-400 text-sm mb-4",
                timeLeft === 0 && "animate-pulse text-rose-600 font-bold"
              )}
            >
              {timeLeft > 0 ? formatTimeLeft(timeLeft) : "Closed"}
            </p>
          )}
        </div>

        {mode === "active" && (
          <>
            <div className="mb-4 text-xs">
              <div className="flex justify-between mb-2">
                <span>Yes: {totalYes} bettors</span>
                <span>No: {totalNo} bettors</span>
              </div>
              <div className="flex w-full h-6 rounded overflow-hidden">
                <div
                  className="bg-emerald-900"
                  style={{ width: `${yesPercentage}%` }}
                />
                <div
                  className="bg-rose-900"
                  style={{ width: `${noPercentage}%` }}
                />
              </div>
              <p className="text-gray-600 my-1">
                {traders === 0
                  ? "No bets yet"
                  : yesPercentage === noPercentage
                  ? "Even chance"
                  : yesPercentage > noPercentage
                  ? "chance for Yes"
                  : "chance for No"}
              </p>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Bet Amount (1-10 SOL)
              </label>
              <Input
                disabled={timeLeft === 0}
                type="number"
                defaultValue={1}
                onChange={(e) => setBetAmount(e.target.valueAsNumber || 0)}
                className="w-full p-2 h-8 my-1 border bg-white text-black border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4 font-bold text-sm">
              <p>Expected Winnings:</p>
              <p className="text-emerald-700 text-xs">
                Yes: {potentialReturn.yes} SOL
              </p>
              <p className="text-rose-700 text-xs">
                No: {potentialReturn.no} SOL
              </p>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={() => handleBet(betAmount, false)}
                disabled={isInvalidBet || timeLeft === 0 || placeBet.isPending}
                className="w-full !shadow-none bg-rose-900 hover:bg-rose-800 text-white"
              >
                NO
              </Button>
              <Button
                onClick={() => handleBet(betAmount, true)}
                disabled={isInvalidBet || timeLeft === 0 || placeBet.isPending}
                className="w-full !shadow-none bg-emerald-900 hover:bg-emerald-800 text-white"
              >
                YES
              </Button>
            </div>
          </>
        )}

        {mode === "my-bets" && (
          <div className="mt-5">
            <Button
              onClick={handleClaim}
              disabled={
                !won ||
                claimWinnings.isPending ||
                (market as MyBetMarket).claimed
              }
              className={cn(
                "w-full !shadow-none",
                won
                  ? "bg-emerald-900"
                  : (market as MyBetMarket).resolved
                  ? "bg-rose-900"
                  : "bg-gray-400"
              )}
            >
              {(market as MyBetMarket).resolved
                ? won
                  ? (market as MyBetMarket).claimed
                    ? "Already Claimed"
                    : "Claim Winnings"
                  : "You didn’t win"
                : "Wait for result"}
            </Button>
          </div>
        )}

        {mode === "resolved" && (
          <div className="mt-5">
            {(market as ResolvedMarket).resolved ? (
              <Button
                className={cn(
                  "w-full !shadow-none text-white",
                  (market as ResolvedMarket).winningOutcome
                    ? "bg-emerald-900"
                    : "bg-rose-900"
                )}
              >
                Result:{" "}
                {(market as ResolvedMarket).winningOutcome ? "YES" : "NO"}
              </Button>
            ) : (market as ResolvedMarket).authority ===
              wallet.publicKey?.toBase58() ? (
              <div className="flex gap-2">
                <Button
                  onClick={() => handleResolve(true)}
                  disabled={resolveMarket.isPending}
                  className="w-full !shadow-none bg-emerald-900 text-white"
                >
                  Resolve to YES
                </Button>
                <Button
                  onClick={() => handleResolve(false)}
                  disabled={resolveMarket.isPending}
                  className="w-full !shadow-none  bg-rose-900 text-white"
                >
                  Resolve to NO
                </Button>
              </div>
            ) : (
              <Button
                className="w-full !shadow-none bg-gray-400 text-white"
                disabled
              >
                Waiting for result
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
