import { Typography } from "@mui/material";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import GlobalHeader from "../components/Leaderboard/GlobalHeader";
import PlayersList from "../components/Leaderboard/PlayersList";
import { useGetLeaderboard } from "../repository/commands/useGetLeaderboard";
import { PLAYERS_PER_PAGE } from "../repository/redux/slices/leaderboardSlice";

const LeaderboardPage = ({ guildId }: {guildId: string}) => {
  const { fetchLeaderboardPage, leaderboard, error, loading } = useGetLeaderboard(guildId);
  const [page, setPage] = useState(0);
  const [lastRequestedPage, setLastRequestedPage] = useState(-1);

  useEffect(() => {
    const lastLoadedPage = Math.ceil(Object.keys(leaderboard ?? {}).length / PLAYERS_PER_PAGE) - 1;
    if (lastLoadedPage < page && lastRequestedPage < page && !loading && !error) {
      console.debug("fetching page", page);
      setLastRequestedPage(page);
      fetchLeaderboardPage(page);
    }
  }, [error, fetchLeaderboardPage, page, leaderboard, loading, lastRequestedPage]);

  const players = useMemo(() => {
    if (leaderboard === null) {
      return [];
    }

    return Object.entries(leaderboard.players)
      .sort((a, b) => a[1].ranking - b[1].ranking)
      .map(([id, points]) => points);
  }, [leaderboard]);

  function loadMore() {
    setPage(page + 1);
  }

  if (error !== null) {
    console.error(error);
    return (
      <Fragment>
        <GlobalHeader />
        <Typography my={1}>
        Sorry, an unexpected error has occurred
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" fontStyle="italic">
          {error}
        </Typography>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <GlobalHeader />
      <PlayersList players={players} loading={loading} loadMore={loadMore} />
    </Fragment>
  );
};

export default function Leaderboard() {
  const { id } = useParams();

  if (id !== undefined && id !== "global" && !/^\d{17,20}$/.test(id)) {
    return <Navigate to="/" />;
  }

  return <LeaderboardPage guildId={id ?? "global"} />;
}
