import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { LeaderboardResponse, LoginJSONResponse } from "../../types/api";
import { GuildData } from "../../types/guild";
import { LeaderboardData, RankedPlayer } from "../../types/leaderboard";
import { AuthenticatedUserObject } from "../../types/users";
import { RootState } from "../store";


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
