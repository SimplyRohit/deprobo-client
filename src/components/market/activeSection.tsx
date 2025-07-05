import { useEffect, useState } from "react";
import { useContractFunctions } from "@/components/contract/contract-functions";
import { PublicKey } from "@solana/web3.js";
import { BN, ProgramAccount } from "@coral-xyz/anchor";
import { Card } from "../ui/card";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";

type MarketCardProps = ProgramAccount<{
  authority: PublicKey;
  bet: boolean;
  category: string;
  createdAt: BN;
  closeTime: BN;
  question: string;
  yesPool: PublicKey;
  noPool: PublicKey;
  totalYes: BN;
  totalNo: BN;
  yesUsers: BN;
  noUsers: BN;
  resolved: boolean;
  winningOutcome: boolean;
}>[];

type BetCardProps = ProgramAccount<{
  user: PublicKey;
  market: PublicKey;
  amount: BN;
  outcome: boolean;
  claimed: boolean;
}>[];

export default function ActiveSection() {
  const { program, resolveMarket, placeBet, createMarket } =
    useContractFunctions();
  const [markets, setmarkets] = useState<MarketCardProps | undefined>([]);
  const [bets, setbets] = useState<BetCardProps | undefined[]>([]);
  const wallet = useWallet();

  useEffect(() => {
    const fetchMarkets = async () => {
      const allMarkets = await program.account.market.all();

      setmarkets(allMarkets);
    };
    fetchMarkets();
  }, []);

  const handleResolve = async (outcome: boolean, marketpda: PublicKey) => {
    await resolveMarket.mutateAsync({ marketPda: marketpda, outcome });
  };

  const handleBet = async (
    amount: number,
    outcome: boolean,
    marketpda: PublicKey
  ) => {
    await placeBet.mutateAsync({
      marketPda: marketpda,
      amountLamports: new BN(amount),
      outcome,
    });
  };
  console.log(markets?.map((market) => JSON.stringify(market)));
  return (
    <div className="flex md:flex-row flex-wrap justify-between p-5 gap-5 flex-col my-10  w-full">
      {markets
        ?.filter((market) => !market.account.resolved)
        .map((market) => (
          <Card
            key={market.publicKey.toBase58()}
            className="w-full bg-white gap-0 max-w-[350px] !shadow h-[250px] p-5"
          >
            <h1 className="flex my-2 text-gray-500 text-sm font-medium items-center">
              <Users className="w-4 h-4 mr-2 stroke-3" />
              Traders
            </h1>
            <div className="flex max-h-[6rem] min-h-[5rem] my-2 ">
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
