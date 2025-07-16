import { MarketCardProps } from "@/app/market/page";
import UnifiedMarketCard from "./UnifiedMarketCard";

export default function ResolvedMarkets({
  markets,
}: {
  markets: MarketCardProps;
}) {
  const resolvedMarkets = markets.filter(
    (market) => market.account.resolved === true
  );

  return (
    <div className="flex md:flex-row flex-wrap justify-between p-5 gap-5 flex-col my-10 w-full">
      {resolvedMarkets.length > 0 ? (
        resolvedMarkets.map((market) => (
          <UnifiedMarketCard
            key={market.publicKey.toBase58()}
            market={market}
            mode="resolved"
          />
        ))
      ) : (
        <p className="text-gray-500">No market is resolved yet.</p>
      )}
    </div>
  );
}
