import { Avatar, CircularProgress, List, ListItem, ListItemIcon, ListItemText, styled } from "@mui/material";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { RankedPlayer } from "../../repository/types/users";

interface PlayersListProps {
  players: RankedPlayer[];
  loading: boolean;
}

export default function PlayersList({ players, loading }: PlayersListProps) {

  const hasNextPage = true;

  const loadMore = () => {
    console.log("should be loading more");
  };

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

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
  });

  return (
    <List>
      {players.map((player) => (
        <CustomListItem key={player.user_id}>
          <RankBadge sx={getBadgeStyle(player.ranking)}>
            {player.ranking + 1}
          </RankBadge>
          <ListItemIcon>
            <Avatar alt={player.username ?? undefined} src={player.avatar} sx={{ width: 32, height: 32 }} />
          </ListItemIcon>
          <ListItemText>
            {player.ranking + 1}. {player.username} - {player.xp} xp
          </ListItemText>
        </CustomListItem>
      ))}

      {(loading || hasNextPage) && (
        <ListItem ref={sentryRef} sx={{ justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </ListItem>
      )}
    </List>
  );
}

const CustomListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: 15,
  marginBottom: theme.spacing(0.5),
  "&:hover": {
    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  },
}));

const RankBadge = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.custom.background3,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(2),
  width: 32,
  height: 32,
  fontSize: 16,
  fontWeight: 700,
}));