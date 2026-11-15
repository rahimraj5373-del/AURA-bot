import React, { useState } from "react";
import { Users, Copy, Check, Gift, Share2 } from "lucide-react";

interface AuraFriendsTabProps {
  referralCode: string;
  friendsCount: number;
}

export const AuraFriendsTab: React.FC<AuraFriendsTabProps> = ({
  referralCode,
  friendsCount,
}) => {
  const [copied, setCopied] = useState(false);
  const inviteLink = `https://t.me/AuraTokenBot?start=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col pb-24 px-4 pt-4 text-white">
      {/* Banner */}
      <div className="bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-3xl p-6 mb-6 text-center shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mx-auto mb-3 shadow-inner">
          <Users className="w-7 h-7" />
        </div>
        <h2 className="text-lg font-extrabold text-indigo-300 mb-1">Invite Friends</h2>
        <p className="text-xs text-slate-300 max-w-xs mx-auto">
          Get 10% of your friends' mining earnings plus 20 AURA bonus instantly for each referral!
        </p>
      </div>

      {/* Stats */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Total Referred Friends</p>
            <p className="text-sm font-bold text-amber-300">{friendsCount} Friends</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Total Earned</p>
          <p className="text-sm font-bold text-emerald-400">+{friendsCount * 20} AURA</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Link Copied to Clipboard!" : "Copy Invite Link"}</span>
        </button>

        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(
            inviteLink
          )}&text=${encodeURIComponent("Join Aura Token and start mining crypto on Telegram!")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm active:scale-95 transition-all"
        >
          <Share2 className="w-4 h-4 text-sky-400" />
          <span>Share via Telegram</span>
        </a>
      </div>
    </div>
  );
};
        
