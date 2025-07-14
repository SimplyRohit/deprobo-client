import { WalletContextState } from "@solana/wallet-adapter-react";
import { BetCardProps, MarketCardProps } from "@/app/market/page";
import { PublicKey } from "@solana/web3.js";
import { Card } from "../ui/card";
import { Users } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { BN } from "@coral-xyz/anchor";

export default function ActiveSection({
  markets,
  bets,
  wallet,
  handleResolve,
  handleBet,
}: {
  markets: MarketCardProps;
  bets: BetCardProps;
  wallet: WalletContextState;
  handleResolve: (outcome: boolean, marketPda: PublicKey) => Promise<void>;
  handleBet: (
    amount: number,
    outcome: boolean,
    marketPda: PublicKey
  ) => Promise<void>;
}) {
  const betMarketIds = new Set(bets?.map((b) => b.account.market.toBase58()));
  const activeMarkets = markets?.filter(
    (market) =>
      !market.account.resolved && !betMarketIds.has(market.publicKey.toBase58())
  );

  const LAMPORTS_PER_SOL = 1e9;

  // Convert lamports to SOL
  const formatSol = (bn: BN) => (bn.toNumber() / LAMPORTS_PER_SOL).toFixed(2);

  // Calculate potential return for a bet based on current pool and new bet
  const calculatePotentialReturn = (
    betAmount: number,
    totalOwn: number,
    totalOpposing: number
  ) => {
    if (totalOwn === 0) return betAmount + totalOpposing; // If no bets on this side, winner takes all opposing pool
    return betAmount + (betAmount / totalOwn) * totalOpposing; // Proportional return based on pool size
  };

  return (
    <div className="flex flex-wrap justify-center p-5 gap-6 my-10 w-full">
      {activeMarkets?.map((market) => {
        const [betAmount, setBetAmount] = useState<number>(1); // Individual bet amount state for each card
        const totalYes = market.account.totalYes.toNumber() / LAMPORTS_PER_SOL;
        const totalNo = market.account.totalNo.toNumber() / LAMPORTS_PER_SOL;
        const totalPool = totalYes + totalNo;
        const yesUsers = market.account.yesUsers.toNumber();
        const noUsers = market.account.noUsers.toNumber();
        const totalBettors = yesUsers + noUsers;
        const yesPercentage =
          totalBettors > 0 ? (yesUsers / totalBettors) * 100 : 0;
        const noPercentage =
          totalBettors > 0 ? (noUsers / totalBettors) * 100 : 0;
        const isAuthority =
          wallet.publicKey && market.account.authority.equals(wallet.publicKey);

        // Calculate potential return with new bet amount
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

        return (
          <Card
            key={market.publicKey.toBase58()}
            className="w-full max-w-[350px] min-h-[400px] p-6 bg-white shadow-lg rounded-lg flex flex-col justify-between"
          >
            <div>
              <h1 className="flex my-2 text-gray-500 text-sm font-medium items-center">
                <Users className="w-4 h-4 mr-2 stroke-3" />
                Traders
              </h1>
              <h1 className="text-lg font-semibold line-clamp-2 mb-2">
                {market.account.question}
              </h1>
              <p className="text-gray-400 text-sm mb-4">
                {new Date(
                  market.account.createdAt.toNumber() * 1000
                ).toLocaleString()}
              </p>
              {/* Graph showing bettor distribution */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>
                    Yes: {yesUsers} bettors (
                    {formatSol(market.account.totalYes)} SOL)
                  </span>
                  <span>
                    No: {noUsers} bettors ({formatSol(market.account.totalNo)}{" "}
                    SOL)
                  </span>
                </div>
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
                <p className="text-xs text-gray-600 mt-1">
                  {yesPercentage > noPercentage
                    ? "Slight chance for Yes"
                    : "Slight chance for No"}
                </p>
              </div>
              {!isAuthority && (
                <div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">
                      Bet Amount (1-10 SOL):
                    </label>
                    <Input
                      type="number"
                      value={betAmount}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 1 && value <= 10) setBetAmount(value);
                      }}
                      min="1"
                      max="10"
                      step="0.1"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  {/* Expected winnings display */}
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">
                      Expected Winnings:
                    </p>
                    <p className="text-green-600 mb-1">
                      Yes: {potentialReturnYes.toFixed(2)} SOL
                    </p>
                    <p className="text-red-600">
                      No: {potentialReturnNo.toFixed(2)} SOL
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 1 && value <= 10) setBetAmount(value);
                      }}
                      onClick={() =>
                        handleBet(betAmount, false, market.publicKey)
                      }
                      className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md"
                    >
                      NO
                    </Button>
                    <Button
                      onClick={() =>
                        handleBet(betAmount, true, market.publicKey)
                      }
                      className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md"
                    >
                      YES
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {isAuthority && (
              <div className="flex space-x-2 mt-5">
                <Button
                  onClick={() => handleResolve(false, market.publicKey)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  Resolve to No
                </Button>
                <Button
                  onClick={() => handleResolve(true, market.publicKey)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  Resolve to Yes
                </Button>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
