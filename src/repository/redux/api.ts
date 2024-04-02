import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AuthenticatedUserObject, RankedPlayer } from "../types/users";
import { RootState } from "./store";

interface LoginJSONResponse {
  token: string;
  id: string;
  username: string;
  globalName: string | null;
  avatar: string;
}

interface GuildData {
  id: string;
  name: string;
  icon: string | null;
  banner: string | null;
  splash: string | null;
  owner: boolean;
  isAdmin: boolean;
  permissions: string;
  features: string[];
}

interface LeaderboardResponse {
  guild: {
    id: string;
    name: string;
    icon: string | null;
  } | null,
  players: RankedPlayer[],
  players_count: number,
  xp_type: string,
}

interface LeaderboardData {
  guild: LeaderboardResponse["guild"]
  players: {[key: string]: RankedPlayer}
  totalCount: number,
  xpType: string,
}

export const axoApi = createApi({
  reducerPath: "axoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchMe: builder.query<AuthenticatedUserObject, void>({
      query: () => "auth/me",
    }),
    fetchGuilds: builder.query<GuildData[], void>({
      query: () => "discord/@me/guilds",
    }),
    fetchLeaderboard: builder.query<LeaderboardData, { guildId: "global" | string, page: number, limit: number }>({
      query: ({ guildId, page, limit }) => ({
        url: guildId === "global" ? "discord/leaderboard/global" : `discord/guild/${guildId}/leaderboard`,
        params: { page, limit },
      }),
      serializeQueryArgs: ({ queryArgs: { guildId } }) => `lb-${guildId}`,
      transformResponse: (response: LeaderboardResponse) => ({
        guild: response.guild,
        totalCount: response.players_count,
        xpType: response.xp_type,
        players: response.players.reduce((acc, curr) => {
          acc[curr.ranking] = curr;
          return acc;
        }, {} as Record<string, RankedPlayer>),
      }),
      merge: (currentCache, newItems) => ({
        guild: newItems.guild,
        totalCount: newItems.totalCount,
        xpType: newItems.xpType,
        players: { ...currentCache.players, ...newItems.players },
      }),
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    login: builder.mutation<LoginJSONResponse, string>({
      query: (discordCode) => ({
        url: "auth/discord-callback",
        method: "POST",
        params: { code: discordCode },
      }),
    }),
  }),
});

export const { useFetchMeQuery } = axoApi;
export const { useFetchGuildsQuery } = axoApi;
export const { useFetchLeaderboardQuery } = axoApi;

export const { useLoginMutation } = axoApi;
