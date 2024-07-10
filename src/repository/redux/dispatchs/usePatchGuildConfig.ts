import { usePatchGuildConfigMutation } from "../api/api";

export function usePatchGuildConfig() {
  const [patchMutation, { error, isLoading, data }] = usePatchGuildConfigMutation();

  async function patchCommand(guildId: string, config: Record<string, unknown>) {
    await patchMutation({ guildId, config });
  }

  return { patchCommand, error, loading: isLoading, data };
}