import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function MarqueeComponent() {
  return (
    <Marquee
      autoFill
      loop={0}
      className="md:h-[104px] h-[60px] border-y-4 p-10 border-border bg-[#eed9e5]"
    >
      <div className="mx-8 flex items-center max-w-[250px]">
        <Image
          alt="Discord Logo"
          src="/Discord-Logo-White.png"
          width={400}
          height={400}
          className="md:h-[60px] h-[30px] w-auto object-contain"
        />
      </div>
      <div className="mx-8 flex items-center max-w-[250px]">
        <Image
          alt="Solana Logo"
          src="/solanaLogo.svg"
          width={400}
          height={400}
          className="md:h-[60px] h-[30px] w-auto object-contain"
        />
      </div>
      <div className="mx-8 flex items-center max-w-[250px]">
        <Image
          alt="Dapp Logo"
          src="/dapp.png"
          width={400}
          height={400}
          className="md:h-[60px] h-[30px] w-auto object-contain"
        />
      </div>
      {/* <div className="mx-8 flex items-center max-w-[250px]">
        <Image
          alt="Discord Logo"
          src="/Discord-Logo-White.png"
          width={400}
          height={400}
          className="md:h-[60px] h-[30px] w-auto object-contain"
        />
      </div>
      <div className="mx-8 flex items-center max-w-[250px]">
        <Image
          alt="Solana Logo"
          src="/solanaLogo.svg"
          width={400}
          height={400}
          className="md:h-[60px] h-[30px] w-auto object-contain"
        />
      </div>
      <div className="mx-8 flex items-center max-w-[250px]">
        <Image
          alt="Dapp Logo"
          src="/dapp.png"
          width={400}
          height={400}
          className="md:h-[60px] h-[30px] w-auto object-contain"
        />
      </div> */}
    </Marquee>
  );
}
