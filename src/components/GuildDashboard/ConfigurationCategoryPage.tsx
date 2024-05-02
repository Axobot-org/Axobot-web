import { CircularProgress, Stack, styled, Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

import { useFetchGuildConfigCategory } from "../../repository/commands/useFetchGuildConfigCategory";
import { PopulatedGuildConfig } from "../../repository/types/guild";
import { GuildConfigOptionCategory } from "../../repository/types/guild-config-types";
import BooleanConfigComponent from "./ConfigComponents/BooleanConfigComponent";
import ColorConfigComponent from "./ConfigComponents/ColorConfigComponent";
import EnumConfigComponent from "./ConfigComponents/EnumConfigComponent";
import FloatConfigComponent from "./ConfigComponents/FloatConfigComponent";
import IntConfigComponent from "./ConfigComponents/IntConfigComponent";
import RoleConfigComponent from "./ConfigComponents/RoleConfigComponent";

interface ConfigurationCategoryPageProps {
  guildId: string;
  activePage: GuildConfigOptionCategory;
}

export default function ConfigurationCategoryPage({ guildId, activePage }: ConfigurationCategoryPageProps) {
  const { data, isLoading, error } = useFetchGuildConfigCategory({ guildId, category: activePage });

  if (isLoading) {
    return <CircularProgress color="primary" aria-label="Loading guild configuration" />;
  }

  if (error) {
    console.error(error);
    return (
      <Fragment>
        <Typography my={1}>
          Oops, something went wrong!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" fontStyle="italic">
          Sorry, an unexpected error has occurred.
        </Typography>
      </Fragment>
    );
  }

  if (data === undefined) {
    return <CircularProgress color="primary" aria-label="Loading guild configuration" />;
  }

  return (
    <Fragment>
      <ComponentsContainer>
        {
          Object.entries(data).map(([optionName, option]) => (
            <GenericConfigComponent key={optionName} optionId={optionName} option={option} guildId={guildId} />
          ))
        }
      </ComponentsContainer>
    </Fragment>
  );
}

const ComponentsContainer = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  width: "60vw",
  maxWidth: "1000px",

  [theme.breakpoints.down("md")]: {
    width: "85vw",
  },
}));

function GenericConfigComponent({ optionId, option, guildId }: { optionId: string, option: PopulatedGuildConfig[string], guildId: string }) {
  switch (option.type) {
  case "int":
    return <IntConfigComponent optionId={optionId} option={option} />;
  case "float":
    return <FloatConfigComponent optionId={optionId} option={option} />;
  case "boolean":
    return <BooleanConfigComponent optionId={optionId} option={option} />;
  case "enum":
    return <EnumConfigComponent optionId={optionId} option={option} />;
  case "role":
    return <RoleConfigComponent optionId={optionId} option={option} guildId={guildId} />;
  case "color":
    return <ColorConfigComponent optionId={optionId} option={option} />;
  default:
    return null;
    // return <span style={{ color: "gray" }}><b>{optionId}</b>: {JSON.stringify(option, null, 2)}</span>;
  }
}