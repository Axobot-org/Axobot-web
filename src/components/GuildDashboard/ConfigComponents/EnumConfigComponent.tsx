import { MenuItem, Select } from "@mui/material";

import { EnumOptionRepresentation } from "../../../repository/types/guild-config-types";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";


interface EnumConfigComponentProps {
  optionId: string;
  option: EnumOptionRepresentation & {value: unknown};
}

export default function EnumConfigComponent({ optionId, option }: EnumConfigComponentProps) {
  return (
    <SimpleConfiguration optionId={optionId}>
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
    </SimpleConfiguration>
  );
}