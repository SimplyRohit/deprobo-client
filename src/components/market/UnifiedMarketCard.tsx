"use client";

import { Card } from "../ui/card";
import { Users } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { ProgramAccount } from "@coral-xyz/anchor";
import { Fragment } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { useContractFunctions } from "@/contract/contract-functions";

type MarketType = ProgramAccount<{
  authority: PublicKey;
  bet: boolean;
  createdAt: BN;
  closeTime: BN;
  yesPool: PublicKey;
  noPool: PublicKey;
  totalYes: BN;
  totalNo: BN;
  resolved: boolean;
  winningOutcome: boolean;
}>;

type CardMode = "active" | "my-bets" | "resolved";

interface UnifiedMarketCardProps {
  market: MarketType;
  mode: CardMode;
  betAmount?: number;
  setBetAmount?: (v: number) => void;
  wallet?: WalletContextState;
  handleBet?: (
    amount: number,
    outcome: boolean,
    marketPda: PublicKey
  ) => Promise<void>;
  handleResolve?: (outcome: boolean, marketPda: PublicKey) => Promise<void>;
  bet:
    | ProgramAccount<{
        user: PublicKey;
        market: PublicKey;
        amount: BN;
        outcome: boolean;
        claimed: boolean;
      }>
    | undefined;
  handleClaim: (marketPda: PublicKey) => Promise<void>;
}

export default function UnifiedMarketCard({
  market,
  mode,
  betAmount = 0,
  setBetAmount,
  wallet,
  handleBet,
  handleResolve,
  bet,
  handleClaim,
}: UnifiedMarketCardProps) {
  const LAMPORTS_PER_SOL = 1e9;
  const formatSol = (bn: BN) => (bn.toNumber() / LAMPORTS_PER_SOL).toFixed(2);
  const totalYes = market.account.totalYes;
  const totalNo = market.account.totalNo;
  // const yesUsers = market.account.yesUsers;
  // const noUsers = market.account.noUsers;
  // const totalBettors = yesUsers + noUsers;
  // const yesPercentage = totalBettors > 0 ? (yesUsers / totalBettors) * 100 : 0;
  // const noPercentage = totalBettors > 0 ? (noUsers / totalBettors) * 100 : 0;
  const isAuthority =
    wallet?.publicKey && market.account.authority.equals(wallet.publicKey);

  const calculatePotentialReturn = (
    betAmount: number,
    totalOwn: number,
    totalOpposing: number
  ) => {
    if (totalOwn === 0) return betAmount + totalOpposing;
    return betAmount + (betAmount / totalOwn) * totalOpposing;
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

  const renderContent = () => {
    switch (mode) {
      case "active":
        return (
          <Fragment>
            <div className="mb-4">
              {/* <div className="flex justify-between text-xs mb-2"> */}
              {/* <span>
                  Yes: {yesUsers} bettors ({formatSol(market.account.totalYes)}{" "}
                  SOL)
                </span>
                <span>
                  No: {noUsers} bettors ({formatSol(market.account.totalNo)}{" "}
                  SOL)
                </span> */}
            </div>

            {/* {totalBettors > 0 ? (
                <div className="flex w-full h-6 rounded overflow-hidden">
                  <div
                    className="bg-green-500"
                    style={{ width: `${yesPercentage}%` }}
                  ></div>
                  <div
                    className="bg-red-500"
                    style={{ width: `${noPercentage}%` }}
                  ></div>
                </div>
              ) : (
                <div className="flex w-full h-6 rounded overflow-hidden opacity-50">
                  <div className="bg-green-500 w-1/2"></div>
                  <div className="bg-red-500 w-1/2"></div>
                </div>
              )} */}
            {/* 
              <p className="text-xs text-gray-600 mt-1">
                {totalBettors === 0
                  ? "No bets yet"
                  : yesPercentage === noPercentage
                  ? "Even chance"
                  : yesPercentage > noPercentage
                  ? "Slight chance for Yes"
                  : "Slight chance for No"}
              </p>
            </div> */}

            {!isAuthority && (
              <div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">
                    Bet Amount (1-10 SOL)
                  </label>
                  <Input
                    type="number"
                    value={betAmount}
                    onChange={(e) => {
                      const v = e.target.valueAsNumber;
                      setBetAmount?.(isNaN(v) ? 0 : v);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">Expected Winnings:</p>
                  <p className="text-green-600 mb-1">
                    Yes: {potentialReturnYes.toFixed(2)} SOL
                  </p>
                  <p className="text-red-600">
                    No: {potentialReturnNo.toFixed(2)} SOL
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() =>
                      handleBet?.(betAmount, false, market.publicKey)
                    }
                    className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md"
                  >
                    NO
                  </Button>
                  <Button
                    onClick={() =>
                      handleBet?.(betAmount, true, market.publicKey)
                    }
                    className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md"
                  >
                    YES
                  </Button>
                </div>
              </div>
            )}

            {isAuthority && (
              <div className="flex space-x-2 mt-5">
                <Button
                  onClick={() => handleResolve?.(false, market.publicKey)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  Resolve to No
                </Button>
                <Button
                  onClick={() => handleResolve?.(true, market.publicKey)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  Resolve to Yes
                </Button>
              </div>
            )}
          </Fragment>
        );

      case "my-bets":
        const won =
          market.account.resolved &&
          bet?.account.outcome === market.account.winningOutcome;
        return (
          <div className="flex space-x-2 mt-5 justify-between">
            <Button
              onClick={() => {
                if (won) {
                  handleClaim(market.publicKey);
                }
              }}
              disabled={!won}
              className={cn(
                "w-full border-0 shadow-[2_2_0_2px] shadow-gray-500",
                won
                  ? "bg-[#00C950]"
                  : market.account.resolved
                  ? "bg-[#FB2C36]"
                  : "bg-[#FCA794]"
              )}
            >
              {market.account.resolved
                ? won
                  ? bet.account.claimed
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
            <Button
              className={cn(
                "w-full border-0 shadow-[2_2_0_2px] shadow-gray-500 bg-[#FCA794]",
                market.account.winningOutcome ? "bg-[#00C950]" : "bg-[#FB2C36]"
              )}
            >
              Result: {market.account.winningOutcome ? "YES" : "NO"}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="relative w-full max-w-[350px] h-auto p-6 bg-white shadow-lg rounded-lg flex flex-col justify-between">
      <div>
        <h1 className="flex my-2 text-gray-500 text-sm font-medium items-center">
          <Users className="w-4 h-4 mr-2 stroke-3" />
          Traders
        </h1>

        <Fragment>
          {/* <h1 className="flex text-lg w-full">
            {market.account.question.length > 26
              ? market.account.question.slice(0, 25) + "..."
              : market.account.question}
          </h1> */}

          <Dialog>
            <DialogTrigger asChild>
              <DialogTitle className="flex ml-[260px] text-end text-xs opacity-80 text-blue-600 w-full">
                SeeMore
              </DialogTitle>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              {/* <h1 className="break-words">{market.account.question}</h1> */}
            </DialogContent>
          </Dialog>
        </Fragment>

        <p className="text-gray-400 text-sm mb-4">
          {new Date(
            market.account.createdAt.toNumber() * 1000
          ).toLocaleString()}
        </p>

        {renderContent()}
      </div>
    </Card>
  );
}
