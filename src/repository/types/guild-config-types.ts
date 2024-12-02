type OptionRequirement = {
  option: string;
  to_be: boolean | number | string | string[] | null;
} | {
  option: string;
  to_be_defined: true;
};

interface BaseOptionRepresentation {
  is_listed: boolean;
  requires?: OptionRequirement[];
}

export interface IntOptionRepresentation extends BaseOptionRepresentation {
  type: "int";
  min: number;
  max: number | null;
  default: number | null;
}

export interface FloatOptionRepresentation extends BaseOptionRepresentation {
  type: "float";
  min: number;
  max: number;
  default: number | null;
}

export interface BooleanOptionRepresentation extends BaseOptionRepresentation {
  type: "boolean";
  default: boolean | null;
}

export interface EnumOptionRepresentation extends BaseOptionRepresentation {
  type: "enum";
  values: string[];
  default: string | null;
}

export interface TextOptionRepresentation extends BaseOptionRepresentation {
  type: "text";
  min_length: number;
  max_length: number;
  default: string | null;
}

export interface RoleOptionRepresentation extends BaseOptionRepresentation {
  type: "role";
  allow_integrated_roles: boolean;
  allow_everyone: boolean;
  default: null;
}

export interface RolesListOptionRepresentation extends BaseOptionRepresentation {
  type: "roles_list";
  min_count: number;
  max_count: number;
  allow_integrated_roles: boolean;
  allow_everyone: boolean;
  default: null;
}

export interface TextChannelOptionRepresentation extends BaseOptionRepresentation {
  type: "text_channel";
  allow_threads: boolean;
  allow_announcement_channels: boolean;
  allow_non_nsfw_channels: boolean;
  default: null;
}

export interface TextChannelsListOptionRepresentation extends BaseOptionRepresentation {
  type: "text_channels_list";
  min_count: number;
  max_count: number;
  allow_threads: boolean;
  allow_announcement_channels: boolean;
  allow_non_nsfw_channels: boolean;
  default: null;
}

export interface VoiceChannelOptionRepresentation extends BaseOptionRepresentation {
  type: "voice_channel";
  allow_stage_channels: boolean;
  allow_non_nsfw_channels: boolean;
  default: null;
}

export interface CategoryOptionRepresentation extends BaseOptionRepresentation {
  type: "category";
  default: null;
}

export interface EmojisListOptionRepresentation extends BaseOptionRepresentation {
  type: "emojis_list";
  min_count: number;
  max_count: number;
  default: string[] | null;
}

export interface ColorOptionRepresentation extends BaseOptionRepresentation {
  type: "color";
  default: number | null;
}

export interface LevelupChannelOptionRepresentation extends BaseOptionRepresentation {
  type: "levelup_channel";
  default: string | null;
}

export type AllRepresentation = IntOptionRepresentation
  | FloatOptionRepresentation
  | BooleanOptionRepresentation
  | EnumOptionRepresentation
  | TextOptionRepresentation
  | RoleOptionRepresentation
  | RolesListOptionRepresentation
  | TextChannelOptionRepresentation
  | TextChannelsListOptionRepresentation
  | VoiceChannelOptionRepresentation
  | CategoryOptionRepresentation
  | EmojisListOptionRepresentation
  | ColorOptionRepresentation
  | LevelupChannelOptionRepresentation;

export const GuildConfigOptionCategoryNames = [
  "core",
  "info",
  "moderation",
  "partners",
  "poll-channels",
  "rss",
  "streamers",
  "voice-channels",
  "welcome",
  "xp",
  "edition-logs",
] as const;
export type GuildConfigOptionCategory = typeof GuildConfigOptionCategoryNames[number];
export const EmptyCategories: GuildConfigOptionCategory[] = ["rss", "edition-logs"];
export type GuildConfigOptionsMapType = Record<GuildConfigOptionCategory, Record<string, AllRepresentation>>;
export type GuildConfigOptionValueType = AllRepresentation["default"] | bigint;
export type PartialGuildConfig = Partial<Record<GuildConfigOptionCategory, Record<string, unknown>>>;
