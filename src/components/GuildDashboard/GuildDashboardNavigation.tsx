import { Stack } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";

import { GuildConfigOptionCategoryNames } from "../../repository/types/guild-config-types";
import PageTitle from "../common/PageTitle";
import ConfigurationCategoryPage from "./ConfigurationCategoryPage";
import NavigationDrawer from "./NavigationDrawer";

interface GuildDashboardNavigationProps {
  guildId: string;
}

export default function GuildDashboardNavigation({ guildId }: GuildDashboardNavigationProps) {

  return (
    <Stack direction="row">
      <NavigationDrawer />
      <Stack alignItems="center">
        <PageTitle text="Dashboard" />
        <Routes>
          <Route path="/" element={<Navigate to={GuildConfigOptionCategoryNames[0]} />} />
          {
            GuildConfigOptionCategoryNames.map((category) => (
              <Route key={category} path={`/${category}`} element={<ConfigurationCategoryPage guildId={guildId} activePage={category} />} />
            ))
          }
        </Routes>
      </Stack>
    </Stack>
  );
}