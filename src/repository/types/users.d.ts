export interface AuthenticatedUserObject {
  id: string;
  username: string;
  globalName: string | null;
  avatar: string;
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