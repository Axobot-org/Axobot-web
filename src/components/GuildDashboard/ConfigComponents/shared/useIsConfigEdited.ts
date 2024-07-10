import { useContext } from "react";

import { GuildConfigEditionContext } from "../../../../repository/context/GuildConfigEditionContext";

export default function useIsConfigEdited(optionId: string) {
  const { state } = useContext(GuildConfigEditionContext);

  return state[optionId] !== undefined;
}