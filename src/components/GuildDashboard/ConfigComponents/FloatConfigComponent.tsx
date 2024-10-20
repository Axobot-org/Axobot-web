import { Slider, Stack } from "@mui/material";

import { useConfigComponentContext } from "../../../repository/context/ConfigComponentContext";
import { useGuildConfigBaseOptionEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { PopulatedOption } from "../../../repository/types/guild";
import { FloatOptionRepresentation } from "../../../repository/types/guild-config-types";
import NumericInput from "../../common/NumericInput";
import { ComplexConfiguration } from "./shared/SharedConfigComponents";
import useIsConfigEdited from "./shared/useIsConfigEdited";

interface FloatConfigComponentProps {
  optionId: string;
  option: PopulatedOption<FloatOptionRepresentation>;
}

export default function FloatConfigComponent({ optionId, option }: FloatConfigComponentProps) {
  const { state, setValue, resetValue } = useGuildConfigBaseOptionEditionContext();
  const { isDisabled } = useConfigComponentContext();
  const isEdited = useIsConfigEdited(optionId);

  function onChange(value: number | undefined) {
    if (isDisabled) return;
    if (value === undefined) {
      setValue(optionId, null);
    } else if (value === option.value) {
      resetValue(optionId);
    } else {
      setValue(optionId, value);
    }
  }

  function onBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (isDisabled) return;
    const newValue = parseFloat(event.target.value);
    if (isNaN(newValue)) {
      resetValue(optionId);
    } else if (newValue < option.min) {
      onChange(option.min);
    } else if (newValue > option.max) {
      onChange(option.max);
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

  // get marks from 0 to option.max every 0.25, but label only every 0.5
  const labelPrefix = optionId === "xp_rate" ? "x" : "";
  const marks = [
    {
      value: option.min,
      label: labelPrefix + option.min,
    },
    ...Array.from({ length: option.max / 0.25 + 1 }, (_, i) => ({
      value: i * 0.25,
      label: (i * 0.25 % 0.5 === 0) ? (labelPrefix + i * 0.25) : "",
    })),
  ];

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
          value={value ?? defaultValue}
          onChange={(_, newValue) => onChange(newValue as number)}
          disabled={isDisabled}
        />
        <NumericInput
          value={value}
          min={option.min}
          max={option.max}
          defaultValue={defaultValue}
          acceptDecimals={true}
          onValueChange={onChange}
          onBlur={onBlur}
          disabled={isDisabled}
        />
      </Stack>
    </ComplexConfiguration>
  );
}