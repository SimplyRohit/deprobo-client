"use client";
import Header from "@/components/market/header";
import Wrapper from "@/components/wrapper";
import MarketFilter from "@/components/market/marketfilter";
import MarketSection from "@/components/market/MarketSection";
import { useContractFunctions } from "@/contract/contract-functions";
import React from "react";

export default function MarketPage() {
  const { publicKey } = useContractFunctions();
  const [activeTab, setActiveTab] = React.useState<
    "active" | "my-bets" | "resolved"
  >("active");

  return (
    <div className="min-h-screen    ">
      <Header />
      <Wrapper>
        <MarketFilter activeTab={activeTab} setActiveTab={setActiveTab} />
        {publicKey ? (
          <MarketSection mode={activeTab} publicKey={publicKey} />
        ) : (
          <div className="flex items-center justify-center ">
            <p className="mt-8 text-xl opacity-60 text-gray-500">
              Connect your wallet
            </p>
          </div>
        )}
      </Wrapper>
    </div>
  );
}
