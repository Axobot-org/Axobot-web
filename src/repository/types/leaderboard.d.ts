import { LeaderboardResponse } from "./api";

export interface LeaderboardData {
  guild: LeaderboardResponse["guild"]
  players: {[key: string]: RankedPlayer}
  totalCount: number,
  xpType: string,
  xpRate: number,
  xpDecay: number,
  roleRewards: RoleReward[] | undefined,
}

export interface RankedPlayer {
  ranking: number;
  user_id: string;
  xp: number;
  level: number;
  xp_to_current_level: number;
  xp_to_next_level: number;
  username: string | null;
  avatar: string;
}

export interface RoleReward {
  id: string,
  guildId: string,
  roleId: string,
  level: bigint,
  addedAt: string,
  role: {
    name: string,
    color: number,
  } | null,
}