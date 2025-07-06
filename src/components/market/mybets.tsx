import { BetCardProps, MarketCardProps } from "@/app/market/page";
import { Users } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

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
        myMarkets.map((market) => (
          <Card
            key={market.publicKey.toBase58()}
            className="w-full bg-white gap-0 max-w-[350px] !shadow h-[250px] p-5"
          >
            <h1 className="flex my-2 text-gray-500 text-sm font-medium items-center">
              <Users className="w-4 h-4 mr-2 stroke-3" />
              Traders
            </h1>
            <div className="flex max-h-[6rem] min-h-[5rem] my-2">
              <h1 className="text-xl break-all flex w-full font-semibold ">
                {market.account.question}
              </h1>
            </div>
            <p className="text-gray-400">
              {new Date(
                market.account.createdAt.toNumber() * 1000
              ).toLocaleString()}
            </p>

            <div className="flex space-x-2 mt-3 justify-between">
              <Button className="w-full border-0 shadow-[2_2_0_2px] shadow-gray-500 bg-[#FCA794]">
                {market.account.resolved ? "Claim" : "Wait for result"}
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">You have not placed any bets yet.</p>
      )}
    </div>
  );
}
