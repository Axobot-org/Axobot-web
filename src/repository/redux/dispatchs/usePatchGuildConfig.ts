import { useState } from "react";

import { usePatchGuildConfigMutation, usePutGuildRoleRewardsMutation } from "../api/api";

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
  return {
    patchGuildConfigCommand,
    putRoleRewardsCommand,
    error: errorOnGuildConfig ?? errorOnRoleRewards,
    loading: isLoadingGuildConfig || isLoadingRoleRewards,
    success,
  };
}
