import { RoundedArrow } from "../svg";

export default function Featured() {
  return (
    <section className="border-b-border  inset-0 flex w-full flex-col items-center justify-center border-b-4 bg-white  font-base relative">
      <div className="absolute top-4 right-4 text-black flex items-center  font-normal sm:font-semibold">
        Featured by
        <RoundedArrow />
      </div>
      <div className="mx-auto w-container max-w-full px-4 py-20 lg:py-[100px]">
        <h2 className="text-2xl  lg:mb-15 lg:text-5xl text-black text-left sm:text-center">
          <span className="font-black">DeProbo</span> empowers{" "}
          <span className="font-black">your predictions</span>
          <div className="mt-1">
            <span className="font-black">Earn</span> real returns{" "}
            <span className="font-black">on your insights</span>
          </div>
          <div className="mt-1">
            Not just promises —{" "}
            <span className="font-black text-[#FF6467]">Real Rewards</span>
          </div>
        </h2>
      </div>
    </section>
  );
}
