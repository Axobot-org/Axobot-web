import { Stack } from "@mui/material";
import { useState } from "react";

import { GuildConfigOptionCategory, GuildConfigOptionCategoryNames } from "../../repository/types/guild-config-types";
import ConfigurationCategoryPage from "./ConfigurationCategoryPage";
import NavigationDrawer from "./NavigationDrawer";

interface GuildDashboardNavigationProps {
  guildId: string;
}

export default function GuildDashboardNavigation({ guildId }: GuildDashboardNavigationProps) {
  const [page, setPage] = useState<GuildConfigOptionCategory>(GuildConfigOptionCategoryNames[0]);

  return (
    <Stack direction="row">
      <NavigationDrawer activePage={page} onClick={setPage} />
      <ConfigurationCategoryPage guildId={guildId} activePage={page} />
    </Stack>
  );
}