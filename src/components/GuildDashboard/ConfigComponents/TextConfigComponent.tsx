import { TextField } from "@mui/material";

import { useGuildConfigEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { TextOptionRepresentation } from "../../../repository/types/guild-config-types";
import { ComplexConfiguration } from "./shared/SharedConfigComponents";
import useIsConfigEdited from "./shared/useIsConfigEdited";

interface TextConfigComponentProps {
  optionId: string;
  option: TextOptionRepresentation & {value: unknown};
}

export default function TextConfigComponent({ optionId, option }: TextConfigComponentProps) {
  const { state, setValue, resetValue } = useGuildConfigEditionContext();
  const isEdited = useIsConfigEdited(optionId);

  function onChange(value: string) {
    if (value === "") {
      if (option.value === null) {
        resetValue(optionId);
      } else {
        setValue(optionId, null);
      }
    } else if (value === option.value) {
      resetValue(optionId);
    } else {
      setValue(optionId, value.slice(0, option.max_length));
    }
  }

  function onBlur(event: React.FocusEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    if (newValue === "" && option.value !== null && option.value === option.default) {
      resetValue(optionId);
    }
  }

  const currentValue = (isEdited ? state[optionId] : option.value) ?? "";

  return (
    <ComplexConfiguration optionId={optionId}>
      <TextField
        placeholder={option.default ?? undefined}
        value={currentValue}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        variant="standard"
        multiline={option.max_length > 150}
        maxRows={5}
        inputProps={{ minLength: option.min_length, maxLength: option.max_length }}
      />
    </ComplexConfiguration>
  );
}
