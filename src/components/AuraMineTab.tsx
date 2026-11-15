import React from "react";
import { Coins, Zap, Trophy } from "lucide-react";
import { formatAura, formatClock } from "../lib/aura-rules";

interface AuraMineTabProps {
  balance: number;
  miningRatePerHour: number;
  minedSoFar: number;
  timeLeftMs: number;
  onClaim: () => void;
  canClaim: boolean;
  streakDay: number;
  onClaimStreak: () => void;
  canClaimDailyStreak: boolean;
}

export const AuraMineTab: React.FC<AuraMineTabProps> = ({
  balance,
  miningRatePerHour,
  minedSoFar,
  timeLeftMs,
  onClaim,
  canClaim,
  streakDay,
  onClaimStreak,
  canClaimDailyStreak,
}) => {
  return (
    <div className="flex flex-col items-center pb-24 px-4 pt-4 text-white">
      {/* Daily Streak Card */}
      <div className="w-full bg-gradient-to-r from-amber-900/40 to-slate-900/80 border border-amber-500/30 rounded-2xl p-4 mb-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-amber-300">Daily Streak</h2>
            <p className="text-xs text-slate-300">Day {streakDay} Streak Active</p>
          </div>
        </div>
        <button
          onClick={onClaimStreak}
          disabled={!canClaimDailyStreak}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            canClaimDailyStreak
              ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/30 active:scale-95"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          {canClaimDailyStreak ? "Claim Reward" : "Claimed"}
        </button>
      </div>

      {/* Main Mining Display */}
      <div className="relative flex flex-col items-center justify-center my-8">
        <div className="absolute w-64 h-64 rounded-full bg-amber-500/10 blur-3xl animate-pulse"></div>
        <div className="w-48 h-48 rounded-full border-4 border-amber-500/30 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl relative z-10">
          <Coins className="w-10 h-10 text-amber-400 mb-2 animate-bounce" />
          <span className="text-xs text-slate-400 uppercase tracking-widest font-medium">Mined</span>
          <span className="text-3xl font-extrabold text-amber-300 my-1">{formatAura(minedSoFar)}</span>
          <span className="text-xs text-slate-400">AURA</span>
        </div>
      </div>

      {/* Mining Stats */}
      <div className="w-full grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Mining Speed</p>
            <p className="text-sm font-bold text-slate-200">+{miningRatePerHour} /hr</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Time Left</p>
            <p className="text-sm font-bold text-slate-200">{formatClock(timeLeftMs)}</p>
          </div>
        </div>
      </div>

      {/* Claim Button */}
      <button
        onClick={onClaim}
        disabled={!canClaim && timeLeftMs > 0}
        className={`w-full py-4 rounded-2xl font-bold text-base transition-all shadow-xl ${
          canClaim || timeLeftMs <= 0
            ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20 active:scale-95"
            : "bg-slate-800 text-slate-400 border border-slate-700"
        }`}
      >
        {canClaim || timeLeftMs <= 0 ? "Claim Mined AURA" : `Mining... (${formatClock(timeLeftMs)})`}
      </button>
    </div>
  );
};
            
