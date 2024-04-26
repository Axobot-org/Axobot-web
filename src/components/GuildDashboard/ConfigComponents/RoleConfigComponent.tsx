import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";

import { useFetchGuildRolesQuery } from "../../../repository/redux/api/api";
import { RoleOptionRepresentation } from "../../../repository/types/guild-config-types";
import { ConfigurationName, SimpleConfigurationContainer } from "./shared/SharedConfigComponents";

interface RoleConfigComponentProps {
  optionName: string;
  option: RoleOptionRepresentation & {value: unknown};
  guildId: string;
}

export default function RoleConfigComponent({ optionName, option, guildId }: RoleConfigComponentProps) {
  const { data, isLoading, error } = useFetchGuildRolesQuery({ guildId });

  const roles = useMemo(() => (
    data?.filter((role) => {
      if (!option.allow_everyone && role.id === guildId) return false;
      if (!option.allow_integrated_roles && role.managed) return false;
      return true;
    }) ?? []
  ), [data, guildId, option.allow_everyone, option.allow_integrated_roles]);

  const currentRole = roles.find((role) => role.id === option.value);

  return (
    <SimpleConfigurationContainer>
      <ConfigurationName>{optionName}</ConfigurationName>
      {!error && (
        <Autocomplete
          options={roles}
          value={currentRole}
          sx={{ width: 250 }}
          loading={isLoading}
          isOptionEqualToValue={(opt, value) => opt.id === value.id}
          getOptionLabel={(role) => "@" + role.name}
          renderInput={(params) => <TextField {...params} variant="standard" placeholder="Pick a role" />}
        />
      )}
    </SimpleConfigurationContainer>
  );
}