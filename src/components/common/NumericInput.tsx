import { InputBaseComponentProps, TextField } from "@mui/material";
import * as React from "react";
import { NumberFormatValues, NumericFormat, NumericFormatProps } from "react-number-format";

interface NumericInputProps extends React.ComponentProps<typeof TextField> {
  min?: number;
  max?: number;
  suffix?: string;
  acceptDecimals?: boolean;
  defaultValue?: number;
  onValueChange? (value: number | undefined): void;
}

export default function NumericInput(props: NumericInputProps) {
  const { min, max, suffix, acceptDecimals, defaultValue, onValueChange, ...rest } = props;
  return (
    <TextField
      {...rest}
      sx={{ maxWidth: "4.5em" }}
      InputProps={{
        inputComponent: NumericFormatCustom,
      }}
      inputProps={{ min, max, suffix, defaultValue, onValueChange, decimalScale: acceptDecimals ? 3 : 0 }}
      variant="standard"
    />
  );
}

interface NumericFormatCustomProps extends InputBaseComponentProps {
  min?: number;
  max?: number;
  suffix?: string;
  defaultValue?: string | number;
  onValueChange? (value: number | undefined): void;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, NumericFormatCustomProps>(
  function NumericFormatCustom(props, ref) {
    const { min, max, suffix, onValueChange, ...rest } = props;

    function checkValue(values: NumberFormatValues) {
      if (values.floatValue === undefined) return true;
      if (min && values.floatValue < min) return false;
      if (max && values.floatValue > max) return false;
      return true;
    }

    const placeholder = rest.defaultValue !== undefined
      ? rest.defaultValue.toString() + (suffix ? " " + suffix : "")
      : "";

    return (
      <NumericFormat
        {...rest}
        min={min}
        max={max}
        getInputRef={ref}
        placeholder={placeholder}
        isAllowed={checkValue}
        suffix={suffix ? " " + suffix : undefined}
        style={{ textAlign: "right", paddingLeft: 8, paddingRight: 8 }}
        onValueChange={(values) => onValueChange?.(values.floatValue)}
        thousandSeparator
      />
    );
  },
);