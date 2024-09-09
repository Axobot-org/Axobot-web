import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";

import { useConfigComponentContext } from "../../../repository/context/ConfigComponentContext";
import { useGuildConfigEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { useFetchGuildRolesQuery } from "../../../repository/redux/api/api";
import { GuildRole } from "../../../repository/types/guild";
import { RolesListOptionRepresentation } from "../../../repository/types/guild-config-types";
import RoleMention from "../../common/RoleMention";
import { ComplexConfiguration } from "./shared/SharedConfigComponents";
import useIsConfigEdited from "./shared/useIsConfigEdited";

interface RolesListConfigComponentProps {
  optionId: string;
  option: RolesListOptionRepresentation & {value: unknown};
}

function isArrayOfString(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

function findRole(roles: GuildRole[], roleId: string): GuildRole {
  return roles.find((role) => role.id === roleId) ?? {
    id: roleId,
    name: roleId,
    color: 0,
    position: 0,
    permissions: "0",
    managed: false,
  };
}

export default function RolesListConfigComponent({ optionId, option }: RolesListConfigComponentProps) {
  const { guildId, state, setValue, resetValue } = useGuildConfigEditionContext();
  const { isDisabled } = useConfigComponentContext();
  const isEdited = useIsConfigEdited(optionId);
  const { data, isLoading, error } = useFetchGuildRolesQuery({ guildId });

  const roles = useMemo(() => (
    data?.filter((role) => {
      if (!option.allow_everyone && role.id === guildId) return false;
      if (!option.allow_integrated_roles && role.managed) return false;
      return true;
    }).map((role) => ({
      ...role,
      name: role.id === guildId ? "everyone" : role.name,
    })) ?? []
  ), [data, guildId, option.allow_everyone, option.allow_integrated_roles]);

  if (option.value !== null && !isArrayOfString(option.value)) {
    console.error("RolesListConfigComponent: option value is not an array of string", option.value);
    return null;
  }

  const currentValue = isEdited ? state[optionId] as string[] : option.value;
  const currentRoles = currentValue?.map((roleId) => findRole(roles, roleId)) ?? [];

  function onChange(value: GuildRole[]) {
    if (isDisabled) return;
    if (value.length === 0) {
      if (option.value === null) {
        resetValue(optionId);
      } else {
        setValue(optionId, null);
      }
    } else if (value.map((role) => role.id) === option.value) {
      resetValue(optionId);
    } else {
      setValue(optionId, value.map((role) => role.id));
    }
  }

  return (
    <ComplexConfiguration optionId={optionId}>
      {!error && (
        <Autocomplete
          multiple
          openOnFocus
          disabled={isDisabled}
          options={roles}
          value={currentRoles}
          loading={isLoading || !roles}
          getOptionLabel={(role) => role.name}
          getOptionDisabled={() => currentRoles.length >= option.max_count}
          onChange={(_, newValue) => onChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              placeholder={currentRoles.length === 0 ? "Pick roles" : undefined}
            />
          )}
          renderOption={(props, opt) => (
            <li {...props} key={opt.id}>
              <RoleMention name={opt.name} color={opt.color} />
            </li>
          )}
          renderTags={(value, getTagProps) => value.map((role, index) => (
            <RoleMention name={role.name} color={role.color} {...getTagProps({ index })} key={role.id} />
          ))}
          sx={{
            "& .MuiInput-root": {
              paddingBottom: "5px",
            },
          }}
        />
      )}
    </ComplexConfiguration>
  );
}
