import { Navigate, useParams } from "react-router-dom";

import GuildDashboardNavigation from "../components/GuildDashboard/GuildDashboardNavigation";

export default function GuildDashboard() {
  const { id } = useParams();

  if (id === undefined || !/^\d{17,20}$/.test(id)) {
    return <Navigate to="/" />;
  }

  return <GuildDashboardNavigation guildId={id} />;
}

export const Component = GuildDashboard;
