import { FloatOptionRepresentation } from "../../../repository/types/guild-config-types";
import NumericInput from "../../common/NumericInput";
import { ConfigurationName, SimpleConfigurationContainer } from "./shared/SharedConfigComponents";

interface FloatConfigComponentProps {
  optionName: string;
  option: FloatOptionRepresentation & {value: unknown};
}

export default function FloatConfigComponent({ optionName, option }: FloatConfigComponentProps) {
  return (
    <SimpleConfigurationContainer direction="row" justifyContent="space-between" alignItems="center">
      <ConfigurationName>{optionName}</ConfigurationName>
      <NumericInput
        value={option.value}
        min={option.min}
        max={option.max ?? undefined}
        defaultValue={option.default ?? undefined}
        acceptDecimals={true}
      />
    </SimpleConfigurationContainer>
  );
}