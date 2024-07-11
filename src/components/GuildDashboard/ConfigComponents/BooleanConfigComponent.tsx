import { Switch } from "@mui/material";
import { useContext } from "react";

import { GuildConfigEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { BooleanOptionRepresentation } from "../../../repository/types/guild-config-types";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";
import useIsConfigEdited from "./shared/useIsConfigEdited";

interface BooleanConfigComponentProps {
  optionId: string;
  option: BooleanOptionRepresentation & {value: unknown};
}

export default function BooleanConfigComponent({ optionId, option }: BooleanConfigComponentProps) {
  const { state, setValue, resetValue } = useContext(GuildConfigEditionContext);
  const isEdited = useIsConfigEdited(optionId);

  function onChange(value: boolean) {
    if (value === option.value) {
      resetValue(optionId);
    } else {
      setValue(optionId, value);
    }
  }

  return (
    <SimpleConfiguration optionId={optionId}>
      <Switch
        checked={(isEdited ? state[optionId] : option.value) as boolean}
        onChange={(e) => onChange(e.target.checked)}
      />
    </SimpleConfiguration>
  );
}