"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useContractFunctions } from "./contract-functions";
import ConnectWalletButton from "../connectwalletbutton";
import { cluster } from "./contract-exports";

export default function ContractUI() {
  const { createMarket, getMarkets } = useContractFunctions();

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Cluster: {cluster}</h1>
      <ConnectWalletButton />
      <div className="space-y-2">
        <Button
          onClick={() =>
            createMarket.mutate({
              question: "Will BTC go up ",
            })
          }
        >
          Create Market
        </Button>

        <Button onClick={() => getMarkets.mutate()}>Get Markets</Button>
        <h1>{JSON.stringify(getMarkets.data, null, 2)}</h1>
      </div>
    </main>
  );
}
