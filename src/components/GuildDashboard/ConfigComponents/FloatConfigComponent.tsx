import { Slider, Stack } from "@mui/material";
import { useContext } from "react";

import { GuildConfigEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { FloatOptionRepresentation } from "../../../repository/types/guild-config-types";
import NumericInput from "../../common/NumericInput";
import { ComplexConfiguration } from "./shared/SharedConfigComponents";
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

  function getValue(): number | undefined {
    const value = isEdited ? state[optionId] : option.value;
    if (typeof value === "number") {
      return value;
    }
    return undefined;
  }

  const value = getValue();
  const defaultValue = option.default ?? undefined;

  // get marks from 0 to option.max every 0.25
  const marks = Array.from({ length: option.max / 0.25 + 1 }, (_, i) => ({
    value: i * 0.25,
  }));

  return (
    <ComplexConfiguration optionId={optionId}>
      <Stack direction="row" gap={2}>
        <Slider
          aria-label={optionId}
          defaultValue={defaultValue}
          valueLabelDisplay="auto"
          shiftStep={0.25}
          step={0.05}
          marks={marks}
          min={option.min}
          max={option.max}
          value={value}
          onChange={(_, newValue) => onChange(newValue as number)}
        />
        <NumericInput
          value={value}
          min={option.min}
          max={option.max}
          defaultValue={defaultValue}
          acceptDecimals={true}
          onValueChange={onChange}
        />
      </Stack>
    </ComplexConfiguration>
  );
}