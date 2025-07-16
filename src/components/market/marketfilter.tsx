import { Button } from "@/components/ui/button";
import { Activity, User, CheckCircle2 } from "lucide-react";

export default function MarketFilter({
  activeTab,
  setActiveTab,
}: {
  activeTab: "active" | "my-bets" | "resolved";
  setActiveTab: (tab: "active" | "my-bets" | "resolved") => void;
}) {
  const tabs = [
    {
      id: "active",
      label: "Active",
      icon: Activity,
      count: 10,
    },
    { id: "my-bets", label: "My Bets", icon: User, count: 10 },
    {
      id: "resolved",
      label: "Resolved",
      icon: CheckCircle2,
      count: 10,
    },
  ] as const;

  return (
    <div className="flex md:flex-row w-full px-2 flex-col items-center justify-between my-6">
      <div className="">
        <h1 className="text-4xl md:mb-0 mb-3">Markets</h1>
      </div>
      <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg  w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              variant={"neutral"}
              key={tabs.indexOf(tab)}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4  py-2 rounded-md font-medium transition-all ${
                activeTab === tab.id && "bg-[#988ecc] text-white "
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
