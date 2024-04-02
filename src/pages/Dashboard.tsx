import { CircularProgress, Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { Helmet } from "react-helmet-async";

import PageTitle from "../components/common/PageTitle";
import { useGetOrFetchGuilds } from "../repository/commands/useGetOrFetchGuilds";


const MetaTags = () => (
  <Helmet>
    <title>Axobot: Server Dashboard</title>
  </Helmet>
);

function GuildsGrid() {
  const { guilds, error, loading } = useGetOrFetchGuilds();

  if (loading || guilds === undefined) {
    return <CircularProgress color="primary" aria-label="Loading guilds" />;
  }

  if (error) {
    console.error(error);
    return (
      <Fragment>
        <Typography my={1}>
          Oops, something went wrong!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" fontStyle="italic">
          Sorry, an unexpected error has occurred.
        </Typography>
      </Fragment>
    );
  }

  return (
    <>
      {Object.entries(guilds).map(([guildId, guild]) => (
        <Typography key={guildId}>
          {guild.name}
        </Typography>
      ))}
    </>
  );

}


export default function GuildSelection() {

  return (
    <Fragment>
      <MetaTags />
      <PageTitle text="Select your server" />
      <GuildsGrid />
    </Fragment>
  );
}

export const Component = GuildSelection;