import { InputBaseComponentProps, TextField } from "@mui/material";
import * as React from "react";
import { NumberFormatValues, NumericFormat, NumericFormatProps } from "react-number-format";

interface NumericInputProps extends React.ComponentProps<typeof TextField> {
  min?: number;
  max?: number;
  suffix?: string;
  acceptDecimals?: boolean;
  defaultValue?: number;
}

export default function NumericInput(props: NumericInputProps) {
  const { min, max, suffix, acceptDecimals, defaultValue, ...rest } = props;
  return (
    <TextField
      {...rest}
      sx={{ maxWidth: "4.5em" }}
      InputProps={{
        inputComponent: NumericFormatCustom,
      }}
      inputProps={{ min: min, max: max, suffix: suffix, defaultValue: defaultValue, decimalScale: acceptDecimals ? 3 : 0 }}
      variant="standard"
    />
  );
}

interface NumericFormatCustomProps extends InputBaseComponentProps {
  defaultValue?: string | number;
  min?: number;
  max?: number;
  suffix?: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, NumericFormatCustomProps>(
  function NumericFormatCustom(props, ref) {
    const { min, max, suffix, ...rest } = props;

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
        readOnly
        min={min}
        max={max}
        getInputRef={ref}
        placeholder={placeholder}
        isAllowed={checkValue}
        suffix={suffix ? " " + suffix : undefined}
        style={{ textAlign: "right", paddingLeft: 8, paddingRight: 8 }}
        thousandSeparator
      />
    );
  },
);