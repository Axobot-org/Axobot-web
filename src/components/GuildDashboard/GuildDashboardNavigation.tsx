import { Stack, Typography } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";

import GuildConfigEditionProvider from "../../repository/context/GuildConfigEditionContext";
import { useFetchGuildQuery } from "../../repository/redux/api/api";
import { GuildConfigOptionCategoryNames } from "../../repository/types/guild-config-types";
import PageTitle from "../common/PageTitle";
import GuildHeader from "../Leaderboard/GuildHeader";
import ConfigurationCategoryPage from "./ConfigurationCategoryPage";
import NavigationDrawer from "./NavigationDrawer";
import SaveConfigBanner from "./SaveConfigBanner";

interface GuildDashboardNavigationProps {
  guildId: string;
}

export default function GuildDashboardNavigation({ guildId }: GuildDashboardNavigationProps) {
  const { data, isLoading, error } = useFetchGuildQuery({ guildId });

  if (isLoading) return null;

  if (error || data?.isAdmin === false) {
    return (
      <Stack alignItems="center">
        <PageTitle text="Dashboard" />
        <Typography variant="h6" color="text.secondary">
          You do not have access to this server.
        </Typography>
      </Stack>
    );
  }

  if (data === undefined) return null;

  return (
    <GuildConfigEditionProvider>
      <Stack direction="row">
        <NavigationDrawer />
        <Stack alignItems="center">
          <GuildHeader guildData={data} />
          <Routes>
            <Route path="/" element={<Navigate to={GuildConfigOptionCategoryNames[0]} replace />} />
            {
              GuildConfigOptionCategoryNames.map((category) => (
                <Route key={category} path={`/${category}`} element={<ConfigurationCategoryPage guildId={guildId} activePage={category} />} />
              ))
            }
          </Routes>
        </Stack>
      </Stack>
      <SaveConfigBanner />
    </GuildConfigEditionProvider>
  );
}