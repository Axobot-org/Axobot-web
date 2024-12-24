import { useState } from "react";

import { StateRssFeed } from "../../context/GuildConfigEditionContext";
import { usePatchGuildConfigMutation, usePatchGuildRssFeedsMutation, usePutGuildRoleRewardsMutation } from "../api/api";

export function usePatchGuildConfig() {
  const [success, setSuccess] = useState(false);
  const [
    patchGuildConfigMutation,
    { error: errorOnGuildConfig, isLoading: isLoadingGuildConfig },
  ] = usePatchGuildConfigMutation();
  const [
    putRoleRewardsMutation,
    { error: errorOnRoleRewards, isLoading: isLoadingRoleRewards },
  ] = usePutGuildRoleRewardsMutation();
  const [
    patchGuildRssFeedsMutation,
    { error: errorOnRssFeeds, isLoading: isLoadingRssFeeds },
  ] = usePatchGuildRssFeedsMutation();

  async function patchGuildConfigCommand(guildId: string, config: Record<string, unknown>) {
    setSuccess(false);
    await patchGuildConfigMutation({ guildId, config });
    setSuccess(true);
  }

  async function putRoleRewardsCommand(
    guildId: string,
    roleRewards: Parameters<typeof putRoleRewardsMutation>[0]["roleRewards"]
  ) {
    setSuccess(false);
    await putRoleRewardsMutation({ guildId, roleRewards });
    setSuccess(true);
  }

  async function patchRssFeedsCommand(
    guildId: string,
    feedsState: StateRssFeed
  ) {
    if (feedsState.add.length === 0 && feedsState.edit.length === 0 && feedsState.remove.length === 0) {
      return;
    }
    setSuccess(false);
    await patchGuildRssFeedsMutation({ guildId, feeds: feedsState });
    setSuccess(true);
  }

  return {
    patchGuildConfigCommand,
    putRoleRewardsCommand,
    patchRssFeedsCommand,
    error: errorOnGuildConfig ?? errorOnRoleRewards ?? errorOnRssFeeds,
    loading: isLoadingGuildConfig || isLoadingRoleRewards || isLoadingRssFeeds,
    success,
  };
}
