import { createContext, useContext } from "react";

import { OptionRequirement, PopulatedGuildConfig } from "../types/guild";

interface ConfigComponentContextType {
  option: PopulatedGuildConfig[string];
  config: PopulatedGuildConfig;
  isDisabled: boolean;
}

const ConfigComponentContext = createContext<ConfigComponentContextType>({
  option: {} as PopulatedGuildConfig[string],
  config: {},
  isDisabled: false,
});

export const ConfigComponentContextProvider = ConfigComponentContext.Provider;

export function useConfigComponentContext() {
  return useContext(ConfigComponentContext);
}

export function getMissingOptionRequirement(
  option: PopulatedGuildConfig[string],
  config: PopulatedGuildConfig
): OptionRequirement | null {
  if (option.requires === undefined) {
    return null;
  }
  for (const req of option.requires) {
    if (
      "to_be_defined" in req
      && (
        config[req.option].value === undefined
        || config[req.option].value === null
        || config[req.option].value === ""
      )
    ) {
      return req;
    }
    if ("to_be" in req) {
      if (Array.isArray(req.to_be)) {
        if (!req.to_be.includes(config[req.option].value as string)) {
          return req;
        }
      } else if (config[req.option].value !== req.to_be) {
        return req;
      }
    }
  }
  return null;
}
