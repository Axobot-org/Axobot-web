import { IntOptionRepresentation } from "../../../repository/types/guild-config-types";
import NumericInput from "../../common/NumericInput";
import { ConfigurationName, SimpleConfigurationContainer } from "./shared/SharedConfigComponents";

interface IntConfigComponentProps {
  optionName: string;
  option: IntOptionRepresentation & {value: unknown};
}

export default function IntConfigComponent({ optionName, option }: IntConfigComponentProps) {
  return (
    <SimpleConfigurationContainer direction="row" justifyContent="space-between" alignItems="center">
      <ConfigurationName>{optionName}</ConfigurationName>
      <NumericInput
        value={option.value}
        min={option.min}
        max={option.max ?? undefined}
        defaultValue={option.default ?? undefined}
        acceptDecimals={false}
      />
    </SimpleConfigurationContainer>
  );
}