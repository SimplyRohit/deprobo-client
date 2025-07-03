import { Users } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import ChartLineDefault from "@/components/market/chart";
import { Button } from "@/components/ui/button";

export default function MarketCard() {
  return (
    <Card className="w-full bg-white gap-0 max-w-[350px] !shadow h-[460px] p-5 ">
      <CardTitle className="flex my-2 text-gray-500 text-sm font-medium items-center">
        <Users className="w-4 h-4   mr-2 stroke-3" /> 1277 Trdaers
      </CardTitle>
      <div className="flex h-[8rem] my-2 items-center">
        <CardTitle className=" text-xl font-semibold  ">
          Will india go to war with russia before 2024
        </CardTitle>
      </div>
      <CardDescription className="text-gray-400">
        24 May 2023 2:00PM - 3:00PM
      </CardDescription>
      <ChartLineDefault />
      <div className="flex space-x-2 mt-8 justify-between">
        <Button className="w-full border-0  shadow-[2_2_0_2px] shadow-gray-500  bg-[#FCA794]  ">
          No $5
        </Button>
        <Button className="w-full border-0  !shadow bg-[#D0EFFA]">
          Yes $3
        </Button>
      </div>
    </Card>
  );
}
