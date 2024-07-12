import { useGuildConfigEditionContext } from "../../../../repository/context/GuildConfigEditionContext";

export default function useIsConfigEdited(optionId: string) {
  const { state } = useGuildConfigEditionContext();

  return state[optionId] !== undefined;
}