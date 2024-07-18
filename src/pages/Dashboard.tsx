import { CircularProgress, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { Fragment } from "react/jsx-runtime";

import PageTitle from "../components/common/PageTitle";
import GuildBox from "../components/Dashboard/GuildBox";
import { useGetOrFetchAdminGuilds } from "../repository/commands/useGetOrFetchAdminGuilds";

function GuildsGrid() {
  const { guilds, error, loading } = useGetOrFetchAdminGuilds();

  // sort guilds per isBotPresent first, then by name
  const sortedGuilds = useMemo(() => (
    guilds?.sort((a, b) => {
      if (a.isBotPresent === b.isBotPresent) {
        return a.name.localeCompare(b.name);
      }
      return a.isBotPresent ? -1 : 1;
    })
  ), [guilds]);

  if (error && !loading) {
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

  if (loading || sortedGuilds === undefined) {
    return <CircularProgress color="primary" aria-label="Loading guilds" />;
  }

  if (sortedGuilds.length === 0) {
    return (
      <Typography my={4}>
        You have no server to manage. The <b>Administrator</b> permission is required to manage Axobot in a server.
      </Typography>
    );
  }

  return (
    <Stack direction="row" flexWrap="wrap" gap={3} my={4} justifyContent="center">
      {sortedGuilds.map((guild) => (
        <GuildBox guild={guild} key={guild.id} />
      ))}
    </Stack>
  );

}


export default function GuildSelection() {

  return (
    <Fragment>
      <PageTitle text="Select your server" />
      <GuildsGrid />
    </Fragment>
  );
}

export const Component = GuildSelection;