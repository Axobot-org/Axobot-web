import { Switch } from "@mui/material";

import { useConfigComponentContext } from "../../../repository/context/ConfigComponentContext";
import { useGuildConfigBaseOptionEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { PopulatedOption } from "../../../repository/types/guild";
import { BooleanOptionRepresentation } from "../../../repository/types/guild-config-types";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";
import useIsConfigEdited from "./shared/useIsConfigEdited";

interface BooleanConfigComponentProps {
  optionId: string;
  option: PopulatedOption<BooleanOptionRepresentation>;
}

export default function BooleanConfigComponent({ optionId, option }: BooleanConfigComponentProps) {
  const { state, setValue, resetValue } = useGuildConfigBaseOptionEditionContext();
  const { isDisabled } = useConfigComponentContext();
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
        disabled={isDisabled}
      />
    </SimpleConfiguration>
  );
}
