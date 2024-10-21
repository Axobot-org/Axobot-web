export interface LoginJSONResponse {
  token: string;
  id: string;
  username: string;
  globalName: string | null;
  avatar: string;
}

export interface RoleReward {
  id: string;
  guildId: string;
  roleId: string;
  level: string;
  addedAt: string;
}

export interface LeaderboardResponse {
  guild: {
    id: string;
    name: string;
    icon: string | null;
  } | null;
  players: RankedPlayer[];
  players_count: number;
  xp_type: string;
  xp_rate: number;
  xp_decay: number;
  role_rewards: (
    RoleReward & {
      role: {
        name: string;
        color: number;
      } | null;
    }
  )[] | undefined;
}

export type LeaderboardAsJson = {
  user_id: string;
  xp: number;
}[];

export interface BotInfoResponse {
  approximate_guild_count: number;
}

export interface ConfigEditionLog {
  id: number;
  user_id: string;
  username: string | null;
  avatar: string;
  type: string;
  origin: "bot" | "website" | null;
  date: string;
  data: unknown;
}
