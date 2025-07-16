"use client";

import { WalletContextState } from "@solana/wallet-adapter-react";
import { BetCardProps, MarketCardProps } from "@/app/market/page";
import { PublicKey } from "@solana/web3.js";
import UnifiedMarketCard from "./UnifiedMarketCard";
import { useState } from "react";

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
  const [betAmounts, setBetAmounts] = useState<Record<string, number>>({});

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5 my-10 w-full">
      {activeMarkets?.map((market) => {
        const key = market.publicKey.toBase58();
        const betAmount = betAmounts[key] || 0;

        return (
          <UnifiedMarketCard
            key={key}
            market={market}
            mode="active"
            betAmount={betAmount}
            setBetAmount={(v) =>
              setBetAmounts((prev) => ({ ...prev, [key]: v }))
            }
            wallet={wallet}
            handleBet={handleBet}
            handleResolve={handleResolve}
          />
        );
      })}
    </div>
  );
}
