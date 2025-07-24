"use client";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useCallback } from "react";
import Wrapper from "../wrapper";
import CreateMarketForm from "./createmarketform";

export default function Header() {
  const { connected, connect, disconnect, publicKey, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const handleClick = useCallback(async () => {
    if (connected) {
      await disconnect();
    } else {
      await setVisible(true);
    }
  }, [connected, connect, disconnect]);
  return (
    <div className="border-border bg-white text-black  bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] ">
      <Wrapper>
        <div className="  mt-2 flex flex-col w-full   min-h-[400px]  p-3   ">
          <div>
            <div className="flex md:h-[40px] h-[30px] items-center justify-between">
              <h1 className="md:text-5xl text-4xl font-black">Deprobo</h1>
              <div className="z-10 flex items-center">
                <Button
                  variant="neutral"
                  className=" cursor-pointer truncate  font-black  text-[1rem] md:w-[12rem] w-[10rem] "
                  onClick={handleClick}
                  disabled={connecting}
                >
                  {connected && publicKey
                    ? `${publicKey.toBase58().slice(0, 1)}..${publicKey
                        .toBase58()
                        .slice(-1)} (Disconnect)`
                    : connecting
                    ? "Connecting..."
                    : "Connect Wallet"}
                </Button>
              </div>
            </div>
            <div className="flex md:py-10 my-12 flex-col w-full h-full items-start justify-center gap-y-2">
              <h1 className="md:text-6xl space-y-1 text-4xl ">
                Predict the future , Earn <br />
                Rewards. Yes or No? <br /> Decide the outcome
              </h1>
              <p className="md:text-xl text-lg my-2  ">
                Join active market , resolve predictions and win with Deprobo.
              </p>
              <CreateMarketForm />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
