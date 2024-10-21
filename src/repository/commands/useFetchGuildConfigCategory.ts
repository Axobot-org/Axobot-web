import { useMemo } from "react";

import { useFetchDefaultGuildConfigQuery, useFetchGuildConfigQuery } from "../redux/api/api";
import { PopulatedGuildConfig } from "../types/guild";
import { GuildConfigOptionCategory } from "../types/guild-config-types";

interface MethodParameters {
  guildId: string;
  category: GuildConfigOptionCategory;
}

export function useFetchGuildConfigCategory({ guildId, category }: MethodParameters) {
  const { data: configData, isLoading: isLoadingConfig, error: errorConfig } = useFetchGuildConfigQuery({
    guildId: guildId,
    categories: [category],
  }, {
    skip: category === "edition-logs",
  });
  const { data: defaultConfig, isLoading: isLoadingDefault, error: errorDefault } = useFetchDefaultGuildConfigQuery();

  const populatedData = useMemo(() => {
    if (configData === undefined || defaultConfig === undefined) {
      return undefined;
    }
    const categoryConfig = configData[category];
    const categoryDefault = defaultConfig[category];
    if (categoryConfig === undefined || categoryDefault === undefined) {
      return undefined;
    }

    const finalData: PopulatedGuildConfig = {};
    for (const [optionName, optionValue] of Object.entries(categoryConfig)) {
      const optionDefault = categoryDefault[optionName];
      if (optionDefault === undefined || !optionDefault.is_listed) continue;
      finalData[optionName] = { ...categoryDefault[optionName], value: optionValue };
    }
    return finalData;
  }, [configData, defaultConfig, category]);


  return {
    data: populatedData,
    isLoading: isLoadingConfig || isLoadingDefault,
    error: errorConfig || errorDefault,
  };
}
