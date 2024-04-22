import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { LeaderboardResponse, LoginJSONResponse } from "../../types/api";
import { GuildConfig, GuildData } from "../../types/guild";
import { GuildConfigOptionCategory, GuildConfigOptionsMapType } from "../../types/guild-config-types";
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
    // ----- QUERIES ----- //
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
        xpRate: response.xp_rate,
        xpDecay: response.xp_decay,
        roleRewards: response.role_rewards ? [
          ...response.role_rewards.map((roleReward) => ({
            ...roleReward,
            level: BigInt(roleReward.level),
          })),
        ] : undefined,
        players: response.players.reduce((acc, curr) => {
          acc[curr.ranking] = curr;
          return acc;
        }, {} as Record<string, RankedPlayer>),
      }),
      merge: (currentCache, newItems) => ({
        guild: newItems.guild,
        totalCount: newItems.totalCount,
        xpType: newItems.xpType,
        xpRate: newItems.xpRate,
        xpDecay: newItems.xpDecay,
        roleRewards: newItems.roleRewards,
        players: { ...currentCache.players, ...newItems.players },
      }),
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    fetchDefaultGuildConfig: builder.query<GuildConfigOptionsMapType, void>({
      query: () => "discord/default-guild-config",
    }),
    fetchGuildConfig: builder.query<GuildConfig, {guildId: string, categories: "all" | GuildConfigOptionCategory[]}>({
      query: ({ guildId, categories }) => ({
        url: `discord/guild/${guildId}/config`,
        params: { categories },
      }),
    }),

    // ----- MUTATIONS ----- //
    login: builder.mutation<LoginJSONResponse, string>({
      query: (discordCode) => ({
        url: "auth/discord-callback",
        method: "POST",
        params: { code: discordCode },
      }),
    }),
  }),
});

export const {
  useFetchMeQuery,
  useFetchGuildsQuery,
  useFetchLeaderboardQuery,
  useFetchDefaultGuildConfigQuery,
  useFetchGuildConfigQuery,

  useLoginMutation,
} = axoApi;
