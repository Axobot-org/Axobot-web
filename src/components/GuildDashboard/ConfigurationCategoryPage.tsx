import { Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

import { GuildConfigOptionCategory } from "../../repository/types/guild-config-types";
import BubblyButton from "../common/BubblyButton";
import PageTitle from "../common/PageTitle";

interface ConfigurationCategoryPageProps {
  activePage: GuildConfigOptionCategory;
}

export default function ConfigurationCategoryPage({ activePage }: ConfigurationCategoryPageProps) {
  return (
    <Fragment>
      <PageTitle text="Dashboard" />

      <Typography>
        I'm an amazing dashboard, doing amazing things!
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>
        Or at least I should be...
      </Typography>

      <BubblyButton sx={{ my: 5, padding: "0.75rem 5rem" }} />

      <i>Currently displaying {activePage} tab</i>
    </Fragment>
  );
}