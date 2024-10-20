import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { CircularProgress, IconButton, Stack, styled, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

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
  deleteReward: (roleRewardId: string) => void;
}

export default function RoleRewardsList({ guildId, roleRewards, editRewardLevel, deleteReward }: RoleRewardsListProps) {
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
          deleteReward={deleteReward}
        />
      ))}
    </div>
  );
}


interface RoleRewardRowProps {
  roleReward: BaseRoleReward;
  role: GuildRole | undefined;
  editRewardLevel: (roleRewardId: string, level: number) => void;
  deleteReward: (roleRewardId: string) => void;
}
function RoleRewardRow({ roleReward, role, editRewardLevel, deleteReward }: RoleRewardRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  const currentLevel = Number(roleReward.level);
  const onLevelChange = (value: number | undefined) => {
    if (value && value !== currentLevel) {
      editRewardLevel(roleReward.id, value);
    }
  };

  const startEditing = () => setIsEditing(true);
  const onDelete = () => deleteReward(roleReward.id);

  return (
    <Stack direction="row" height="48px" alignItems="center">
      <Stack direction="row" py={1} minWidth="18rem" alignItems="first baseline">
        <RoleMention name={role?.name ?? roleReward.roleId} color={role?.color ?? 0} />
        <Typography color="gray" whiteSpace="preserve"> given at level </Typography>
        {isEditing
          ? <NumericInput
            value={roleReward.level}
            min={1}
            max={10_000}
            acceptDecimals={false}
            onValueChange={onLevelChange}
            autoFocus
            onBlur={() => setIsEditing(false)}
          />
          : <Typography fontWeight="bold">{roleReward.level}</Typography>
        }
      </Stack>
      {!isEditing && <>
        <Tooltip title="Edit" arrow>
          <ColoredIconButton size="small" colorOnHover="orange" onClick={startEditing}><EditIcon fontSize="small" /></ColoredIconButton>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <ColoredIconButton size="small" colorOnHover="red" onClick={onDelete}><HighlightOffIcon fontSize="small" /></ColoredIconButton>
        </Tooltip>
      </>}
    </Stack>
  );
}

const ColoredIconButton = styled(IconButton, { shouldForwardProp: prop => prop !== "colorOnHover" })<{colorOnHover: string}>(({ theme, colorOnHover }) => ({
  maxHeight: "30px",
  color: theme.palette.grey[600],
  transition: "color 0.2s",
  "&:hover": {
    color: colorOnHover,
  },
}));
