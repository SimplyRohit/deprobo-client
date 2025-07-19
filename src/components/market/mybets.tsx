import { BetCardProps, MarketCardProps } from "@/app/market/page";
import UnifiedMarketCard from "./UnifiedMarketCard";
import { PublicKey } from "@solana/web3.js";
export default function MyBets({
  handleClaim,
  markets,
  bets,
}: {
  handleClaim: (marketPda: PublicKey) => Promise<void>;
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
              handleClaim={handleClaim}
              key={market.publicKey.toBase58()}
              market={market}
              mode="my-bets"
              bet={bet}
            />
          );
        })
      ) : (
        <p className="text-gray-500">You have not placed any bets yet.</p>
      )}
    </div>
  );
}
