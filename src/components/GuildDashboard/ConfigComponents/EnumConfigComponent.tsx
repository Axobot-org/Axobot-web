import { MenuItem, Select, styled } from "@mui/material";
import { useContext } from "react";

import { GuildConfigEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { EnumOptionRepresentation } from "../../../repository/types/guild-config-types";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";
import useIsConfigEdited from "./shared/useIsConfigEdited";


interface EnumConfigComponentProps {
  optionId: string;
  option: EnumOptionRepresentation & {value: unknown};
}

export default function EnumConfigComponent({ optionId, option }: EnumConfigComponentProps) {
  const { state, setValue, resetValue } = useContext(GuildConfigEditionContext);
  const isEdited = useIsConfigEdited(optionId);

  function onChange(value: string) {
    if (value === option.value) {
      resetValue(optionId);
    } else {
      setValue(optionId, value);
    }
  }

  return (
    <SimpleConfiguration optionId={optionId}>
      <StyledSelect
        value={isEdited ? state[optionId] : option.value}
        onChange={(e) => onChange(e.target.value as string)}
        variant="standard"
      >
        {
          option.values.map(value => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))
        }
      </StyledSelect>
    </SimpleConfiguration>
  );
}

const StyledSelect = styled(Select)({
  "& .MuiInputBase-input": {
    paddingLeft: 8,
  },
});