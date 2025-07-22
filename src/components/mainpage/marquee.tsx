import Marquee from "react-fast-marquee";
import { DiscordLogo, SolanaLogo } from "../svg";

export default function MarqueeComponent() {
  return (
    <Marquee
      autoFill={true}
      loop={0}
      className="md:h-[104px] h-[70px] border-y-4 overflow-hidden  border-border bg-white"
    >
      <SolanaLogo className="md:w-64 w-56  h-56 md:h-64 mx-10" />
      <DiscordLogo className="md:w-64 w-56 h-56 md:h-64 mx-10" />
    </Marquee>
  );
}
