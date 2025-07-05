"use client";
import Header from "@/components/market/header";
import Wrapper from "@/components/wrapper";
import MarketFilter from "@/components/market/marketfilter";
import ActiveSection from "@/components/market/activeSection";
import { useState } from "react";

export default function market() {
  const [activeTab, setActiveTab] = useState<"active" | "my-bets" | "resolved">(
    "active"
  );

  return (
    <div className="min-h-screen bg-[#efecff]  ">
      <Header />
      <Wrapper>
        <MarketFilter activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "active" && <ActiveSection />}
      </Wrapper>
    </div>
  );
}
