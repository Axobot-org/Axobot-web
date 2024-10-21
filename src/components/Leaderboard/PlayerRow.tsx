import { Avatar, ListItem, ListItemIcon, ListItemText, styled, Tooltip, Typography } from "@mui/material";

import { formatNumber } from "../../i18n/formatFunctions";
import { useGetorFetchMe } from "../../repository/commands/useGetOrFetchMe";
import { RankedPlayer } from "../../repository/types/leaderboard";
import CircularProgressWithLabel from "../common/CircularProgressWithLabel";

interface PlayerRowProps {
  player: RankedPlayer;
}

export default function PlayerRow({ player }: PlayerRowProps) {
  const { user } = useGetorFetchMe();

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

  const xpText = `${formatNumber(xpFromLastLevel)} / ${formatNumber(xpToNextLevel)} xp`;

  return (
    <Container key={player.user_id}>
      <ListItemIcon>
        <RankBadge sx={getBadgeStyle(player.ranking)}>
          {player.ranking + 1}
        </RankBadge>
      </ListItemIcon>

      <UserAvatar alt={player.username ?? undefined} src={player.avatar + "?size=64"} />

      <ListItemText>
        <UserName>{player.username}</UserName>
        <SubtitleUserXp>{formatNumber(BigInt(player.xp))} xp</SubtitleUserXp>
      </ListItemText>

      <RightUserXp>{formatNumber(BigInt(player.xp))} xp</RightUserXp>

      <CircularProgressWithLabel
        thickness={3}
        value={levelProgress}
        aria-label={xpText}
        label={(
          <Tooltip title={xpText}>
            <UserLevel>{player.level.toString()}</UserLevel>
          </Tooltip>
        )}
      />
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
  width: 28,
  height: 28,
  fontSize: 14,
  fontWeight: 700,
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(2),
  width: 32,
  height: 32,
}));

const UserName = styled("span")({
  fontWeight: 600,
});

const SubtitleUserXp = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontSize: 12,
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const RightUserXp = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontSize: 14,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const UserLevel = styled(Typography)({
  fontWeight: 700,
  fontSize: 14,
});
