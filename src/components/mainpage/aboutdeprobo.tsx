import Image from "next/image";
import { About } from "@/lib/types";

export default function AboutDeprobo() {
  return (
    <section className=" bg-bg bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] pt-16  lg:pt-[100px] border-b-border border-b-4 flex items-center justify-around flex-col lg:flex-row">
      <div className="flex flex-col items-center justify-center lg:w-[60%] w-[90%] lg:ml-16 lg:mb-24 gap-4">
        <h2 className="text-5xl font-black mb-4">
          <div className="text-center">
            Don’t
            <span className="font-black text-red-400"> worry!</span>
            <span className="font-black text-white [text-shadow:_-1.75px_-1.75px_0_#000,_1.75px_-1.75px_0_#000,_-1.75px_1.75px_0_#000,_1.75px_1.75px_0_#000]">
              We’ve got you covered.
            </span>
          </div>
        </h2>
        <div className="mx-auto grid w-container max-w-full grid-cols-1 gap-5 px-5 lg:grid-cols-2 ">
          {About.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="border-border shadow-shadow flex flex-col gap-3 rounded-base border-2 bg-white p-4 text-black"
            >
              <div className="flex items-center space-x-2">
                {<Icon />}
                <h4 className="text-3xl font-heading">{title}</h4>
              </div>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-center lg:w-[22%] w-[90%] lg:mt-0 mt-16">
        <Image alt="logo" width="1000" height="1000" src="/mobile.png" />
      </div>
    </section>
  );
}
