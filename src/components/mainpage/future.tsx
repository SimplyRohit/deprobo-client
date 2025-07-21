import GetstartButton from "./getstartbutton";

export default function Future() {
  return (
    <section className="border-b-border  text-black inset-0 flex w-full flex-col items-center justify-center border-b-4 bg-white  font-base">
      <div className="mx-auto w-container max-w-full px-4 py-20 lg:py-[100px]">
        <h2 className="mb-6 text-center text-2xl md:text-3xl lg:mb-10 lg:text-4xl">
          Step into the <span className="font-black">Future</span> of{" "}
          <span className="font-black">Finance</span>
        </h2>
        <GetstartButton />
      </div>
    </section>
  );
}
