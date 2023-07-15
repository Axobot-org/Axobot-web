export interface AuthenticatedUserObject {
  id: string;
  username: string;
  globalName: string;
  avatar: string;
}

export interface RankedPlayer {
    ranking: number;
    user_id: string;
    xp: string;
    username: string | null;
    avatar: string;
}