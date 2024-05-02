import EditIcon from "@mui/icons-material/Edit";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";

import { useFetchGuildRolesQuery } from "../../../repository/redux/api/api";
import { GuildRole } from "../../../repository/types/guild";
import { RoleOptionRepresentation } from "../../../repository/types/guild-config-types";
import RoleMention from "../../common/RoleMention";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";

interface RoleConfigComponentProps {
  optionId: string;
  option: RoleOptionRepresentation & {value: unknown};
  guildId: string;
}

export default function RoleConfigComponent({ optionId, option, guildId }: RoleConfigComponentProps) {
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

  const currentRole: GuildRole | null = (
    roles.find((role) => role.id === option.value)
    || (
      option.value === null ? null : {
        id: option.value,
        name: option.value,
        color: 0,
        position: 0,
        permissions: "0",
        managed: false,
      }
    )
  );

  return (
    <SimpleConfiguration optionId={optionId}>
      {!error && (
        editing
          ? <Autocomplete
            openOnFocus
            blurOnSelect
            options={roles}
            value={currentRole}
            sx={{ width: 250 }}
            loading={isLoading || !roles}
            isOptionEqualToValue={(opt, value) => opt.id === value.id}
            getOptionLabel={(role) => role.name}
            onBlur={() => setEditing(false)}
            renderInput={(params) => <TextField {...params} autoFocus variant="standard" placeholder="Pick a role" />}
            renderOption={(props, opt) => (
              <li {...props}><RoleMention name={opt.name} color={opt.color} /></li>
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
