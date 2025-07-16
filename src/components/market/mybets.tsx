import { BetCardProps, MarketCardProps } from "@/app/market/page";
import UnifiedMarketCard from "./UnifiedMarketCard";
export default function MyBets({
  markets,
  bets,
}: {
  markets: MarketCardProps;
  bets: BetCardProps;
}) {
  const betMarketIds = new Set(bets.map((b) => b.account.market.toBase58()));
  const myMarkets = markets.filter((market) =>
    betMarketIds.has(market.publicKey.toBase58())
  );

  return (
    <div className="flex md:flex-row flex-wrap justify-between p-5 gap-5 flex-col my-10 w-full">
      {myMarkets.length > 0 ? (
        myMarkets.map((market) => {
          const bet = bets.find(
            (b) => b.account.market.toBase58() === market.publicKey.toBase58()
          );
          return (
            <UnifiedMarketCard
              key={market.publicKey.toBase58()}
              market={market}
              mode="my-bets"
              betOutcome={bet?.account.outcome}
            />
          );
        })
      ) : (
        <p className="text-gray-500">You have not placed any bets yet.</p>
      )}
    </div>
  );
}
