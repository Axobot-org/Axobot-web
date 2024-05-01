import { CircularProgress, Stack, Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

import { getGuildDashboardTranslations } from "../../i18n/i18n";
import { useFetchGuildConfigCategory } from "../../repository/commands/useFetchGuildConfigCategory";
import { PopulatedGuildConfig } from "../../repository/types/guild";
import { GuildConfigOptionCategory } from "../../repository/types/guild-config-types";
import BooleanConfigComponent from "./ConfigComponents/BooleanConfigComponent";
import ColorConfigComponent from "./ConfigComponents/ColorConfigComponent";
import EnumConfigComponent from "./ConfigComponents/EnumConfigComponent";
import FloatConfigComponent from "./ConfigComponents/FloatConfigComponent";
import IntConfigComponent from "./ConfigComponents/IntConfigComponent";
import RoleConfigComponent from "./ConfigComponents/RoleConfigComponent";
import { ConfigurationName } from "./ConfigComponents/shared/SharedConfigComponents";

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
      <Stack useFlexGap gap={2} my={4}>
        {
          Object.entries(data).map(([optionName, option]) => (
            <GenericConfigComponent key={optionName} optionName={optionName} option={option} guildId={guildId} />
          ))
        }
      </Stack>
    </Fragment>
  );
}

function GenericConfigComponent({ optionName, option, guildId }: { optionName: string, option: PopulatedGuildConfig[string], guildId: string }) {
  const translatedName = getGuildDashboardTranslations("option_name." + optionName);

  switch (option.type) {
  case "int":
    return <IntConfigComponent optionName={translatedName} option={option} />;
  case "float":
    return <FloatConfigComponent optionName={translatedName} option={option} />;
  case "boolean":
    return <BooleanConfigComponent optionName={translatedName} option={option} />;
  case "enum":
    return <EnumConfigComponent optionName={translatedName} option={option} />;
  case "role":
    return <RoleConfigComponent optionName={translatedName} option={option} guildId={guildId} />;
  case "color":
    return <ColorConfigComponent optionName={translatedName} option={option} />;
  default:
    return <span style={{ color: "gray" }}><ConfigurationName>{translatedName}</ConfigurationName>: {JSON.stringify(option, null, 2)}</span>;
  }
}