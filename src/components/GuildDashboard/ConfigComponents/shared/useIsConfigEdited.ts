import { useGuildConfigBaseOptionEditionContext } from "../../../../repository/context/GuildConfigEditionContext";

export default function useIsConfigEdited(optionId: string) {
  const { state } = useGuildConfigBaseOptionEditionContext();

  return state[optionId] !== undefined;
}