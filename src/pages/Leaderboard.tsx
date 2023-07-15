import { Fragment, useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";

import GlobalHeader from "../components/Leaderboard/GlobalHeader";
import PlayersList from "../components/Leaderboard/PlayersList";
import { useGetLeaderboard } from "../repository/commands/useGetLeaderboard";

const LeaderboardPage = ({ guildId }: {guildId: string}) => {

  const { leaderboard, loading } = useGetLeaderboard(guildId, 0);

  const players = useMemo(() => {
    if (leaderboard === null) {
      return [];
    }

    return Object.entries(leaderboard)
      .sort((a, b) => a[1].ranking - b[1].ranking)
      .map(([id, points]) => points);
  }, [leaderboard]);

  return (
    <Fragment>
      <GlobalHeader />
      <PlayersList players={players} loading={loading} />
    </Fragment>
  );
};

export default function Leaderboard() {
  const { id } = useParams();

  if (id === undefined || (id !== "global" && !/^\d{17,20}$/.test(id))) {
    return <Navigate to="/" />;
  }

  return <LeaderboardPage guildId={id} />;
}