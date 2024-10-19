import { Stack, styled } from "@mui/material";

import { useFetchGuildConfigCategory } from "../../repository/commands/useFetchGuildConfigCategory";
import { ConfigComponentContextProvider, getMissingOptionRequirement } from "../../repository/context/ConfigComponentContext";
import { PopulatedGuildConfig } from "../../repository/types/guild";
import { AllRepresentation, EmptyCategories, GuildConfigOptionCategory } from "../../repository/types/guild-config-types";
import BooleanConfigComponent from "./ConfigComponents/BooleanConfigComponent";
import CategoryConfigComponent from "./ConfigComponents/CategoryConfigComponent";
import ColorConfigComponent from "./ConfigComponents/ColorConfigComponent";
import EnumConfigComponent from "./ConfigComponents/EnumConfigComponent";
import FloatConfigComponent from "./ConfigComponents/FloatConfigComponent";
import IntConfigComponent from "./ConfigComponents/IntConfigComponent";
import LevelupChannelConfigComponent from "./ConfigComponents/LevelupChannelConfigComponent";
import RoleConfigComponent from "./ConfigComponents/RoleConfigComponent";
import RolesListConfigComponent from "./ConfigComponents/RolesListConfigComponent";
import TextChannelConfigComponent from "./ConfigComponents/TextChannelConfigComponent";
import TextChannelsListConfigComponent from "./ConfigComponents/TextChannelsListConfigComponent";
import TextConfigComponent from "./ConfigComponents/TextConfigComponent";
import VoiceChannelConfigComponent from "./ConfigComponents/VoiceChannelConfigComponent";
import { ErrorPage, LoadingPlaceholder } from "./shared";
import ConfigEditionLogsComponent from "./SpecialCategoryComponents/EditionLogs/ConfigEditionLogsComponent";
import XpCategoryComponent from "./SpecialCategoryComponents/XpCategory/XpCategoryComponent";

interface ConfigurationCategoryPageProps {
  guildId: string;
  activePage: GuildConfigOptionCategory;
}

export default function ConfigurationCategoryPage({ guildId, activePage }: ConfigurationCategoryPageProps) {
  const { data, isLoading, error } = useFetchGuildConfigCategory({ guildId, category: activePage });
  const expectEmptyData = EmptyCategories.includes(activePage);

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  if (error) {
    console.error(error);
    return <ErrorPage title="Oops, something went wrong!" message="Sorry, an unexpected error has occurred." />;
  }

  if (data === undefined && !expectEmptyData) {
    return <LoadingPlaceholder />;
  }

  const optionsMap = data === undefined ? {} : filterAndSortOptions(data);

  if (!expectEmptyData && Object.keys(optionsMap).length === 0) {
    return <ErrorPage title="No configuration options available." message="This category appears to be empty. Just be glad it exists!" />;
  }

  return (
    <PageContainer>
      <ComponentsContainer>
        {Object.entries(optionsMap).map(([optionName, option]) => (
          <ConfigComponentContextProvider key={optionName} value={{
            option: option,
            config: optionsMap,
            isDisabled: getMissingOptionRequirement(option, optionsMap) !== null,
          }}>
            <GenericConfigComponent
              optionId={optionName}
              option={option}
            />
          </ConfigComponentContextProvider>
        ))}

      </ComponentsContainer>
      <SpecialCategoryComponent guildId={guildId} activePage={activePage} />
    </PageContainer>
  );
}

const PageContainer = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  width: "60vw",
  maxWidth: "1000px",

  [theme.breakpoints.down("md")]: {
    width: "85vw",
  },
}));

const ComponentsContainer = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
}));

function GenericConfigComponent({ optionId, option }: { optionId: string, option: PopulatedGuildConfig[string]}) {
  switch (option.type) {
  case "int":
    return <IntConfigComponent optionId={optionId} option={option} />;
  case "float":
    return <FloatConfigComponent optionId={optionId} option={option} />;
  case "boolean":
    return <BooleanConfigComponent optionId={optionId} option={option} />;
  case "enum":
    return <EnumConfigComponent optionId={optionId} option={option} />;
  case "text":
    return <TextConfigComponent optionId={optionId} option={option} />;
  case "role":
    return <RoleConfigComponent optionId={optionId} option={option} />;
  case "roles_list":
    return <RolesListConfigComponent optionId={optionId} option={option} />;
  case "text_channel":
    return <TextChannelConfigComponent optionId={optionId} option={option} />;
  case "text_channels_list":
    return <TextChannelsListConfigComponent optionId={optionId} option={option} />;
  case "voice_channel":
    return <VoiceChannelConfigComponent optionId={optionId} option={option} />;
  case "category":
    return <CategoryConfigComponent optionId={optionId} option={option} />;
  case "color":
    return <ColorConfigComponent optionId={optionId} option={option} />;
  case "levelup_channel":
    return <LevelupChannelConfigComponent optionId={optionId} option={option} />;
  default:
    return null;
  }
}

function SpecialCategoryComponent({ guildId, activePage }: {guildId: string, activePage: GuildConfigOptionCategory}) {
  switch (activePage) {
  case "edition-logs":
    return <ConfigEditionLogsComponent guildId={guildId} />;
  case "xp":
    return <XpCategoryComponent guildId={guildId} />;
  default:
    return null;
  }
}

function getRequiredOptionNames(option: AllRepresentation): string[] {
  if (option.requires === undefined) {
    return [];
  }

  return option.requires.map(req => req.option);
}

function filterAndSortOptions(config: PopulatedGuildConfig): PopulatedGuildConfig {
  return Object.fromEntries(
    Object.entries(config).filter(([_, option]) => [
      "int", "float", "boolean", "enum", "text", "role", "roles_list", "text_channel",
      "text_channels_list", "voice_channel", "category", "color", "levelup_channel",
    ]
      .includes(option.type))
      .toSorted(([firstName, firstOption], [secondName, secondOption]) => {
        if (getRequiredOptionNames(firstOption).includes(secondName)) {
          return 1;
        }
        if (getRequiredOptionNames(secondOption).includes(firstName)) {
          return -1;
        }
        return firstName.localeCompare(secondName);
      })
  );
}
