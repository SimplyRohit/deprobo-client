"use client";
import Header from "@/components/market/header";
import Wrapper from "@/components/wrapper";
import MarketFilter from "@/components/market/marketfilter";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import MarketSection from "@/components/market/MarketSection";

export default function MarketPage() {
  const wallet = useWallet();
  const [activeTab, setActiveTab] = useState<"active" | "my-bets" | "resolved">(
    "active"
  );

  return (
    <div className="min-h-screen  ">
      <Header />

      <Wrapper>
        <MarketFilter activeTab={activeTab} setActiveTab={setActiveTab} />
        {wallet.publicKey ? (
          <MarketSection mode={activeTab} wallet={wallet} />
        ) : (
          <div className="flex items-center justify-center ">
            <p className="mt-8 text-xl opacity-60 text-red-600">
              Connect your wallet
            </p>
          </div>
        )}
      </Wrapper>
    </div>
  );
}
