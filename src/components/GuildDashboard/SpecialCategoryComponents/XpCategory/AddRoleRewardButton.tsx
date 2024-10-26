import AddIcon from "@mui/icons-material/Add";
import { Autocomplete, Stack, TextField } from "@mui/material";

import { useFetchGuildRolesQuery } from "../../../../repository/redux/api/api";
import { GuildRole } from "../../../../repository/types/guild";
import RoleMention from "../../../common/RoleMention";

interface AddRoleRewardButtonProps {
  guildId: string;
  existingRoleIds: string[];
  addNewReward: (roleId: string) => void;
}
export default function AddRoleRewardButton({ guildId, existingRoleIds, addNewReward }: AddRoleRewardButtonProps) {
  const { data, error } = useFetchGuildRolesQuery({ guildId });

  if (error) {
    console.error("Failed to fetch roles", error);
  }
  if (!data) {
    return null;
  }

  const roles = data.filter((role) => !role.managed && role.id !== guildId && !existingRoleIds.includes(role.id));

  const onChange = (role: GuildRole | null) => {
    if (role) {
      addNewReward(role.id);
    }
  };

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <AddIcon color="primary" />
      <Autocomplete
        openOnFocus
        blurOnSelect
        options={roles}
        onChange={(_, newValue) => onChange(newValue)}
        sx={{ width: 250 }}
        isOptionEqualToValue={(opt, value) => opt.id === value.id}
        getOptionLabel={(role) => role.name}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Add a role reward"
          />
        )}
        renderOption={(props, opt) => (
          <li {...props} key={opt.id}>
            <RoleMention name={opt.name} color={opt.color} />
          </li>
        )}
      />
    </Stack>
  );
}
