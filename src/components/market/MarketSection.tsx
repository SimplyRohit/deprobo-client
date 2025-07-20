"use client";
import { useEffect, useState } from "react";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import {
  getActiveMarkets,
  getMyBets,
  getResolvedMarkets,
} from "@/app/actions/getMarkets";
import { useContractFunctions } from "@/contract/contract-functions";
import UnifiedMarketCard from "./UnifiedMarketCard";
import { MarketRow } from "@/lib/types";
type Mode = "active" | "my-bets" | "resolved";

export default function MarketSection({
  mode,
  wallet,
}: {
  mode: Mode;
  wallet: WalletContextState;
}) {
  const [Markets, setMarkets] = useState<MarketRow[]>([]);
  const [loading, setLoading] = useState(false);
  const { placeBet, resolveMarket, claimWinnings } = useContractFunctions();
  useEffect(() => {
    if (!wallet.publicKey) return;
    setLoading(true);
    (async () => {
      console.log("triggerd");
      try {
        const user = wallet.publicKey!.toBase58();
        let result: MarketRow[] = [];
        if (mode === "active") {
          result = await getActiveMarkets(user);
        } else if (mode === "my-bets") {
          result = await getMyBets(user);
        } else {
          result = await getResolvedMarkets();
        }
        setMarkets(result);
      } finally {
        setLoading(false);
      }
    })();
  }, [mode]);

  const handleBet = async (
    amount: number,
    outcome: boolean,
    marketId: string
  ) => {
    await placeBet.mutateAsync({
      marketPda: new PublicKey(marketId),
      amountLamports: new BN(amount),
      outcome,
    });
  };

  const handleResolve = async (outcome: boolean, marketId: string) => {
    await resolveMarket.mutateAsync({
      marketPda: new PublicKey(marketId),
      outcome,
    });
  };

  const handleClaim = async (marketId: string) => {
    await claimWinnings.mutateAsync({ marketPda: new PublicKey(marketId) });
  };

  if (loading) {
    return <p className="p-5 text-center">Loading…</p>;
  }
  if (Markets.length === 0) {
    return <p className="p-5 text-center text-gray-500">No markets to show.</p>;
  }

  return (
    <div className="flex md:justify-between flex-wrap p-5 gap-5 items-center justify-center">
      {Markets.map((market) => {
        return (
          <UnifiedMarketCard
            key={market.marketid}
            market={market}
            mode={mode}
            wallet={wallet}
            handleBet={handleBet}
            handleResolve={handleResolve}
            handleClaim={handleClaim}
          />
        );
      })}
    </div>
  );
}
