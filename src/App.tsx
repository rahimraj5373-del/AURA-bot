import React, { useState, useEffect } from "react";
import { AuraHeader } from "./components/AuraHeader";
import { AuraNavigation, TabType } from "./components/AuraNavigation";
import { AuraMineTab } from "./components/AuraMineTab";
import { AuraTasksTab } from "./components/AuraTasksTab";
import { AuraFriendsTab } from "./components/AuraFriendsTab";
import { 
  STARTING_BALANCE, 
  STREAK_REWARDS, 
  claimStreak, 
  canClaimStreak, 
  miningRate, 
  minedAmount, 
  withdrawalError,
  WithdrawalNetwork,
  formatAura 
} from "./lib/aura-rules";
import { Coins, Wallet, ShieldCheck } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("mine");
  const [balance, setBalance] = useState<number>(STARTING_BALANCE);
  const [startedAt, setStartedAt] = useState<number>(Date.now());
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [verifiedSocials, setVerifiedSocials] = useState<string[]>([]);
  const [streakData, setStreakData] = useState({ streakDay: 1, lastStreakDate: null as string | null });
  
  // Wallet & Withdrawal State
  const [tonAddress, setTonAddress] = useState<string | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [withdrawNetwork, setWithdrawNetwork] = useState<WithdrawalNetwork>("TON");
  const [withdrawAddress, setWithdrawAddress] = useState<string>("");
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentRate = miningRate(verifiedSocials.length);
  const minedSoFar = minedAmount(startedAt, now, currentRate);
  const timeLeftMs = Math.max(0, 3600000 - (now - startedAt));

  const handleClaimMined = () => {
    setBalance((prev) => prev + minedSoFar);
    setStartedAt(Date.now());
  };

  const handleClaimStreak = () => {
    const today = new Date();
    if (canClaimStreak(streakData, today)) {
      const res = claimStreak(streakData, today, STREAK_REWARDS);
      setBalance((prev) => prev + res.reward);
      setStreakData(res.next);
    }
  };

  const handleCompleteTask = (taskId: string, reward: number) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks((prev) => [...prev, taskId]);
      setBalance((prev) => prev + reward);
    }
  };

  const handleVerifySocial = (socialId: string, boost: number) => {
    if (!verifiedSocials.includes(socialId)) {
      setVerifiedSocials((prev) => [...prev, socialId]);
    }
  };

  const handleConnectWallet = () => {
    const mockAddress = "UQD41...mockTonWalletAddress99";
    setTonAddress(mockAddress);
    setWithdrawAddress(mockAddress);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(withdrawAmount);
    const err = withdrawalError({
      amount: amt,
      balance,
      minWithdrawal: 100,
      enabled: true,
      network: withdrawNetwork,
      address: withdrawAddress,
    });

    if (err) {
      alert(err);
      return;
    }

    setBalance((prev) => prev - amt);
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setIsWithdrawModalOpen(false);
      setWithdrawAmount("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans max-w-md mx-auto relative shadow-2xl overflow-hidden border-x border-slate-900">
      <AuraHeader 
        balance={balance} 
        tonAddress={tonAddress} 
        onConnectWallet={handleConnectWallet} 
      />

      <main className="min-h-[calc(100vh-130px)]">
        {activeTab === "mine" && (
          <AuraMineTab
            balance={balance}
            miningRatePerHour={currentRate}
            minedSoFar={minedSoFar}
            timeLeftMs={timeLeftMs}
            onClaim={handleClaimMined}
            canClaim={minedSoFar >= 1}
            streakDay={streakData.streakDay}
            onClaimStreak={handleClaimStreak}
            canClaimDailyStreak={canClaimStreak(streakData, new Date())}
          />
        )}

        {activeTab === "tasks" && (
          <AuraTasksTab
            completedTasks={completedTasks}
            onCompleteTask={handleCompleteTask}
            verifiedSocials={verifiedSocials}
            onVerifySocial={handleVerifySocial}
          />
        )}

        {activeTab === "friends" && (
          <AuraFriendsTab
            referralCode="aura_ref_99"
            friendsCount={3}
          />
        )}

        {activeTab === "wallet" && (
          <div className="flex flex-col pb-24 px-4 pt-4 text-white">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 mb-6 text-center shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto mb-3">
                <Wallet className="w-6 h-6" />
              </div>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total Balance</h2>
              <p className="text-3xl font-extrabold text-amber-300 mb-4">{formatAura(balance)} AURA</p>
              
              <button
                onClick={() => setIsWithdrawModalOpen(true)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                Withdraw to TON Wallet
              </button>
            </div>

            {/* Wallet Info Box */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Connected Wallet</h3>
              {tonAddress ? (
                <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs font-mono text-emerald-400">{tonAddress}</span>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/20">Connected</span>
                </div>
              ) : (
                <button
                  onClick={handleConnectWallet}
                  className="w-full py-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold transition-all"
                >
                  Connect TON Wallet Now
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Withdrawal Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-sm text-white shadow-2xl">
            <h3 className="text-lg font-bold mb-4 text-amber-300">Withdraw AURA</h3>
            
            {withdrawSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-emerald-300">Withdrawal Successful!</h4>
                <p className="text-xs text-slate-400">Tokens have been sent to your TON wallet.</p>
              </div>
            ) : (
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Amount (Min: 100 AURA)</label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 mb-1 block">TON Wallet Address</label>
                  <input
                    type="text"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    placeholder="UQ..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500 font-mono text-xs"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsWithdrawModalOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <AuraNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
    }
    
