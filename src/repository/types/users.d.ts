export interface AuthenticatedUserObject {
  id: string;
  username: string;
  globalName: string;
  avatar: string;
}

export interface RankedPlayer {
    ranking: number;
    user_id: bigint;
    xp: bigint;
    username: string | null;
    avatar: string;
}