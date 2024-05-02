import { MuiColorInput } from "mui-color-input";

import { ColorOptionRepresentation } from "../../../repository/types/guild-config-types";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";

interface ColorConfigComponentProps {
  optionId: string;
  option: ColorOptionRepresentation & {value: unknown};
}

export default function ColorConfigComponent({ optionId, option }: ColorConfigComponentProps) {
  const currentValue = (option.value as string | null) ?? option.default ?? 0x0;
  const currentValueAsHex = "#" + currentValue.toString(16).padStart(6, "0");
  return (
    <SimpleConfiguration optionId={optionId}>
      <MuiColorInput
        value={currentValueAsHex}
        variant="standard"
        format="hex"
        isAlphaHidden
        sx={{ maxWidth: "7.5em" }}
      />
    </SimpleConfiguration>
  );
}