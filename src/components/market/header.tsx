"use client";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import { useCallback } from "react";
import Wrapper from "../wrapper";

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
    <div className="border-border border-b-2 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] bg-white">
      <Wrapper>
        <div className="   flex flex-col w-full   min-h-[400px]  p-3   ">
          <div>
            <div className="flex md:h-[40px] h-[30px] items-center justify-between">
              <h1 className="md:text-5xl text-4xl font-black">deprobo</h1>
              <div className="z-10 flex items-center">
                <Button
                  className="w-[180px] md:block hidden mr-3 font-black cursor-pointer text-[1rem]"
                  variant={"neutral"}
                >
                  Create Market
                </Button>
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
              <Button
                className="w-[180px] mt-3 font-black cursor-pointer text-[1rem]"
                variant={"neutral"}
              >
                Create Market
              </Button>
            </div>
            <Image
              alt="logo"
              src="/home-header-13052025.webp"
              width={300}
              height={300}
              className="object-cover absolute lg:block hidden right-20 top-1 mr-20 select-none pointer-events-none  min-w-[532px] "
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
