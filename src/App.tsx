import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Gift, CheckSquare, Trophy, User } from 'lucide-react';

export default function App() {
  const [balance, setBalance] = useState<number>(179);
  const [sessionMining, setSessionMining] = useState<number>(0.1174);
  const [activeTab, setActiveTab] = useState<'mine' | 'rewards' | 'tasks'>('mine');

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionMining(prev => prev + 0.0001);
      setBalance(prev => prev + 0.001);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0906] text-[#e2d9c5] flex flex-col justify-between max-w-md mx-auto relative pb-24 select-none font-sans overflow-hidden border-x border-[#262015]">
      
      {/* Background Glow Effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="p-4 flex items-center justify-between z-10 border-b border-[#221c10] bg-[#0b0906]/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#d4af37] to-[#f3e5ab] flex items-center justify-center text-black font-black shadow-lg shadow-[#d4af37]/20">
            △
          </div>
          <span className="font-bold tracking-widest text-sm text-[#f3e5ab]">AURA TOKEN</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#18130a] px-3 py-1 rounded-lg border border-[#3d311c] text-xs font-bold text-[#f3e5ab] shadow-inner">
            179 AURA
          </div>
          <div className="w-8 h-8 rounded-lg bg-[#d4af37] text-black font-bold flex items-center justify-center text-xs shadow-md">
            M
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pt-2 flex flex-col items-center z-10">
        
        {/* Welcome Text */}
        <div className="text-center my-2">
          <p className="text-[10px] tracking-widest text-[#8c7a5b] uppercase font-semibold">
            WELCOME, MD. TÂÑJÎRÛL KÎÑG
          </p>
          <h2 className="text-xl font-extrabold tracking-wide text-[#f3e5ab] mt-0.5 drop-shadow-md">
            YOUR MINING CORE
          </h2>
        </div>

        {activeTab === 'mine' && (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            
            {/* Core Visualizer / Mining Circle */}
            <div className="relative my-4 w-64 h-64 flex items-center justify-center">
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border border-[#3d311c] animate-spin-slow"></div>
              <div className="absolute inset-3 rounded-full border border-dashed border-[#d4af37]/30"></div>
              
              {/* Triangle Core Button */}
              <button 
                onClick={() => setBalance(prev => prev + 1)}
                className="relative w-44 h-44 flex items-center justify-center group active:scale-95 transition-transform cursor-pointer"
              >
                {/* Glowing Aura Behind Triangle */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/20 to-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                
                {/* Outer Triangle */}
                <div className="absolute inset-2 border-2 border-[#d4af37] transform rotate-0 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)] bg-[#120f08]/80 backdrop-blur">
                  {/* Inner Details */}
                  <div className="absolute inset-3 border border-[#d4af37]/50 flex items-center justify-center">
                    {/* Glowing Center Core */}
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-cyan-300 transform rotate-45 shadow-[0_0_20px_#38bdf8] flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Cycle Percentage badge */}
              <div className="absolute bottom-2 right-4 text-right">
                <span className="text-lg font-black text-[#f3e5ab]">1%</span>
                <p className="text-[9px] text-[#8c7a5b] tracking-wider uppercase">CYCLE</p>
              </div>
            </div>

            {/* Mining Status */}
            <div className="flex flex-col items-center mt-1 mb-4">
              <div className="flex items-center gap-1.5 bg-[#18130a] px-3 py-1 rounded-full border border-[#3d311c] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-bold tracking-wider text-emerald-400">MINING ACTIVE</span>
              </div>
              <p className="text-xs text-[#a3906f] mt-1.5 font-mono">
                Session: <span className="text-[#f3e5ab] font-bold">{sessionMining.toFixed(4)} AURA</span>
              </p>
            </div>

            {/* Mining Power & Boost Cards */}
            <div className="w-full grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#120f08] p-3 rounded-xl border border-[#2b2213] relative overflow-hidden">
                <div className="flex items-center gap-1 text-[10px] text-[#8c7a5b] font-semibold uppercase tracking-wider">
                  <Zap className="w-3 h-3 text-[#d4af37]" /> Mining Power
                </div>
                <p className="text-base font-black text-[#f3e5ab] mt-1 font-mono">0.50 <span className="text-[10px] font-normal text-[#8c7a5b]">AURA/H</span></p>
              </div>

              <div className="bg-[#120f08] p-3 rounded-xl border border-[#2b2213] relative overflow-hidden">
                <div className="flex items-center gap-1 text-[10px] text-[#8c7a5b] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#d4af37]" /> Boost
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-base font-black text-[#f3e5ab] font-mono">X1.0</span>
                  <span className="text-[10px] text-[#8c7a5b]">0/3 SOCIAL</span>
                </div>
              </div>
            </div>

            {/* Balance Summary Box */}
            <div className="w-full bg-gradient-to-b from-[#151109] to-[#0e0b06] p-4 rounded-xl border border-[#3d311c] text-center shadow-lg relative">
              <p className="text-[10px] tracking-widest text-[#8c7a5b] uppercase font-semibold">YOUR AURA BALANCE</p>
              <div className="text-3xl font-black text-[#f3e5ab] mt-1 tracking-tight font-mono">
                {balance.toFixed(0)} <span className="text-lg">AURA</span>
              </div>
              <p className="text-xs text-[#8c7a5b] mt-1 font-mono">≈ ${(balance * 0.1).toFixed(2)} USD</p>
            </div>

          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="w-full flex flex-col items-center justify-center py-12 text-center animate-fadeIn">
            <Gift className="w-12 h-12 text-[#d4af37] mb-3 opacity-80" />
            <h3 className="text-lg font-bold text-[#f3e5ab]">Daily Rewards</h3>
            <p className="text-xs text-[#8c7a5b] mt-1 max-w-[240px]">Claim your daily bonus tokens and boost your mining speed.</p>
            <button 
              onClick={() => { setBalance(prev => prev + 50); alert('Claimed 50 AURA bonus!'); }}
              className="mt-6 px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-black font-bold rounded-xl text-xs shadow-lg shadow-[#d4af37]/20"
            >
              Claim Daily Bonus (+50 AURA)
            </button>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="w-full flex flex-col gap-3 py-2 animate-fadeIn">
            <h3 className="text-sm font-bold text-[#f3e5ab] flex items-center gap-2 mb-1">
              <CheckSquare className="w-4 h-4 text-[#d4af37]" /> Social Tasks
            </h3>
            <div className="bg-[#120f08] p-3 rounded-xl border border-[#2b2213] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#f3e5ab]">Join Telegram Channel</p>
                <p className="text-[10px] text-[#d4af37] mt-0.5">+50 AURA</p>
              </div>
              <button 
                onClick={() => { setBalance(prev => prev + 50); alert('Task completed!'); }}
                className="px-3 py-1.5 bg-[#221c10] hover:bg-[#d4af37] hover:text-black border border-[#3d311c] text-[#f3e5ab] text-xs font-bold rounded-lg transition-colors"
              >
                Start
              </button>
            </div>
            <div className="bg-[#120f08] p-3 rounded-xl border border-[#2b2213] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#f3e5ab]">Follow on X (Twitter)</p>
                <p className="text-[10px] text-[#d4af37] mt-0.5">+50 AURA</p>
              </div>
              <button 
                onClick={() => { setBalance(prev => prev + 50); alert('Task completed!'); }}
                className="px-3 py-1.5 bg-[#221c10] hover:bg-[#d4af37] hover:text-black border border-[#3d311c] text-[#f3e5ab] text-xs font-bold rounded-lg transition-colors"
              >
                Start
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0b0906]/95 backdrop-blur border-t border-[#221c10] py-2.5 px-6 flex justify-between items-center z-50">
        <button 
          onClick={() => setActiveTab('mine')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'mine' ? 'text-[#f3e5ab]' : 'text-[#6e5e43] hover:text-[#a3906f]'}`}
        >
          <Zap className="w-5 h-5" />
          <span className="text-[10px] font-bold tracking-wider">MINE</span>
        </button>
        <button 
          onClick={() => setActiveTab('rewards')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'rewards' ? 'text-[#f3e5ab]' : 'text-[#6e5e43] hover:text-[#a3906f]'}`}
        >
          <Gift className="w-5 h-5" />
          <span className="text-[10px] font-bold tracking-wider">REWARDS</span>
        </button>
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'tasks' ? 'text-[#f3e5ab]' : 'text-[#6e5e43] hover:text-[#a3906f]'}`}
        >
          <CheckSquare className="w-5 h-5" />
          <span className="text-[10px] font-bold tracking-wider">TASKS</span>
        </button>
      </nav>

    </div>
  );
      }
                
