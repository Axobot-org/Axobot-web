import { AllRepresentation } from "./guild-config-types";

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

export type GuildConfig = Record<string, Record<string, unknown>>

export type PopulatedGuildConfig = Record<string, AllRepresentation & { value: unknown }>