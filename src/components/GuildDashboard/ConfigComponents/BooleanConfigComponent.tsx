import { Switch } from "@mui/material";

import { BooleanOptionRepresentation } from "../../../repository/types/guild-config-types";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";

interface BooleanConfigComponentProps {
  optionId: string;
  option: BooleanOptionRepresentation & {value: unknown};
}

export default function BooleanConfigComponent({ optionId, option }: BooleanConfigComponentProps) {
  return (
    <SimpleConfiguration optionId={optionId}>
      <Switch readOnly checked={option.value as boolean} />
    </SimpleConfiguration>
  );
}