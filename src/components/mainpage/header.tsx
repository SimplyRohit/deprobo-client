import ConnectWalletButton from "@/components/connectwalletbutton";
import Image from "next/image";
import GetstartButton from "./getstartbutton";
import { SolanaLogoMark, SvgIll } from "@/components/svg";
export default function Header() {
  return (
    <header className="inset-0  bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]  flex md:flex-row flex-col md:h-[100dvh] h-[95vh] w-full items-center md:justify-around justify-center bg-bg relative md:space-y-0 space-y-2">
      <h1 className="md:text-5xl  text-4xl font-black absolute md:ml-0 ml-2  md:left-1/2 top-4 md:top-3 left-0 md:transform md:-translate-x-1/2  ">
        Deprobo
      </h1>
      <div className="w-[50%]  md:flex  items-center   justify-center h-[50%] md:h-full">
        <SvgIll className="w-full h-full object-contain" />
      </div>
      <div className="md:w-[50%] md:mt-8 w-full flex justify-center flex-col text-center ">
        <h1 className="md:text-6xl  font-black  md:leading-none  md:mb-4 text-3xl">
          The
          <span className="[text-shadow:_-1.75px_-1.75px_0_#000,_1.75px_-1.75px_0_#000,_-1.75px_1.75px_0_#000,_1.75px_1.75px_0_#000] text-red-400">
            {" "}
            app{" "}
          </span>
          that
          <span className="font-black "> bets on</span>
          <br /> your
          <span className="font-black text-red-400 ml-5 [text-shadow:_-1.75px_-1.75px_0_#000,_1.75px_-1.75px_0_#000,_-1.75px_1.75px_0_#000,_1.75px_1.75px_0_#000]">
            &quot;Opinions&quot;
          </span>
        </h1>
        <p className="md:text-[1.2rem] font-black  md:leading-none mt-3 md:mb-8 text-[1rem] mb-6">
          Decentralized, daily rewards — your winnings, your wallet.
        </p>
        <GetstartButton />
        <div className="flex justify-center items-center text-2xl font-black mt-8">
          <SolanaLogoMark className="w-8 h-8" />
          <h1 className=" ml-3">SOLANA DAPP PROJECT</h1>
        </div>
      </div>
      <ConnectWalletButton />
    </header>
  );
}
