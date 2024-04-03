export interface GuildData {
  id: string;
  name: string;
  icon: string | null;
  banner: string | null;
  splash: string | null;
  owner: boolean;
  isAdmin: boolean;
  isBotPresent: boolean;
  permissions: string;
  features: string[];
}
