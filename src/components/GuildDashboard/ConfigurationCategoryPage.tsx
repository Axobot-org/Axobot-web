import { CircularProgress, Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

import { useFetchGuildConfigCategory } from "../../repository/commands/useFetchGuildConfigCategory";
import { GuildConfigOptionCategory } from "../../repository/types/guild-config-types";
import BubblyButton from "../common/BubblyButton";

interface ConfigurationCategoryPageProps {
  guildId: string;
  activePage: GuildConfigOptionCategory;
}

export default function ConfigurationCategoryPage({ guildId, activePage }: ConfigurationCategoryPageProps) {
  const { data, isLoading, error } = useFetchGuildConfigCategory({ guildId, category: activePage });

  if (isLoading) {
    return <CircularProgress color="primary" aria-label="Loading guild configuration" />;
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

  if (data === undefined) {
    return <CircularProgress color="primary" aria-label="Loading guild configuration" />;
  }

  return (
    <Fragment>
      <Typography>
        I'm an amazing dashboard, doing amazing things!
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>
        Or at least I should be...
      </Typography>

      <BubblyButton sx={{ my: 5, padding: "0.75rem 5rem" }} />

      {JSON.stringify(data, null, 2)}
    </Fragment>
  );
}