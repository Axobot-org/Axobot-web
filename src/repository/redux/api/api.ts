import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BotInfoResponse, LeaderboardAsJson, LeaderboardResponse, LoginJSONResponse } from "../../types/api";
import { GuildChannel, GuildConfig, GuildData, GuildRole } from "../../types/guild";
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
    fetchBotInfo: builder.query<BotInfoResponse, void>({
      query: () => "discord/bot-info",
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
    fetchLeaderboardAsJson: builder.query<LeaderboardAsJson, string >({
      query: (guildId) => `discord/guild/${guildId}/leaderboard.json`,
    }),
    fetchDefaultGuildConfig: builder.query<GuildConfigOptionsMapType, void>({
      query: () => "discord/default-guild-config",
    }),
    fetchGuild: builder.query<GuildData, { guildId: string }>({
      query: ({ guildId }) => `discord/guild/${guildId}`,
    }),
    fetchGuildConfig: builder.query<GuildConfig, {guildId: string, categories: "all" | GuildConfigOptionCategory[]}>({
      query: ({ guildId, categories }) => ({
        url: `discord/guild/${guildId}/config`,
        params: { categories },
      }),
      serializeQueryArgs: ({ queryArgs: { guildId } }) => `config-${guildId}`,
      merge: (currentCache, newItems) => ({
        ...currentCache,
        ...newItems,
      }),
      forceRefetch({ currentArg, endpointState }) {
        try {
          if (endpointState === undefined || currentArg === undefined) {
            return true;
          }
          if (currentArg.categories === "all") {
            return true;
          }
          if (currentArg.categories.some((category) => (endpointState.data as GuildConfig)[category] === undefined)) {
            return true;
          }
        } catch (e) {
          console.error(e);
        }
        return false;
      },
    }),
    fetchGuildRoles: builder.query<GuildRole[], { guildId: string }>({
      query: ({ guildId }) => `discord/guild/${guildId}/roles`,
    }),
    fetchGuildChannels: builder.query<GuildChannel[], { guildId: string }>({
      query: ({ guildId }) => `discord/guild/${guildId}/channels`,
    }),

    // ----- MUTATIONS ----- //
    login: builder.mutation<LoginJSONResponse, string>({
      query: (discordCode) => ({
        url: "auth/discord-callback",
        method: "POST",
        params: { code: discordCode },
      }),
    }),
    patchGuildConfig: builder.mutation<Record<string, unknown>, { guildId: string, config: Record<string, unknown> }>({
      query: ({ guildId, config }) => ({
        url: `discord/guild/${guildId}/config`,
        method: "PATCH",
        body: config,
      }),
      async onQueryStarted({ guildId }, { dispatch, queryFulfilled }) {
        // update fetchGuildConfig cache with returned updated data
        try {
          const { data } = await queryFulfilled;
          dispatch(
            axoApi.util.updateQueryData("fetchGuildConfig", { guildId, categories: [] }, (draft) => {
              for (const categoryValue of Object.values(draft)) {
                for (const [optionId, newValue] of Object.entries(data)) {
                  if (categoryValue[optionId] !== undefined) {
                    categoryValue[optionId] = newValue;
                  }
                }
              }
            })
          );
        } catch { /* don't update cache on error */ }
      },
    }),
    putGuildLeaderboard: builder.mutation<undefined, {guildId: string, players: LeaderboardAsJson}>({
      query: ({ guildId, players }) => ({
        url: `discord/guild/${guildId}/leaderboard`,
        method: "PUT",
        body: players,
      }),
    }),
  }),
});

export const {
  useFetchMeQuery,
  useFetchBotInfoQuery,
  useFetchGuildsQuery,
  useFetchGuildQuery,
  useFetchLeaderboardQuery,
  useLazyFetchLeaderboardAsJsonQuery,
  useFetchDefaultGuildConfigQuery,
  useFetchGuildConfigQuery,
  useFetchGuildRolesQuery,
  useFetchGuildChannelsQuery,

  useLoginMutation,
  usePatchGuildConfigMutation,
  usePutGuildLeaderboardMutation,
} = axoApi;
