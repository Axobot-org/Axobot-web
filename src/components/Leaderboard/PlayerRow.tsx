import { Avatar, ListItem, ListItemIcon, ListItemText, styled, Typography } from "@mui/material";

import useUserSelector from "../../repository/redux/selectors/useUserSelector";
import { RankedPlayer } from "../../repository/types/users";

interface PlayerRowProps {
  player: RankedPlayer;
}

export default function PlayerRow({ player }: PlayerRowProps) {
  const user = useUserSelector();

  const getBadgeStyle = (index: number) => {
    switch (index) {
    case 0:
      return { backgroundColor: "#FFD700", color: "#cc9900" };
    case 1:
      return { backgroundColor: "#C0C0C0", color: "#737373" };
    case 2:
      return { backgroundColor: "#cd7f32", color: "#864d13" };
    default:
      return undefined;
    }
  };

  const Container = user?.id === player.user_id ? UserCustomListItem : CustomListItem;

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
        <NameXpSeparator />
        <UserXp>{BigInt(player.xp).toLocaleString()} xp</UserXp>
      </ListItemText>
    </Container>
  );
}

const NameXpSeparator = () => (
  <Typography component="span" color="text.secondary" mx={0.5}>
    {" – "}
  </Typography>
);

const CustomListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: 15,
  marginBottom: theme.spacing(0.5),
  "&:hover": {
    backgroundImage: `linear-gradient(${theme.palette.custom.background1}, ${theme.palette.custom.background1})`,
  },
}));

const UserCustomListItem = styled(CustomListItem)(({ theme }) => ({
  backgroundColor: theme.palette.custom.background2,
  borderStyle: "solid",
  borderColor: theme.palette.primary.dark,
  borderWidth: 2,
}));

const RankBadge = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.custom.background3,
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

const UserXp = styled("span")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 14,
}));