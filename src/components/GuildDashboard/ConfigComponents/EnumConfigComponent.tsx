import { MenuItem, Select, styled } from "@mui/material";

import { useConfigComponentContext } from "../../../repository/context/ConfigComponentContext";
import { useGuildConfigBaseOptionEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { PopulatedOption } from "../../../repository/types/guild";
import { EnumOptionRepresentation } from "../../../repository/types/guild-config-types";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";
import useIsConfigEdited from "./shared/useIsConfigEdited";


interface EnumConfigComponentProps {
  optionId: string;
  option: PopulatedOption<EnumOptionRepresentation>;
}

export default function EnumConfigComponent({ optionId, option }: EnumConfigComponentProps) {
  const { state, setValue, resetValue } = useGuildConfigBaseOptionEditionContext();
  const { isDisabled } = useConfigComponentContext();
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
        disabled={isDisabled}
        variant="standard"
      >
        {
          option.values.map((value) => (
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
