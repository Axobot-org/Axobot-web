import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";

import GuildDashboardNavigation from "../components/GuildDashboard/GuildDashboardNavigation";

const MetaTags = () => (
  <Helmet>
    <title>Axobot: Server Dashboard</title>
  </Helmet>
);

export default function GuildDashboard() {
  const { id } = useParams();

  if (id === undefined || !/^\d{17,20}$/.test(id)) {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      <MetaTags />
      <GuildDashboardNavigation guildId={id} />
    </Fragment>
  );
}

export const Component = GuildDashboard;
