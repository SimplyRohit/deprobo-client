"use client";
import { useEffect, useState } from "react";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  getActiveMarkets,
  getMyBets,
  getResolvedMarkets,
} from "@/app/actions/getMarkets";
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
  const [marketsCache, setMarketsCache] = useState<
    Partial<Record<Mode, MarketRow[]>>
  >({});
  const [Markets, setMarkets] = useState<MarketRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!wallet.publicKey) return;
    if (marketsCache[mode]) {
      setMarkets(marketsCache[mode]!);
      return;
    }
    setLoading(true);
    (async () => {
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
        setMarketsCache((prev) => ({ ...prev, [mode]: result }));
        setMarkets(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [mode]);

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
          />
        );
      })}
    </div>
  );
}
