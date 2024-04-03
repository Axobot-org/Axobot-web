import { CircularProgress, List, ListItem } from "@mui/material";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { RankedPlayer } from "../../repository/types/leaderboard";
import PlayerRow from "./PlayerRow";

interface PlayersListProps {
  players: RankedPlayer[];
  loading: boolean;
  hasNextPage: boolean;
  loadMore: () => void;
}

export default function PlayersList({ players, loading, hasNextPage, loadMore }: PlayersListProps) {

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    delayInMs: 500,
  });

  return (
    <List
      id="players-list"
      aria-busy={loading}
      sx={{
        minWidth: {
          xs: "95vw",
          sm: "min(80vw, 40rem)",
        },
        maxWidth: "98vw",
      }}
    >
      {players.map(player => <PlayerRow key={player.user_id} player={player} />)}

      {(loading || hasNextPage) && (
        <ListItem ref={sentryRef} sx={{ justifyContent: "center" }}>
          <CircularProgress color="primary" aria-label="Loading players" aria-describedby="players-list" />
        </ListItem>
      )}
    </List>
  );
}

