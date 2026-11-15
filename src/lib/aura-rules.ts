export const BASE_MINING_RATE = 1;
export const BOOST_PER_SOCIAL_TASK = 0.5;
export const MIN_WITHDRAWAL = 100;
export const SOCIAL_VERIFY_MIN_MS = 10000;
export const STARTING_BALANCE = 10;
export const STREAK_REWARDS = [1, 2, 3, 5, 10, 15, 20];
export const HOUR_MS = 3600000;

export type WithdrawalNetwork = "TON" | "EVM";

export function dayKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function miningRate(verifiedTasks: number, baseRate = BASE_MINING_RATE, boost = BOOST_PER_SOCIAL_TASK): number {
  return baseRate + verifiedTasks * boost;
}

export function minedAmount(startedAt: number, now: number, ratePerHour: number): number {
  const hours = Math.max(0, (now - startedAt) / HOUR_MS);
  return hours * ratePerHour;
}

export function canClaimDaily(lastClaimAt: number | null, now: number): boolean {
  if (lastClaimAt === null) return true;
  return now - lastClaimAt >= HOUR_MS * 24;
}

export function formatAura(amount: number, decimals = 2): string {
  return amount.toFixed(decimals);
}

export function formatClock(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((n) => n.toString().padStart(2, "0")).join(":");
}

export function toUsd(auraAmount: number): number {
  return auraAmount * 0.10;
}

export function canClaimStreak(streak: { streakDay: number; lastStreakDate: string | null }, today: Date): boolean {
  const todayStr = dayKey(today);
  if (streak.lastStreakDate === null) return true;
  const lastDate = new Date(streak.lastStreakDate);
  const diffDays = Math.round((today.getTime() - lastDate.getTime()) / (HOUR_MS * 24));
  return diffDays === 1 || (diffDays === 0 && streak.lastStreakDate !== todayStr);
}

export function claimStreak(streak: { streakDay: number; lastStreakDate: string | null }, today: Date, rewards: number[]): { reward: number; next: { streakDay: number; lastStreakDate: string } } {
  const todayStr = dayKey(today);
  const isNextDay = streak.lastStreakDate !== null && Math.round((today.getTime() - new Date(streak.lastStreakDate).getTime()) / (HOUR_MS * 24)) === 1;
  const streakDay = isNextDay ? (streak.streakDay % rewards.length) + 1 : 1;
  const reward = rewards[streakDay - 1];
  return { reward, next: { streakDay, lastStreakDate: todayStr } };
}

export function withdrawalError(params: { amount: number; balance: number; minWithdrawal: number; enabled: boolean; network: string; address: string }): string | null {
  if (!params.enabled) return "Withdrawals are currently disabled.";
  if (params.amount < params.minWithdrawal) return `Minimum withdrawal is ${params.minWithdrawal} AURA.`;
  if (params.amount > params.balance) return "Insufficient balance.";
  if (!params.address.trim()) return `Please provide a valid ${params.network} address.`;
  return null;
      }
    
