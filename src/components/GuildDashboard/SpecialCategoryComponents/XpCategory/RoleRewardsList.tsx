import { CircularProgress, Stack, Typography } from "@mui/material";

import { useFetchGuildRolesQuery } from "../../../../repository/redux/api/api";
import { RoleReward } from "../../../../repository/types/api";
import { GuildRole } from "../../../../repository/types/guild";
import RoleMention from "../../../common/RoleMention";

interface RoleRewardsListProps {
  guildId: string;
  roleRewards: RoleReward[];
}

export default function RoleRewardsList({ guildId, roleRewards }: RoleRewardsListProps) {
  const { data: roles } = useFetchGuildRolesQuery({ guildId });

  if (roles === undefined) {
    return <CircularProgress />;
  }

  const sortedRoleRewards = roleRewards.toSorted((a, b) => Number(a.level) - Number(b.level));

  return (
    <div>
      {sortedRoleRewards.map((roleReward) => (
        <RoleRewardRow key={roleReward.id} roleReward={roleReward} role={roles.find(r => r.id === roleReward.roleId)} />
      ))}
    </div>
  );
}

function RoleRewardRow({ roleReward, role }: {roleReward: RoleReward, role: GuildRole | undefined}) {
  return (
    <Stack direction="row" py={1} alignItems="first baseline">
      <RoleMention name={role?.name ?? roleReward.roleId} color={role?.color ?? 0} />
      <Typography color="gray" whiteSpace="preserve"> given at level </Typography>
      <Typography fontSize="1.1rem" fontWeight="bold">{roleReward.level}</Typography>
    </Stack>
  );
}
