"use client";
import { Button } from "../ui/button";

export default function GetstartButton() {
  return (
    <div
      onClick={() => {
        window.location.href = "/market";
      }}
      className="flex justify-center"
    >
      <Button
        variant={"neutral"}
        className="w-[320px]  cursor-pointer text-3xl h-[60px]"
      >
        <h1 className="font-black   ">Get Started</h1>
      </Button>
    </div>
  );
}
