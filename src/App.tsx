import React, { useState, useEffect } from 'react';
import { ShieldCheck, Wallet, Coins } from 'lucide-react';

// Interfaces
interface Task {
  id: string;
  title: string;
  reward: number;
  completed: boolean;
}

export default function App() {
  const [balance, setBalance] = useState<number>(100);
  const [miningRate] = useState<number>(0.1);
  const [lastClaimed, setLastClaimed] = useState<number>(Date.now());
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Join Telegram', reward: 50, completed: false },
    { id: '2', title: 'Follow Twitter', reward: 50, completed: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((prev) => prev + miningRate);
    }, 1000);
    return () => clearInterval(interval);
  }, [miningRate]);

  const handleClaim = () => {
    setLastClaimed(Date.now());
  };

  const handleCompleteTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id && !task.completed) {
          setBalance((b) => b + task.reward);
          return { ...task, completed: true };
        }
        return task;
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 font-sans">
      <header className="w-full max-w-md flex justify-between items-center mb-8 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Coins className="w-6 h-6 text-amber-400" />
          <span className="font-bold text-lg">Aura Bot</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          <Wallet className="w-4 h-4 text-blue-400" />
          <span className="font-mono font-semibold">{balance.toFixed(2)}</span>
        </div>
      </header>

      <main className="w-full max-w-md flex flex-col items-center gap-6">
        <div className="w-full bg-gradient-to-b from-slate-900 to-slate-950 p-8 rounded-3xl border border-slate-800 text-center shadow-xl">
          <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-pulse" />
          <h2 className="text-xl font-bold mb-2">Mining Active</h2>
          <p className="text-slate-400 text-sm mb-6">Generating tokens automatically</p>
          <button
            onClick={handleClaim}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-bold rounded-2xl shadow-lg transition-all"
          >
            Sync State
          </button>
        </div>

        <div className="w-full bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            Daily Tasks
          </h3>
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800"
              >
                <div>
                  <div className="font-semibold text-sm">{task.title}</div>
                  <div className="text-xs text-amber-400">+{task.reward} AURA</div>
                </div>
                <button
                  onClick={() => handleCompleteTask(task.id)}
                  disabled={task.completed}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    task.completed
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {task.completed ? 'Done' : 'Claim'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
    }
        
