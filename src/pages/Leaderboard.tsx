import { Fragment } from "react";
import { Navigate, useParams } from "react-router-dom";

import { useGetLeaderboard } from "../repository/commands/useGetLeaderboard";

const LeaderboardPage = ({ guildId }: {guildId: string}) => {

  const { leaderboard } = useGetLeaderboard(guildId, 1);

  return (
    <Fragment>
      <div>{guildId}</div>
      <p>{JSON.stringify(leaderboard)}</p>
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