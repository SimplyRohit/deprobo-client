"use client";
import Star8 from "../stars/s8";
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
        className="w-[320px]  cursor-pointer text-3xl  h-[68px]"
        variant="neutral"
      >
        <h1 className="font-black   mt-2">Get Started</h1>
        <Star8
          fill="#DBCAF4"
          stroke="#000"
          strokeWidth={10}
          className="!w-8 text-[#DBCAF4] !h-8"
        />
      </Button>
    </div>
  );
}
