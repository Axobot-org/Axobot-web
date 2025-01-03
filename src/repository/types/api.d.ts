export interface LoginJSONResponse {
  token: string;
  id: string;
  username: string;
  globalName: string | null;
  avatar: string;
}

export interface RoleReward {
  id: string;
  guildId: string;
  roleId: string;
  level: string;
  addedAt: string;
}

export interface LeaderboardResponse {
  guild: {
    id: string;
    name: string;
    icon: string | null;
  } | null;
  players: RankedPlayer[];
  players_count: number;
  xp_type: string;
  xp_rate: number;
  xp_decay: number;
  role_rewards: (
    RoleReward & {
      role: {
        name: string;
        color: number;
      } | null;
    }
  )[] | undefined;
}

export type LeaderboardAsJson = {
  user_id: string;
  xp: number;
}[];

export interface BotInfoResponse {
  approximate_guild_count: number;
}

export interface ConfigEditionLog {
  id: number;
  user_id: string;
  username: string | null;
  avatar: string;
  type: string;
  origin: "bot" | "website" | null;
  date: string;
  data: unknown;
}

export interface RssFeed {
  id: string;
  channelId: string;
  type: string;
  link: string;
  displayName?: string;
  date: Date;
  structure: string;
  roles: string[];
  useEmbed: boolean;
  embed: {
    authorText?: string;
    title?: string;
    footerText?: string;
    color?: number;
    showDateInFooter?: boolean;
    enableLinkInTitle?: boolean;
    imageLocation?: "thumbnail" | "banner" | "none";
  };
  silentMention: boolean;
  recentErrors: number;
  enabled: boolean;
  addedAt: Date;
}


interface __RssFeedPUT_Common {
  channelId: string;
  structure: string;
  roles: string[];
  useEmbed: boolean;
  embed: {
    authorText?: string;
    title?: string;
    footerText?: string;
    color?: number;
    showDateInFooter?: boolean;
    enableLinkInTitle?: boolean;
    imageLocation?: "thumbnail" | "banner" | "none";
  };
  silentMention: boolean;
  enabled: boolean;
}

export interface RssFeedPUTData {
  add?: (__RssFeedPUT_Common & {
    link: string;
    type: Exclude<typeof VALID_RSS_FEED_TYPES[number], "tw">;
  })[];
  edit?: (__RssFeedPUT_Common & {
    id: string;
  })[];
  remove?: string[];
}

export interface RssFeedParsedEntry {
  url: string;
  title: string;
  pubDate: string;
  entryId: string | null;
  author: string | null;
  channel: string | null;
  image: string | null;
  postText: string | null;
  postDescription: string | null;
}

