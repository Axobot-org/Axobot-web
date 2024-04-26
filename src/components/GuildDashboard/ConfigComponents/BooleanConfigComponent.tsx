import { Switch } from "@mui/material";

import { BooleanOptionRepresentation } from "../../../repository/types/guild-config-types";
import { ConfigurationName, SimpleConfigurationContainer } from "./shared/SharedConfigComponents";

interface BooleanConfigComponentProps {
  optionName: string;
  option: BooleanOptionRepresentation & {value: unknown};
}

export default function BooleanConfigComponent({ optionName, option }: BooleanConfigComponentProps) {
  return (
    <SimpleConfigurationContainer>
      <ConfigurationName>{optionName}</ConfigurationName>

      <Switch readOnly checked={option.value as boolean} />
    </SimpleConfigurationContainer>
  );
}