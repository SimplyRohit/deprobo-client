import ConnectWalletButton from "@/components/connectwalletbutton";
import Star8 from "@/components/stars/s8";
import { Button } from "@/components/ui/button";
import { ArrowBigDown, ArrowBigRight, ArrowBigRightDash } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <header className="inset-0 flex h-[100dvh] w-full items-center justify-around bg-bg relative">
      <ConnectWalletButton />

      <Image
        draggable={false}
        src={"/logot2.png"}
        alt="logo"
        width={300}
        height={300}
        className="select-none pointer-events-none absolute top-5 md:left-1/2   md:-translate-x-1/2"
      />

      <div className="w-[40%] select-none pointer-events-none flex items-center justify-center h-full">
        <Image
          alt="logo"
          loading="lazy"
          width="100"
          height="100"
          decoding="async"
          data-nimg="1"
          className="w-[75%]"
          src="https://kuma-landing-2.vercel.app/ill.svg"
        />
      </div>

      <div className="mt-44 px-16 mr-16">
        <div className="text-6xl font-black font-mono leading-none mb-4 text-[#806775]">
          The<span className="t text-red-400"> app </span>that
          <span className="font-black text-red-400 "> bets on</span>
          <br></br> your
          <span className="font-black text-white ml-5 [text-shadow:_-1.75px_-1.75px_0_#000,_1.75px_-1.75px_0_#000,_-1.75px_1.75px_0_#000,_1.75px_1.75px_0_#000]">
            "Opinions"
          </span>
        </div>
        <h1 className="text-[1.5rem] font-black font-mono leading-none  mb-20">
          Decentralized, daily rewards — your winnings, your wallet.
        </h1>
        <div className="flex items-center   justify-center">
          <Button
            className="w-[402px]  cursor-pointer text-3xl  h-[68px]"
            variant="neutral"
          >
            <h1 className="font-black  font-mono mt-2">Get Started</h1>
            <Star8
              fill="#DBCAF4"
              stroke="#000"
              strokeWidth={10}
              className="!w-8 text-[#DBCAF4] !h-8"
            />
          </Button>
        </div>
        {/* <div className="flex justify-center items-center text-2xl font-black mt-8">
          <Image
            alt="ethglobal"
            loading="lazy"
            width="100"
            height="100"
            decoding="async"
            data-nimg="1"
            className="mr-2 w-8"
            src="/ethglobal.svg"
          />
          <div>
            ETH<span className="font-normal">Global</span>
            <span className="font-light text-gray-200">Online 2024</span>{" "}
            <span className="text-yellow-400 font-black">Winner</span>
          </div>
          <Image
            alt="medal"
            loading="lazy"
            width="100"
            height="100"
            decoding="async"
            data-nimg="1"
            className="ml-1 w-5 "
            src="/medal.svg"
          />
        </div> */}
      </div>
    </header>
  );
}
