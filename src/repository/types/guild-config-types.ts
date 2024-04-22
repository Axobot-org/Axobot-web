export interface IntOptionRepresentation {
  type: "int";
  min: number;
  max: number | null;
  default: number | null;
  is_listed: boolean;
}

export interface FloatOptionRepresentation {
  type: "float";
  min: number;
  max: number;
  default: number | null;
  is_listed: boolean;
}

export interface BooleanOptionRepresentation {
  type: "boolean";
  default: boolean | null;
  is_listed: boolean;
}

export interface EnumOptionRepresentation {
  type: "enum";
  values: string[];
  default: string | null;
  is_listed: boolean;
}

export interface TextOptionRepresentation {
  type: "text";
  min_length: number;
  max_length: number;
  default: string | null;
  is_listed: boolean;
}

export interface RoleOptionRepresentation {
  type: "role";
  allow_integrated_roles: boolean;
  allow_everyone: boolean;
  default: null;
  is_listed: boolean;
}

export interface RolesListOptionRepresentation {
  type: "roles_list";
  min_count: number;
  max_count: number;
  allow_integrated_roles: boolean;
  allow_everyone: boolean;
  default: null;
  is_listed: boolean;
}

export interface TextChannelOptionRepresentation {
  type: "text_channel";
  allow_threads: boolean;
  allow_announcement_channels: boolean;
  allow_non_nsfw_channels: boolean;
  default: null;
  is_listed: boolean;
}

export interface TextChannelsListOptionRepresentation {
  type: "text_channels_list";
  min_count: number;
  max_count: number;
  allow_threads: boolean;
  allow_announcement_channels: boolean;
  allow_non_nsfw_channels: boolean;
  default: null;
  is_listed: boolean;
}

export interface VoiceChannelOptionRepresentation {
  type: "voice_channel";
  allow_stage_channels: boolean;
  allow_non_nsfw_channels: boolean;
  default: null;
  is_listed: boolean;
}

export interface CategoryOptionRepresentation {
  type: "category";
  default: null;
  is_listed: boolean;
}

export interface EmojisListOptionRepresentation {
  type: "emojis_list";
  min_count: number;
  max_count: number;
  default: string[] | null;
  is_listed: boolean;
}

export interface ColorOptionRepresentation {
  type: "color";
  default: number | null;
  is_listed: boolean;
}

export interface LevelupChannelOptionRepresentation {
  type: "levelup_channel";
  default: string | null;
  is_listed: boolean;
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

export const GuildConfigOptionCategoryNames = ["core", "info", "moderation", "partners", "poll-channels", "streamers", "voice-channels", "welcome", "xp"] as const;
export type GuildConfigOptionCategory = typeof GuildConfigOptionCategoryNames[number];
export type GuildConfigOptionsMapType = Record<GuildConfigOptionCategory, Record<string, AllRepresentation>>;
export type GuildConfigOptionValueType = AllRepresentation["default"] | bigint;
export type PartialGuildConfig = Partial<Record<GuildConfigOptionCategory, Record<string, unknown>>>;
