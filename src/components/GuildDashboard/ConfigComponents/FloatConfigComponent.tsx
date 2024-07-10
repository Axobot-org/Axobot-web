import { useContext } from "react";

import { GuildConfigEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { FloatOptionRepresentation } from "../../../repository/types/guild-config-types";
import NumericInput from "../../common/NumericInput";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";
import useIsConfigEdited from "./shared/useIsConfigEdited";

interface FloatConfigComponentProps {
  optionId: string;
  option: FloatOptionRepresentation & {value: unknown};
}

export default function FloatConfigComponent({ optionId, option }: FloatConfigComponentProps) {
  const { state, setValue, resetValue } = useContext(GuildConfigEditionContext);
  const isEdited = useIsConfigEdited(optionId);

  function onChange(value: number | undefined) {
    if (value === undefined) {
      setValue(optionId, null);
    } else if (value === option.value) {
      resetValue(optionId);
    } else {
      setValue(optionId, value);
    }
  }

  return (
    <SimpleConfiguration optionId={optionId}>
      <NumericInput
        value={isEdited ? state[optionId] : option.value}
        min={option.min}
        max={option.max ?? undefined}
        defaultValue={option.default ?? undefined}
        acceptDecimals={true}
        onValueChange={onChange}
      />
    </SimpleConfiguration>
  );
}