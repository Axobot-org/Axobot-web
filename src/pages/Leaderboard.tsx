import { Typography } from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";

import GlobalHeader from "../components/Leaderboard/GlobalHeader";
import GuildHeader from "../components/Leaderboard/GuildHeader";
import PlayersList from "../components/Leaderboard/PlayersList";
import { useFetchLeaderboardQuery } from "../repository/redux/api";

const PLAYERS_PER_PAGE = 30;

// enum ErrorMessage {
//   InvalidToken = "Invalid token",
//   XpNotEnabled = "XP is not enabled for this guild",
//   UserNotMember = "User is not a member of this guild",
//   GuildNotFound = "Guild not found",
//   UserNotAuthenticated = "No authentication token found in request headers",
// }

// function getErrorText(error: string) {
//   switch (error) {
//   case ErrorMessage.InvalidToken:
//     return "Authentication failed, please refresh the page and try again.";
//   case ErrorMessage.XpNotEnabled:
//     return "XP is not enabled for this guild.";
//   case ErrorMessage.UserNotMember:
//     return "You do not have permission to view this guild's leaderboard.";
//   case ErrorMessage.GuildNotFound:
//     return "This guild does not exist.";
//   default:
//     return "Sorry, an unexpected error has occurred.";
//   }
// }

const LeaderboardPage = ({ guildId }: { guildId: string }) => {
  const [requestedPage, setRequestedPage] = useState(0);
  const { data, error, isLoading } = useFetchLeaderboardQuery({ guildId, page: requestedPage, limit: PLAYERS_PER_PAGE });

  const loading = isLoading || (guildId === "global" && !!data?.guild) || (guildId !== "global" && data?.guild?.id !== guildId);
  const leaderboard = loading ? undefined : data;

  const players = useMemo(() => {
    if (leaderboard === undefined) {
      return [];
    }

    return Object.entries(leaderboard.players)
      .sort((a, b) => a[1].ranking - b[1].ranking)
      .map(([_id, points]) => points);
  }, [leaderboard]);

  const guildData = useMemo(() => {
    if (guildId === "global") {
      return null;
    }
    if (leaderboard?.guild) {
      return leaderboard.guild;
    }
    return {
      id: guildId,
      name: "Loading...",
      icon: null,
    };
  }, [guildId, leaderboard?.guild]);

  const hasNextPage = leaderboard?.totalCount ? leaderboard.totalCount > (requestedPage + 1) * PLAYERS_PER_PAGE : false;

  // TODO: check if the guild is in private mode and user is not registered
  // if (error === ErrorMessage.UserNotAuthenticated) {
  //   return <NeedsLoginErrorPage />;
  // }

  function loadMore() {
    const lastLoadedPage = Math.ceil(Object.keys(leaderboard?.players ?? {}).length / PLAYERS_PER_PAGE) - 1;
    if (!hasNextPage || loading || error) {
      return;
    }
    console.debug("fetching page", lastLoadedPage + 1);
    setRequestedPage(lastLoadedPage + 1);
  }

  if (error !== undefined) {
    console.error(error);
    return (
      <Fragment>
        {guildData ? <GuildHeader guildData={guildData} /> : <GlobalHeader />}
        <Typography my={1}>
          Oops, something went wrong!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" fontStyle="italic">
          {`${error}`}
        </Typography>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {guildData ? <GuildHeader guildData={guildData} /> : <GlobalHeader />}
      <PlayersList players={players} loading={loading} hasNextPage={hasNextPage} loadMore={loadMore} />
    </Fragment>
  );
};

const MetaTags = ({ guildId }: { guildId: string }) => {
  const pageTitle = guildId === "global" ? "Global Leaderboard" : "Server Leaderboard";
  return (
    <Helmet>
      <title>Axobot: {pageTitle}</title>
    </Helmet>
  );
};

export default function Leaderboard() {
  const { id } = useParams();

  if (id !== undefined && id !== "global" && !/^\d{17,20}$/.test(id)) {
    return <Navigate to="/" />;
  }

  const guildId = id ?? "global";

  return (
    <Fragment>
      <MetaTags guildId={guildId} />
      <LeaderboardPage guildId={guildId} />
    </Fragment>
  );
}

export const Component = Leaderboard;
