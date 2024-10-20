import { CircularProgress, Stack, Typography } from "@mui/material";

import { useFetchGuildRolesQuery } from "../../../../repository/redux/api/api";
import { RoleReward } from "../../../../repository/types/api";
import { GuildRole } from "../../../../repository/types/guild";
import NumericInput from "../../../common/NumericInput";
import RoleMention from "../../../common/RoleMention";

type BaseRoleReward = Pick<RoleReward, "id" | "level" | "roleId">;
interface RoleRewardsListProps {
  guildId: string;
  roleRewards: BaseRoleReward[];
  editRewardLevel: (roleRewardId: string, level: number) => void;
}

export default function RoleRewardsList({ guildId, roleRewards, editRewardLevel }: RoleRewardsListProps) {
  const { data: roles } = useFetchGuildRolesQuery({ guildId });

  if (roles === undefined) {
    return <CircularProgress />;
  }

  return (
    <div>
      {roleRewards.map((roleReward) => (
        <RoleRewardRow
          key={roleReward.id}
          roleReward={roleReward}
          role={roles.find(r => r.id === roleReward.roleId)}
          editRewardLevel={editRewardLevel}
        />
      ))}
    </div>
  );
}


interface RoleRewardRowProps {
  roleReward: BaseRoleReward;
  role: GuildRole | undefined;
  editRewardLevel: (roleRewardId: string, level: number) => void;
}
function RoleRewardRow({ roleReward, role, editRewardLevel }: RoleRewardRowProps) {
  const currentLevel = Number(roleReward.level);
  const onLevelChange = (value: number | undefined) => {
    if (value && value !== currentLevel) {
      editRewardLevel(roleReward.id, value);
    }
  };

  return (
    <Stack direction="row" py={1} alignItems="first baseline">
      <RoleMention name={role?.name ?? roleReward.roleId} color={role?.color ?? 0} />
      <Typography color="gray" whiteSpace="preserve"> given at level </Typography>
      <NumericInput
        value={roleReward.level}
        min={1}
        max={10_000}
        acceptDecimals={false}
        onValueChange={onLevelChange}
      />
    </Stack>
  );
}
