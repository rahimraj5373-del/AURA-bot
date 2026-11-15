export interface DailyTask {
  id: string;
  title: string;
  reward: number;
  icon: string;
}

export interface SocialTask {
  id: string;
  title: string;
  link: string;
  rewardBoost: number;
  icon: string;
}

export const DAILY_TASKS: DailyTask[] = [
  { id: "check-in", title: "Daily Check-in", reward: 5, icon: "Calendar" },
  { id: "spin-wheel", title: "Lucky Spin", reward: 10, icon: "Zap" },
];

export const SOCIAL_TASKS: SocialTask[] = [
  { id: "tg-channel", title: "Join Telegram Channel", link: "https://t.me/auratoken", rewardBoost: 0.5, icon: "Send" },
  { id: "tg-chat", title: "Join Community Chat", link: "https://t.me/auratoken_chat", rewardBoost: 0.5, icon: "MessageSquare" },
  { id: "twitter-follow", title: "Follow on X (Twitter)", link: "https://x.com/auratoken", rewardBoost: 0.5, icon: "Twitter" },
  { id: "youtube-sub", title: "Subscribe YouTube", link: "https://youtube.com/@auratoken", rewardBoost: 0.5, icon: "Youtube" },
];
