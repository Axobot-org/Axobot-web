import { Typography } from "@mui/material";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";

import BubblyButton from "../components/common/BubblyButton";
import PageTitle from "../components/common/PageTitle";

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
      <PageTitle text="Dashboard" />

      <Typography>
        I'm an amazing dashboard, doing amazing things!
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>
        Or at least I should be...
      </Typography>

      <BubblyButton sx={{ mt: 5, padding: "0.75rem 5rem" }} />
    </Fragment>
  );
}

export const Component = GuildDashboard;
