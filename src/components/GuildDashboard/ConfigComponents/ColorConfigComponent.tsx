import { matchIsValidColor, MuiColorInput } from "mui-color-input";
import { useState } from "react";

import { useConfigComponentContext } from "../../../repository/context/ConfigComponentContext";
import { useGuildConfigEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { PopulatedOption } from "../../../repository/types/guild";
import { ColorOptionRepresentation } from "../../../repository/types/guild-config-types";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";
import useIsConfigEdited from "./shared/useIsConfigEdited";

interface ColorConfigComponentProps {
  optionId: string;
  option: PopulatedOption<ColorOptionRepresentation>;
}

export default function ColorConfigComponent({ optionId, option }: ColorConfigComponentProps) {
  const { state, setValue, resetValue } = useGuildConfigEditionContext();
  const { isDisabled } = useConfigComponentContext();
  const isEdited = useIsConfigEdited(optionId);

  const defaultValue = option.default ?? 0x0;
  const currentSavedValue = (option.value as number | null) ?? defaultValue;
  const currentValue = isEdited ? (state[optionId] as number ?? defaultValue) : currentSavedValue;
  const currentValueAsHex = "#" + currentValue.toString(16).padStart(6, "0");

  const [lastCorrectValue, setLastCorrectValue] = useState(currentValueAsHex);

  function onChange(value: string) {
    if (isDisabled) return;
    if (value === "") {
      if (defaultValue === currentSavedValue) {
        resetValue(optionId);
      } else {
        setValue(optionId, null);
      }
      return;
    }
    const parsedValue = value.startsWith("#") ? parseInt(value.slice(1), 16) : parseInt(value, 16);
    if (parsedValue === currentSavedValue) {
      resetValue(optionId);
    } else {
      setValue(optionId, parsedValue);
    }
    if (matchIsValidColor(value)) {
      setLastCorrectValue(value);
    }
  }

  return (
    <SimpleConfiguration optionId={optionId}>
      <MuiColorInput
        disabled={isDisabled}
        value={currentValueAsHex}
        fallbackValue={lastCorrectValue}
        onChange={onChange}
        variant="standard"
        format="hex"
        isAlphaHidden
        sx={{ maxWidth: "7.5em" }}
      />
    </SimpleConfiguration>
  );
}