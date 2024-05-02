import { FloatOptionRepresentation } from "../../../repository/types/guild-config-types";
import NumericInput from "../../common/NumericInput";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";

interface FloatConfigComponentProps {
  optionId: string;
  option: FloatOptionRepresentation & {value: unknown};
}

export default function FloatConfigComponent({ optionId, option }: FloatConfigComponentProps) {
  return (
    <SimpleConfiguration optionId={optionId}>
      <NumericInput
        value={option.value}
        min={option.min}
        max={option.max ?? undefined}
        defaultValue={option.default ?? undefined}
        acceptDecimals={true}
      />
    </SimpleConfiguration>
  );
}