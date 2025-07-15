import ConnectWalletButton from "@/components/connectwalletbutton";
import Image from "next/image";
import GetstartButton from "./getstartbutton";
export default function Header() {
  return (
    <header className="inset-0 flex md:flex-row flex-col md:h-[100dvh] h-[95vh] w-full items-center md:justify-around justify-center bg-bg relative md:space-y-0 space-y-2">
      <div className="absolute   md:left-1/2 top-2 left-0 md:transform md:-translate-x-1/2 flex items-center justify-center">
        <h1 className="text-5xl opacity-80 font-black">deprobo</h1>
      </div>

      <div className="w-[40%] md:flex hidden items-center   justify-center h-full">
        <Image
          alt="logo"
          width="100"
          height="100"
          className="w-[75%]"
          src="https://kuma-landing-2.vercel.app/ill.svg"
        />
      </div>

      <Image
        alt="logo"
        width="100"
        height="100"
        className=" w-[60%] md:hidden mt-12"
        src="https://kuma-landing-2.vercel.app/ill.svg"
      />

      <div className=" md:mt-44 md:px-16 md:mr-16 md:w-[50%] w-full  text-center ">
        <div className="md:text-6xl font-black  md:leading-none  md:mb-4 text-3xl text-[#806775]">
          The<span className="t text-red-400"> app </span>that
          <span className="font-black text-red-400 "> bets on</span>
          <br /> your
          <span className="font-black text-white ml-5 [text-shadow:_-1.75px_-1.75px_0_#000,_1.75px_-1.75px_0_#000,_-1.75px_1.75px_0_#000,_1.75px_1.75px_0_#000]">
            &quot;Opinions&quot;
          </span>
        </div>
        <h1 className="md:text-[1.2rem] font-black  md:leading-none  md:mb-14 text-[1rem] mb-6">
          Decentralized, daily rewards — your winnings, your wallet.
        </h1>
        <GetstartButton />

        <div className="flex justify-center items-center text-2xl font-black mt-8">
          <Image
            alt="ethglobal"
            width="100"
            height="100"
            className="mr-2 w-8"
            src="/solanaLogoMark.svg"
          />
          <div className=" mt-2 ml-2 text-[#806775]">
            SOLANA DAPP PROJECT
            {/* <span className="font-normal">Dapp</span>{" "}
            <span className="font-light text-[#806775]">Project</span> */}
            {/* <span className="text-yellow-400 font-black">Winner</span> */}
          </div>
          {/* <Image
            alt="medal"
            width="100"
            height="100"
            className="ml-1 w-5 "
            src="/medal.svg"
          /> */}
        </div>
      </div>

      <ConnectWalletButton variant="normal" />
    </header>
  );
}
