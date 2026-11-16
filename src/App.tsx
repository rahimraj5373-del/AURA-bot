import React, { useState, useEffect } from 'react';
import { Coins, Wallet, Users, Flame, CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  const [balance, setBalance] = useState<number>(1250);
  const [miningActive, setMiningActive] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'home' | 'tasks' | 'frens'>('home');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Join Telegram Channel', reward: 500, completed: false },
    { id: 2, title: 'Follow on X (Twitter)', reward: 300, completed: false },
    { id: 3, title: 'Invite 3 Friends', reward: 1000, completed: false },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (miningActive) {
        setBalance(prev => prev + 0.1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [miningActive]);

  const handleCompleteTask = (id: number, reward: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: true } : t));
    setBalance(prev => prev + reward);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col justify-between max-w-md mx-auto relative pb-20 select-none font-sans">
      
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-slate-900/60 backdrop-blur border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-bold shadow-lg">
            💎
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wide">Aura Telegram Bot</h1>
            <p className="text-[10px] text-emerald-400 font-medium">● Connected to Telegram</p>
          </div>
        </div>
        <div className="bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/50 flex items-center gap-1.5">
          <Wallet className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs font-mono font-bold text-amber-300">TON Wallet</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 flex flex-col items-center justify-center">
        {activeTab === 'home' && (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            {/* Balance Card */}
            <div className="text-center my-6">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Your Balance</p>
              <div className="flex items-center justify-center gap-2">
                <Coins className="w-8 h-8 text-amber-400 animate-bounce" />
                <span className="text-4xl font-black font-mono tracking-tight text-white">
                  {balance.toFixed(2)}
                </span>
                <span className="text-sm font-bold text-amber-400">AURA</span>
              </div>
            </div>

            {/* Tap/Mining Circle */}
            <div className="relative my-4">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl animate-pulse"></div>
              <button 
                onClick={() => setBalance(prev => prev + 1)}
                className="relative w-48 h-48 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 border-4 border-amber-400/40 shadow-2xl flex flex-col items-center justify-center active:scale-95 transition-all group"
              >
                <Flame className="w-16 h-16 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-black uppercase text-amber-200">Tap to Mine</span>
                <span className="text-[10px] text-slate-400 mt-1">+1 AURA per tap</span>
              </button>
            </div>

            {/* Stats info */}
            <div className="w-full grid grid-cols-2 gap-3 mt-6">
              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-center">
                <p className="text-[10px] text-slate-400">Mining Speed</p>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">+0.1 / sec</p>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-center">
                <p className="text-[10px] text-slate-400">Daily Limit</p>
                <p className="text-sm font-bold text-blue-400 mt-0.5">Unlimited</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="w-full flex flex-col gap-3 animate-fadeIn">
            <h2 className="text-base font-bold mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Earn More AURA
            </h2>
            {tasks.map(task => (
              <div key={task.id} className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm">{task.title}</h4>
                  <p className="text-xs text-amber-400 font-medium">+{task.reward} AURA</p>
                </div>
                <button
                  onClick={() => handleCompleteTask(task.id, task.reward)}
                  disabled={task.completed}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    task.completed 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  }`}
                >
                  {task.completed ? 'Completed' : 'Start'}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'frens' && (
          <div className="w-full flex flex-col items-center text-center animate-fadeIn py-6">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-4 border border-blue-500/20">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold mb-1">Invite Friends!</h2>
            <p className="text-xs text-slate-400 mb-6 max-w-[260px]">
              Share your invite link with your friends and get 10% of their mined AURA tokens.
            </p>
            <button 
              onClick={() => alert('Invite link copied!')}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 font-bold rounded-2xl shadow-lg text-sm flex items-center justify-center gap-2"
            >
              <span>Copy Invite Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation (Telegram Mini App Style) */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/90 backdrop-blur border-t border-slate-800 p-2 flex justify-around items-center z-50">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 py-1.5 px-5 rounded-xl transition-all ${activeTab === 'home' ? 'text-amber-400 bg-slate-800/60' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Coins className="w-5 h-5" />
          <span className="text-[10px] font-bold">Mine</span>
        </button>
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`flex flex-col items-center gap-1 py-1.5 px-5 rounded-xl transition-all ${activeTab === 'tasks' ? 'text-amber-400 bg-slate-800/60' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-[10px] font-bold">Tasks</span>
        </button>
        <button 
          onClick={() => setActiveTab('frens')}
          className={`flex flex-col items-center gap-1 py-1.5 px-5 rounded-xl transition-all ${activeTab === 'frens' ? 'text-amber-400 bg-slate-800/60' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-bold">Frens</span>
        </button>
      </nav>

    </div>
  );
    }
              
