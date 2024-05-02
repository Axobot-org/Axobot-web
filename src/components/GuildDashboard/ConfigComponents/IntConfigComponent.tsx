import { IntOptionRepresentation } from "../../../repository/types/guild-config-types";
import NumericInput from "../../common/NumericInput";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";

interface IntConfigComponentProps {
  optionId: string;
  option: IntOptionRepresentation & {value: unknown};
}

export default function IntConfigComponent({ optionId, option }: IntConfigComponentProps) {
  return (
    <SimpleConfiguration optionId={optionId}>
      <NumericInput
        value={option.value}
        min={option.min}
        max={option.max ?? undefined}
        defaultValue={option.default ?? undefined}
        acceptDecimals={false}
      />
    </SimpleConfiguration>
  );
}