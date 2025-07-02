import { Users } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import ChartLineDefault from "@/components/market/chart";
import { Button } from "@/components/ui/button";

export default function MarketCard() {
  return (
    <Card className="w-full bg-white gap-0 max-w-[350px] !shadow h-[420px] p-5 ">
      <CardTitle className="flex my-2 text-sm items-center">
        <Users className="w-4 h-4 mr-2 stroke-4" /> 1277 Trdaers
      </CardTitle>
      <CardTitle className="flex my-2 items-center">
        Will india have a crypto market , Will india have a crypto market?
      </CardTitle>
      <CardDescription className="text-gray-400">
        24 May 2023 2:00PM - 3:00PM
      </CardDescription>
      <ChartLineDefault />
      <div className="flex space-x-2 mt-6 justify-between">
        <Button className="w-full border-0  !shadow  bg-[#f7bcb7]  ">
          No $5
        </Button>
        <Button className="w-full border-0  !shadow bg-[#9fc0dd]">
          Yes $3
        </Button>
      </div>
    </Card>
  );
}
