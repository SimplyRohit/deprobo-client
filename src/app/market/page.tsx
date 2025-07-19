"use client";
import Header from "@/components/market/header";
import Wrapper from "@/components/wrapper";
import MarketFilter from "@/components/market/marketfilter";
import ActiveSection from "@/components/market/active";
import { useEffect, useState } from "react";
import { useContractFunctions } from "@/contract/contract-functions";
import { BN, ProgramAccount } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import MyBets from "@/components/market/mybets";
import ResolvedMarkets from "@/components/market/resolved";
import ConnectWalletButton from "@/components/connectwalletbutton";

export type MarketCardProps = ProgramAccount<{
  authority: PublicKey;
  bet: boolean;
  createdAt: BN;
  closeTime: BN;
  yesPool: PublicKey;
  noPool: PublicKey;
  totalYes: BN;
  totalNo: BN;
  resolved: boolean;
  winningOutcome: boolean;
}>[];

export type BetCardProps = ProgramAccount<{
  user: PublicKey;
  market: PublicKey;
  amount: BN;
  outcome: boolean;
  claimed: boolean;
}>[];

export default function MarketPage() {
  const wallet = useWallet();
  const { claimWinnings, program, resolveMarket, placeBet, createMarket } =
    useContractFunctions();
  const [markets, setMarkets] = useState<MarketCardProps>([]);
  const [bets, setBets] = useState<BetCardProps>([]);
  const [activeTab, setActiveTab] = useState<"active" | "my-bets" | "resolved">(
    "active"
  );
  const handleResolve = async (outcome: boolean, marketPda: PublicKey) => {
    await resolveMarket.mutateAsync({ marketPda, outcome });
  };

  const handleClaim = async (marketPda: PublicKey) => {
    await claimWinnings.mutateAsync({ marketPda });
  };
  const handleBet = async (
    amount: number,
    outcome: boolean,
    marketPda: PublicKey
  ) => {
    await placeBet.mutateAsync({
      marketPda,
      amountLamports: new BN(amount),
      outcome,
    });
  };

  useEffect(() => {
    console.log("useEffect triggered");
    if (!program) return;
    if (!wallet.publicKey) return;
    const fetchData = async () => {
      if (!program) return;
      const allMarkets = await program.account.market.all();
      const allBets = await program.account.betAccount.all();
      setMarkets(allMarkets || []);
      const myBets = allBets.filter((b) =>
        b.account.user.equals(wallet.publicKey!)
      );
      setBets(myBets || []);
    };
    fetchData();
  }, [
    placeBet.isSuccess,
    resolveMarket.isSuccess,
    createMarket.isSuccess,
    wallet.publicKey,
  ]);

  return (
    <div className="min-h-screen bg-[#efecff]">
      <Header />
      {wallet.publicKey ? (
        <Wrapper>
          <MarketFilter activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === "active" && (
            <ActiveSection
              markets={markets}
              bets={bets}
              wallet={wallet}
              handleResolve={handleResolve}
              handleBet={handleBet}
            />
          )}
          {activeTab === "my-bets" && (
            <MyBets handleClaim={handleClaim} markets={markets} bets={bets} />
          )}
          {activeTab === "resolved" && <ResolvedMarkets markets={markets} />}
        </Wrapper>
      ) : (
        <ConnectWalletButton variant="abnormal" />
      )}
    </div>
  );
}
