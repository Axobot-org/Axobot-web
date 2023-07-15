import { CircularProgress, List, ListItem } from "@mui/material";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { RankedPlayer } from "../../repository/types/users";
import PlayerRow from "./PlayerRow";

interface PlayersListProps {
  players: RankedPlayer[];
  loading: boolean;
}

export default function PlayersList({ players, loading }: PlayersListProps) {
  const hasNextPage = true;

  const loadMore = () => {
    console.log("should be loading more");
  };

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
  });

  return (
    <List sx={{
      minWidth: {
        xs: "95%",
        sm: "min(80%, 40rem)",
      },
    }}>
      {players.map(player => <PlayerRow key={player.user_id} player={player} />)}

      {(loading || hasNextPage) && (
        <ListItem ref={sentryRef} sx={{ justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </ListItem>
      )}
    </List>
  );
}

