import { stats } from "@/lib/types";

export default function Stats() {
  return (
    <section className="border-b-border inset-0 flex w-full flex-col items-center justify-center border-b-4 bg-white  font-base">
      <div className="mx-auto w-container max-w-full lg:px-5 py-20 lg:py-[100px]">
        <div className="flex items-center  justify-center w-full">
          {stats.map(({ value, label }, index) => (
            <div key={index} className="w-1/3  ">
              <h2 className="text-center text-3xl lg:text-6xl font-heading text-black">
                {value}
              </h2>
              <h2 className="text-center text-xs lg:text-xl font-heading text-black">
                {label}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
