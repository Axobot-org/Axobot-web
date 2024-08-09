import { Stack, Typography } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";

import { GuildConfigEditionProvider } from "../../repository/context/GuildConfigEditionContext";
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
    let errorMessage = "An error occurred while fetching the guild data.";
    if (error && "originalStatus" in error && error.originalStatus === 401) {
      errorMessage = "You do not have access to this server.";
    }
    return (
      <Stack alignItems="center">
        <PageTitle text="Dashboard" />
        <Typography variant="h6" color="text.secondary">
          {errorMessage}
        </Typography>
      </Stack>
    );
  }

  if (data === undefined) return null;

  return (
    <GuildConfigEditionProvider>
      <Stack direction="row" flex={1} maxWidth="100%" className="GuildDashboardNavigation__Container">
        <NavigationDrawer />
        <Stack alignItems="center" maxWidth="100%" >
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
      <SaveConfigBanner guildId={guildId} />
    </GuildConfigEditionProvider>
  );
}