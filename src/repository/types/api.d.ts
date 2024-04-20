export interface LoginJSONResponse {
  token: string;
  id: string;
  username: string;
  globalName: string | null;
  avatar: string;
}

export interface LeaderboardResponse {
  guild: {
    id: string;
    name: string;
    icon: string | null;
  } | null,
  players: RankedPlayer[],
  players_count: number,
  xp_type: string,
  xp_rate: number,
  xp_decay: number,
  role_rewards: {
    id: string,
    guildId: string,
    roleId: string,
    level: string,
    addedAt: string,
    role: {
      name: string,
      color: number,
    } | null,
  }[] | undefined,
}