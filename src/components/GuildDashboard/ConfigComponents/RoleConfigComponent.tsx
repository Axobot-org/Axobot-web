import EditIcon from "@mui/icons-material/Edit";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { useContext, useMemo, useState } from "react";

import { GuildConfigEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { useFetchGuildRolesQuery } from "../../../repository/redux/api/api";
import { GuildRole } from "../../../repository/types/guild";
import { RoleOptionRepresentation } from "../../../repository/types/guild-config-types";
import RoleMention from "../../common/RoleMention";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";
import useIsConfigEdited from "./shared/useIsConfigEdited";

interface RoleConfigComponentProps {
  optionId: string;
  option: RoleOptionRepresentation & {value: unknown};
  guildId: string;
}

export default function RoleConfigComponent({ optionId, option, guildId }: RoleConfigComponentProps) {
  const { state, setValue, resetValue } = useContext(GuildConfigEditionContext);
  const isEdited = useIsConfigEdited(optionId);
  const { data, isLoading, error } = useFetchGuildRolesQuery({ guildId });
  const [editing, setEditing] = useState(false);

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

  if (option.value !== null && typeof option.value !== "string") {
    console.error("RoleConfigComponent: option value is not a string", option.value);
    return null;
  }

  const currentValue = isEdited ? state[optionId] as string : option.value;
  const currentRole: GuildRole | null = (
    roles.find((role) => role.id === currentValue)
    || (
      currentValue === null ? null : {
        id: currentValue,
        name: currentValue,
        color: 0,
        position: 0,
        permissions: "0",
        managed: false,
      }
    )
  );

  function onChange(value: GuildRole | null) {
    if (value === null) {
      setValue(optionId, null);
    } else if (value.id === option.value) {
      resetValue(optionId);
    } else {
      setValue(optionId, value.id);
    }
  }

  return (
    <SimpleConfiguration optionId={optionId}>
      {!error && (
        editing
          ? <Autocomplete
            openOnFocus
            blurOnSelect
            options={roles}
            value={currentRole}
            onChange={(_, newValue) => onChange(newValue)}
            sx={{ width: 250 }}
            loading={isLoading || !roles}
            isOptionEqualToValue={(opt, value) => opt.id === value.id}
            getOptionLabel={(role) => role.name}
            onBlur={() => setEditing(false)}
            renderInput={(params) => <TextField {...params} autoFocus variant="standard" placeholder="Pick a role" />}
            renderOption={(props, opt) => (
              <li {...props} key={opt.id}>
                <RoleMention name={opt.name} color={opt.color} />
              </li>
            )}
          />
          : <ReadonlyRolePicker currentRole={currentRole} onClick={() => setEditing(true)} />
      )}
    </SimpleConfiguration>
  );
}

interface ReadonlyRolePickerProps {
  currentRole: GuildRole | null;
  onClick: () => void;
}

function ReadonlyRolePicker({ currentRole, onClick }: ReadonlyRolePickerProps) {
  return (
    <Button onClick={onClick} endIcon={<EditIcon />} sx={{ textTransform: "none", fontSize: "1rem", height: "32px" }}>
      {
        currentRole === null
          ? <Typography color="gray" fontStyle="italic">Pick a role</Typography>
          : <RoleMention name={currentRole.name} color={currentRole.color} />
      }
    </Button>
  );
}
