import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

import { GuildConfigOptionCategory, GuildConfigOptionCategoryNames } from "../../repository/types/guild-config-types";
import ConfigurationCategoryPage from "./ConfigurationCategoryPage";
import NavigationDrawer from "./NavigationDrawer";

interface GuildDashboardNavigationProps {
  guildId: string;
}

export default function GuildDashboardNavigation({ guildId }: GuildDashboardNavigationProps) {
  const [page, setPage] = useState<GuildConfigOptionCategory>(GuildConfigOptionCategoryNames[0]);

  return (
    <Fragment>
      <NavigationDrawer activePage={page} onClick={setPage} />
      <ConfigurationCategoryPage guildId={guildId} activePage={page} />
    </Fragment>
  );
}