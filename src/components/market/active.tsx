import { WalletContextState } from "@solana/wallet-adapter-react";
import { BetCardProps, MarketCardProps } from "@/app/market/page";
import { PublicKey } from "@solana/web3.js";
import { Card } from "../ui/card";
import { Users } from "lucide-react";
import { Button } from "../ui/button";

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
  handleResolve: (outcome: boolean, marketpda: PublicKey) => Promise<void>;
  handleBet: (
    amount: number,
    outcome: boolean,
    marketpda: PublicKey
  ) => Promise<void>;
}) {
  const betMarketIds = new Set(bets?.map((b) => b.account.market.toBase58()));
  const activeMarkets = markets?.filter(
    (market) =>
      !market.account.resolved && !betMarketIds.has(market.publicKey.toBase58())
  );

  return (
    <div className="flex md:flex-row flex-wrap justify-between p-5 gap-5 flex-col my-10 w-full">
      {activeMarkets?.map((market) => (
        <Card className="w-full bg-white gap-0 max-w-[350px] !shadow h-[250px] p-5">
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
          {wallet.publicKey &&
          market.account.authority.equals(wallet.publicKey) ? (
            <div className="flex space-x-2 mt-3 justify-between">
              <Button
                onClick={() => handleResolve(false, market.publicKey)}
                className="w-full border-0 shadow-[2_2_0_2px] shadow-gray-500 bg-[#FCA794]"
              >
                Resolve to No
              </Button>
              <Button
                onClick={() => handleResolve(true, market.publicKey)}
                className="w-full border-0 !shadow bg-[#D0EFFA]"
              >
                Resolve to Yes
              </Button>
            </div>
          ) : (
            <div className="flex space-x-2 mt-3 justify-between">
              <Button
                onClick={() => handleBet(1, false, market.publicKey)}
                className="w-full border-0 shadow-[2_2_0_2px] shadow-gray-500 bg-[#FCA794]"
              >
                NO
              </Button>
              <Button
                onClick={() => handleBet(1, true, market.publicKey)}
                className="w-full border-0 !shadow bg-[#D0EFFA]"
              >
                YES
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
