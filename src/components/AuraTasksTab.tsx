import React, { useState } from "react";
import { CheckCircle2, Circle, Trophy, ArrowRight, Zap, ExternalLink } from "lucide-react";
import { DAILY_TASKS, SOCIAL_TASKS } from "../lib/aura-tasks";

interface AuraTasksTabProps {
  completedTasks: string[];
  onCompleteTask: (taskId: string, reward: number) => void;
  verifiedSocials: string[];
  onVerifySocial: (socialId: string, boost: number) => void;
}

export const AuraTasksTab: React.FC<AuraTasksTabProps> = ({
  completedTasks,
  onCompleteTask,
  verifiedSocials,
  onVerifySocial,
}) => {
  const [activeTab, setActiveTab] = useState<"daily" | "social">("daily");
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const handleSocialClick = (task: (typeof SOCIAL_TASKS)[0]) => {
    window.open(task.link, "_blank");
    setVerifyingId(task.id);
    setTimeout(() => {
      onVerifySocial(task.id, task.rewardBoost);
      setVerifyingId(null);
    }, 5000);
  };

  return (
    <div className="flex flex-col pb-24 px-4 pt-4 text-white">
      {/* Sub-tabs */}
      <div className="flex bg-slate-900 border border-slate-800 rounded-2xl p-1 mb-6">
        <button
          onClick={() => setActiveTab("daily")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "daily"
              ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Daily Tasks
        </button>
        <button
          onClick={() => setActiveTab("social")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "social"
              ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Social Boosts
        </button>
      </div>

      {activeTab === "daily" ? (
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Available Daily Missions</h2>
          {DAILY_TASKS.map((task) => {
            const isDone = completedTasks.includes(task.id);
            return (
              <div
                key={task.id}
                className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">{task.title}</h3>
                    <p className="text-xs text-amber-400 font-medium">+{task.reward} AURA</p>
                  </div>
                </div>
                <button
                  onClick={() => !isDone && onCompleteTask(task.id, task.reward)}
                  disabled={isDone}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isDone
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                      : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95"
                  }`}
                >
                  {isDone ? "Completed" : "Claim"}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Community & Social Boosts</h2>
          {SOCIAL_TASKS.map((task) => {
            const isVerified = verifiedSocials.includes(task.id);
            const isVerifying = verifyingId === task.id;
            return (
              <div
                key={task.id}
                className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">{task.title}</h3>
                    <p className="text-xs text-sky-400 font-medium">+{task.rewardBoost} AURA/hr Boost</p>
                  </div>
                </div>
                <button
                  onClick={() => !isVerified && !isVerifying && handleSocialClick(task)}
                  disabled={isVerified || isVerifying}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isVerified
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 cursor-not-allowed"
                      : isVerifying
                      ? "bg-slate-800 text-amber-400 animate-pulse"
                      : "bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-sky-500/20 active:scale-95"
                  }`}
                >
                  {isVerified ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </>
                  ) : isVerifying ? (
                    "Checking..."
                  ) : (
                    <>
                      <span>Start</span> <ExternalLink className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
        
