export interface AuthenticatedUserObject {
  id: string;
  username: string;
  globalName: string | null;
  avatar: string;
}