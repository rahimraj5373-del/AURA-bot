import React from "react";
import { Pickaxe, CheckSquare, Users, Wallet } from "lucide-react";

export type TabType = "mine" | "tasks" | "friends" | "wallet";

interface AuraNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const AuraNavigation: React.FC<AuraNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: "mine" as TabType, label: "Mine", icon: Pickaxe },
    { id: "tasks" as TabType, label: "Tasks", icon: CheckSquare },
    { id: "friends" as TabType, label: "Friends", icon: Users },
    { id: "wallet" as TabType, label: "Wallet", icon: Wallet },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 px-4 py-2 z-50">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-1.5 px-4 rounded-xl transition-all ${
                isActive
                  ? "text-amber-400 bg-amber-500/10 font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "scale-110" : ""}`} />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
              
