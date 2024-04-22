import { Stack, Typography } from "@mui/material";

import { GuildConfigOptionCategory } from "../../repository/types/guild-config-types";
import BubblyButton from "../common/BubblyButton";
import PageTitle from "../common/PageTitle";

interface ConfigurationCategoryPageProps {
  guildId: string;
  activePage: GuildConfigOptionCategory;
}

export default function ConfigurationCategoryPage({ guildId, activePage }: ConfigurationCategoryPageProps) {
  return (
    <Stack alignItems="center">
      <PageTitle text="Dashboard" />

      <Typography>
        I'm an amazing dashboard, doing amazing things!
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>
        Or at least I should be...
      </Typography>

      <BubblyButton sx={{ my: 5, padding: "0.75rem 5rem" }} />

      <i>Currently displaying {activePage} tab for guild {guildId}</i>
    </Stack>
  );
}