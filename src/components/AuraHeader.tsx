import React from "react";
import { Coins, Wallet } from "lucide-react";
import { formatAura, toUsd } from "../lib/aura-rules";

interface AuraHeaderProps {
  balance: number;
  tonAddress: string | null;
  onConnectWallet: () => void;
}

export const AuraHeader: React.FC<AuraHeaderProps> = ({
  balance,
  tonAddress,
  onConnectWallet,
}) => {
  const shortAddress = tonAddress
    ? `${tonAddress.slice(0, 4)}...${tonAddress.slice(-4)}`
    : "Connect Wallet";

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-slate-900/80 backdrop-blur border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
          <Coins className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-wide text-amber-300">AURA TOKEN</h1>
          <p className="text-xs text-slate-400">${toUsd(balance).toFixed(2)} USD</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="font-semibold text-sm text-amber-300">{formatAura(balance)}</span>
        </div>

        <button
          onClick={onConnectWallet}
          className="flex items-center gap-1.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-medium px-3 py-2 rounded-xl shadow-lg shadow-sky-500/20 transition-all active:scale-95"
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>{shortAddress}</span>
        </button>
      </div>
    </header>
  );
};
