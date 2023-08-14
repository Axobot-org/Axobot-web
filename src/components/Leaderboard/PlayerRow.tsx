import { Avatar, ListItem, ListItemIcon, ListItemText, styled, Tooltip, Typography } from "@mui/material";

import useUserSelector from "../../repository/redux/selectors/useUserSelector";
import { RankedPlayer } from "../../repository/types/users";
import CircularProgressWithLabel from "../common/CircularProgressWithLabel";

interface PlayerRowProps {
  player: RankedPlayer;
}

export default function PlayerRow({ player }: PlayerRowProps) {
  const user = useUserSelector();

  const getBadgeStyle = (index: number) => {
    switch (index) {
    case 0:
      return { backgroundColor: "#FFD700", color: "#806000" };
    case 1:
      return { backgroundColor: "#C0C0C0", color: "#404040" };
    case 2:
      return { backgroundColor: "#cd7f32", color: "#3e260f" };
    default:
      return undefined;
    }
  };

  const Container = user?.id === player.user_id ? UserCustomListItem : CustomListItem;

  const xpFromLastLevel = player.xp - player.xp_to_current_level;
  const xpToNextLevel = player.xp_to_next_level - player.xp_to_current_level;
  const levelProgress = xpFromLastLevel / xpToNextLevel * 100;

  return (
    <Container key={player.user_id}>
      <ListItemIcon>
        <RankBadge sx={getBadgeStyle(player.ranking)}>
          {player.ranking + 1}
        </RankBadge>
      </ListItemIcon>

      <UserAvatar alt={player.username ?? undefined} src={player.avatar} />

      <ListItemText>
        <UserName>{player.username}</UserName>
      </ListItemText>

      <UserXp>{BigInt(player.xp).toLocaleString()} xp</UserXp>

      <CircularProgressWithLabel thickness={3} value={levelProgress} label={
        <Tooltip title={`${xpFromLastLevel.toLocaleString()} / ${xpToNextLevel.toLocaleString()} xp`}>
          <UserLevel>{player.level.toString()}</UserLevel>
        </Tooltip>
      } />
    </Container>
  );
}

const CustomListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: 15,
  marginBottom: theme.spacing(0.5),
  transitionProperty: "background-color",
  transitionDuration: "150ms",
  "&:hover": {
    backgroundColor: theme.palette.custom.background1,
  },
}));

const UserCustomListItem = styled(CustomListItem)(({ theme }) => ({
  backgroundColor: theme.palette.custom.background1,
  borderStyle: "solid",
  borderColor: theme.palette.primary.dark,
  borderWidth: 2,
}));

const RankBadge = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.custom.background2,
  color: theme.palette.text.primary,
  width: 32,
  height: 32,
  fontSize: 16,
  fontWeight: 700,
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(2),
  width: 32,
  height: 32,
}));

const UserName = styled("span")(({ theme }) => ({
  fontWeight: 600,
}));

const UserXp = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontSize: 14,
}));

const UserLevel = styled(Typography)({
  fontWeight: 700,
  fontSize: 14,
});