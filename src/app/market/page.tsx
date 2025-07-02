"use client";
import Header from "@/components/market/header";
import Wrapper from "@/components/wrapper";
import MarketFilter from "@/components/market/marketfilter";

import MarketCardSection from "@/components/market/marketcardsection";

export default function market() {
  return (
    <div className="min-h-screen bg-[#efecff]  ">
      <Header />
      <Wrapper>
        <MarketFilter />
        <MarketCardSection />
      </Wrapper>
    </div>
  );
}
