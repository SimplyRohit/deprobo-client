// components/market/UnifiedMarketCard.tsx
"use client";
import { Card } from "../ui/card";
import { Users } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Fragment, useEffect, useState } from "react";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ActiveMarket, MyBetMarket, ResolvedMarket } from "@/lib/types";

type Mode = "active" | "my-bets" | "resolved";
type MarketRow = ActiveMarket | MyBetMarket | ResolvedMarket;

export default function UnifiedMarketCard({
  market,
  mode,
  wallet,
  handleBet,
  handleResolve,
  handleClaim,
}: {
  market: MarketRow;
  mode: Mode;
  wallet: WalletContextState;
  handleBet?: (amount: number, outcome: boolean, marketId: string) => void;
  handleResolve?: (outcome: boolean, marketId: string) => void;
  handleClaim?: (marketId: string) => void;
}) {
  const [betAmount, setBetAmount] = useState(0);
  const marketid = market.marketid;
  const question = market.question;
  const createdAt = market.createdAt * 1000;
  const closeTime = (market as ActiveMarket).closeTime * 1000;
  const totalYes = (market as ActiveMarket).yesUsers || 0;
  const totalNo = (market as ActiveMarket).noUsers || 0;
  const yesPool = (market as ActiveMarket).yesPool || 0;
  const noPool = (market as ActiveMarket).noPool || 0;
  const traders = totalYes + totalNo;
  const yesPercentage = traders > 0 ? (yesPool / traders) * 100 : 0;
  const noPercentage = traders > 0 ? (noPool / traders) * 100 : 0;

  const calculatePotentialReturn = (amt: number, own: number, opp: number) => {
    if (own === 0) return amt + opp;
    return amt + (amt / own) * opp;
  };

  const potentialReturnYes = calculatePotentialReturn(
    betAmount,
    totalYes,
    totalNo
  );
  const potentialReturnNo = calculatePotentialReturn(
    betAmount,
    totalNo,
    totalYes
  );

  const won =
    mode === "my-bets" &&
    (market as MyBetMarket).resolved &&
    (market as MyBetMarket).userOutcome ===
      (market as MyBetMarket).winningOutcome;

  const [timeLeft, setTimeLeft] = useState(() => {
    return Math.max(Math.floor((closeTime - Date.now()) / 1000), 0);
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [marketid]);

  const hours = Math.floor(timeLeft / 3600);
  const mins = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;

  const renderContent = () => {
    const isInvalidBet = betAmount < 1 || betAmount > 10;

    switch (mode) {
      case "active":
        return (
          <Fragment>
            <div>
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-2">
                  <span>
                    Yes: {totalYes} bettors ({yesPool} SOL)
                  </span>
                  <span>
                    No: {totalNo} bettors ({noPool} SOL)
                  </span>
                </div>
              </div>

              {traders > 0 ? (
                <div className="flex w-full h-6 rounded overflow-hidden">
                  <div
                    className="bg-green-500"
                    style={{ width: `${yesPercentage}%` }}
                  />
                  <div
                    className="bg-red-500"
                    style={{ width: `${noPercentage}%` }}
                  />
                </div>
              ) : (
                <div className="flex w-full h-6 rounded overflow-hidden opacity-50">
                  <div className="bg-green-500 w-1/2" />
                  <div className="bg-red-500 w-1/2" />
                </div>
              )}

              <p className="text-xs text-gray-600 my-1">
                {traders === 0
                  ? "No bets yet"
                  : yesPercentage === noPercentage
                  ? "Even chance"
                  : yesPercentage > noPercentage
                  ? "Slight chance for Yes"
                  : "Slight chance for No"}
              </p>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  Bet Amount (1-10 SOL)
                </label>
                <Input
                  disabled={timeLeft === 0}
                  type="number"
                  value={betAmount}
                  onChange={(e) => {
                    const v = e.target.valueAsNumber;
                    setBetAmount(isNaN(v) ? 0 : v);
                  }}
                  className="w-full p-2 border bg-white text-black border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Expected Winnings:</p>
                <p className="text-green-600 mb-1">
                  Yes: {potentialReturnYes} SOL
                </p>
                <p className="text-red-600">No: {potentialReturnNo} SOL</p>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => handleBet?.(betAmount, false, marketid)}
                  disabled={isInvalidBet || timeLeft === 0}
                  className="w-full !shadow-none bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  NO
                </Button>
                <Button
                  disabled={isInvalidBet || timeLeft === 0}
                  onClick={() => handleBet?.(betAmount, true, marketid)}
                  className="w-full !shadow-none bg-green-500 hover:bg-green-600 text-white rounded-md"
                >
                  YES
                </Button>
              </div>
            </div>
          </Fragment>
        );

      case "my-bets":
        return (
          <div className="flex space-x-2 mt-5 justify-between">
            <Button
              onClick={() => {
                if (won) {
                  handleClaim?.(marketid);
                }
              }}
              disabled={!won}
              className={cn(
                "w-full border-0 !shadow-none shadow-gray-500",
                won
                  ? "bg-[#00C950]"
                  : (market as MyBetMarket).resolved
                  ? "bg-[#FB2C36]"
                  : "bg-[#FCA794]"
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
        );

      case "resolved":
        return (
          <div className="flex space-x-2 mt-5 justify-between">
            {(market as ResolvedMarket).resolved ? (
              <Button
                className={cn(
                  "w-full border-0 !shadow-none shadow-gray-500",
                  (market as ResolvedMarket).winningOutcome
                    ? "bg-[#00C950]"
                    : "bg-[#FB2C36]"
                )}
              >
                Result:{" "}
                {(market as ResolvedMarket).winningOutcome ? "YES" : "NO"}
              </Button>
            ) : (market as ResolvedMarket).authority ===
              wallet.publicKey?.toBase58() ? (
              <div className="flex space-x-2 w-full">
                <Button
                  onClick={() => handleResolve?.(false, marketid)}
                  className="w-full !shadow-none bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  Resolve to No
                </Button>
                <Button
                  onClick={() => handleResolve?.(true, marketid)}
                  className="w-full !shadow-none bg-green-500 hover:bg-green-600 text-white rounded-md"
                >
                  Resolve to Yes
                </Button>
              </div>
            ) : (
              <Button className="w-full border-0 !shadow-none shadow-gray-500 bg-gray-400">
                Waiting for result
              </Button>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="relative w-full max-w-[360px] h-auto p-6 text-white rounded-lg flex flex-col justify-between">
      <div>
        <h1 className="flex my-2 text-gray-400 text-sm font-medium items-center">
          <Users className="w-4 h-4 mr-2 stroke-3" />
          Traders {traders}
        </h1>

        <Fragment>
          <h1 className="flex text-lg w-full">
            {question.length > 26 ? question.slice(0, 25) + "..." : question}
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <DialogTitle className="text-end cursor-pointer text-xs opacity-80 text-green-600 w-full">
                SeeMore
              </DialogTitle>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <h1 className="break-words">{question}</h1>
            </DialogContent>
          </Dialog>
        </Fragment>

        <div className="flex justify-between">
          <p className="text-gray-400 text-sm mb-4">
            {new Date(createdAt).toLocaleString()}
          </p>
          {mode === "active" && (
            <p
              className={cn(
                "text-gray-400 text-sm mb-4",
                timeLeft === 0 ? "animate-pulse text-red-500 font-bold" : ""
              )}
            >
              {hours > 0 && `${hours} hrs `}
              {hours === 0 && mins > 0 && `${mins} mins `}
              {hours === 0 && mins === 0 && secs > 0 && `${secs} sec `}
              {timeLeft === 0 && "Closed"}
            </p>
          )}
        </div>

        {renderContent()}
      </div>
    </Card>
  );
}
