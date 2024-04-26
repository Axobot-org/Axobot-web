import { MenuItem, Select } from "@mui/material";

import { EnumOptionRepresentation } from "../../../repository/types/guild-config-types";
import { ConfigurationName, SimpleConfigurationContainer } from "./shared/SharedConfigComponents";


interface EnumConfigComponentProps {
  optionName: string;
  option: EnumOptionRepresentation & {value: unknown};
}

export default function EnumConfigComponent({ optionName, option }: EnumConfigComponentProps) {
  return (
    <SimpleConfigurationContainer>
      <ConfigurationName>{optionName}</ConfigurationName>
      <Select
        value={option.value}
        variant="standard"
      >
        {
          option.values.map(value => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))
        }
      </Select>
    </SimpleConfigurationContainer>
  );
}