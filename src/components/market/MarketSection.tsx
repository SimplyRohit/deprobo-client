"use client";
import { useEffect, useState } from "react";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import {
  getActiveMarkets,
  getMyBets,
  getResolvedMarkets,
} from "@/app/actions/getMarkets";
import { useContractFunctions } from "@/contract/contract-functions";
import UnifiedMarketCard from "./UnifiedMarketCard";
import { MarketRow } from "@/lib/types";
import { toast } from "sonner";
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
        let result: MarketRow[] | string = [];
        if (mode === "active") {
          result = await getActiveMarkets(user);
        } else if (mode === "my-bets") {
          result = await getMyBets(user);
        } else {
          result = await getResolvedMarkets();
        }
        if (typeof result === "string") {
          toast.error(`db:error : ${result}`);
          return;
        }
        setMarkets(result);
      } catch (error) {
        console.log(error);
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
    try {
      await placeBet.mutateAsync({
        marketPda: new PublicKey(marketId),
        amountLamports: amount,
        outcome,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleResolve = async (outcome: boolean, marketId: string) => {
    try {
      await resolveMarket.mutateAsync({
        marketPda: new PublicKey(marketId),
        outcome,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleClaim = async (marketId: string) => {
    try {
      await claimWinnings.mutateAsync({ marketPda: new PublicKey(marketId) });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <p className="p-5 text-gray-500 text-center">Loading…</p>;
  }
  if (Markets.length === 0) {
    return <p className="p-5 text-center text-gray-500">No markets to show.</p>;
  }

  return (
    <div className="flex w-full flex-wrap my-8  justify-center md:justify-start px-3 gap-11">
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
