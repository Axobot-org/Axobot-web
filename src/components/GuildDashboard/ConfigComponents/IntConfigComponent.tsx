import { useGuildConfigEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { IntOptionRepresentation } from "../../../repository/types/guild-config-types";
import NumericInput from "../../common/NumericInput";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";
import useIsConfigEdited from "./shared/useIsConfigEdited";

interface IntConfigComponentProps {
  optionId: string;
  option: IntOptionRepresentation & {value: unknown};
}

export default function IntConfigComponent({ optionId, option }: IntConfigComponentProps) {
  const { state, setValue, resetValue } = useGuildConfigEditionContext();
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
        acceptDecimals={false}
        onValueChange={onChange}
      />
    </SimpleConfiguration>
  );
}