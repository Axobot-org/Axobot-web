import { MuiColorInput } from "mui-color-input";

import { ColorOptionRepresentation } from "../../../repository/types/guild-config-types";
import { ConfigurationName, SimpleConfigurationContainer } from "./shared/SharedConfigComponents";

interface ColorConfigComponentProps {
  optionName: string;
  option: ColorOptionRepresentation & {value: unknown};
}

export default function ColorConfigComponent({ optionName, option }: ColorConfigComponentProps) {
  const currentValue = (option.value as string | null) ?? option.default ?? 0x0;
  const currentValueAsHex = "#" + currentValue.toString(16).padStart(6, "0");
  return (
    <SimpleConfigurationContainer>
      <ConfigurationName>{optionName}</ConfigurationName>
      <MuiColorInput
        value={currentValueAsHex}
        variant="standard"
        format="hex"
        isAlphaHidden
        sx={{ maxWidth: "7.5em" }}
      />
    </SimpleConfigurationContainer>
  );
}