import { ChannelType } from "discord-api-types/payloads/v10";

import { AllRepresentation } from "./guild-config-types";

export interface GuildData {
  id: string;
  name: string;
  icon: string | null;
  banner: string | null;
  splash: string | null;
  isOwner: boolean;
  isAdmin: boolean;
  isBotPresent: boolean;
  permissions: string;
  features: string[];
}

export type GuildConfig = Record<string, Record<string, unknown>>;

export type PopulatedOption<T extends AllRepresentation> = T & { value: unknown };

export type PopulatedGuildConfig = Record<string, PopulatedOption<AllRepresentation>>;

export type OptionRequirement = Exclude<AllRepresentation["requires"], undefined>[0];

export interface GuildRole {
  id: string;
  name: string;
  color: number;
  position: number;
  permissions: string;
  managed: boolean;
}

export interface GuildChannel {
  id: string;
  name: string;
  type: ChannelType;
  isText: boolean;
  isVoice: boolean;
  isThread: boolean;
  isNSFW: boolean;
  position: number | null;
  parentId: string | null;
}
