import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";

import { useFetchDefaultGuildConfigQuery } from "../redux/api/api";
import { RssFeed } from "../types/api";
import { GuildConfigOptionCategory } from "../types/guild-config-types";


type EditionValueType = number | boolean | string | string[] | null;

export interface StateRssFeed {
  add: RssFeed[];
  edit: RssFeed[];
  remove: string[];
};

interface GuildConfigEdition {
  baseOptions: Record<string, EditionValueType>;
  roleRewards?: {
    id?: string;
    roleId: string;
    level: string;
  }[];
}

interface ContextType {
  guildId: string;
  state: GuildConfigEdition;
  hasAnyUnsavedChange: boolean;
  getCategoriesWithUnsavedChanges: () => GuildConfigOptionCategory[];
  setBaseOptionValue: (optionId: string, value: EditionValueType) => void;
  resetBaseOptionValue: (optionId: string) => void;
  setRoleRewardsValue: (roleRewards: GuildConfigEdition["roleRewards"]) => void;
  resetRoleRewardsValue: () => void;
  resetState: () => void;
}

const getDefaultState = (): ContextType["state"] => ({ baseOptions: {} });

const GuildConfigEditionContext = createContext<ContextType>({
  guildId: "",
  state: getDefaultState(),
  hasAnyUnsavedChange: false,
  getCategoriesWithUnsavedChanges: () => [],
  setBaseOptionValue: () => {
    throw new Error("GuildConfigEditionContext is not provided");
  },
  resetBaseOptionValue: () => {
    throw new Error("GuildConfigEditionContext is not provided");
  },
  setRoleRewardsValue: () => {
    throw new Error("GuildConfigEditionContext is not provided");
  },
  resetRoleRewardsValue: () => {
    throw new Error("GuildConfigEditionContext is not provided");
  },
  resetState: () => {
    throw new Error("GuildConfigEditionContext is not provided");
  },
});

export function GuildConfigEditionProvider({ guildId, children }: PropsWithChildren<{ guildId: string }>) {
  const [state, setState] = useState<GuildConfigEdition>(getDefaultState());
  const { data: defaultConfig } = useFetchDefaultGuildConfigQuery();

  const setBaseOptionValue = useCallback((optionId: string, value: EditionValueType) => {
    setState((prevState) => ({
      ...prevState,
      baseOptions: {
        ...prevState.baseOptions,
        [optionId]: value,
      },
    }));
  }, []);

  const resetBaseOptionValue = useCallback((optionId: string) => {
    setState((prevState) => {
      const rest = Object.entries(prevState.baseOptions).filter(([key]) => key !== optionId);
      return {
        ...prevState,
        baseOptions: Object.fromEntries(rest),
      };
    });
  }, []);

  const setRoleRewardsValue = useCallback((roleRewards: GuildConfigEdition["roleRewards"]) => {
    setState((prevState) => ({
      ...prevState,
      roleRewards,
    }));
  }, []);

  const resetRoleRewardsValue = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      roleRewards: undefined,
    }));
  }, []);

  const resetState = useCallback(() => {
    setState(getDefaultState());
  }, []);

  const getCategoriesWithUnsavedChanges = (): GuildConfigOptionCategory[] => {
    const unsavedCategories: GuildConfigOptionCategory[] = [];
    if (defaultConfig) {
      Object.entries(defaultConfig).forEach(([category, defaultCategoryOptions]) => {
        if (Object.keys(defaultCategoryOptions).some((optionId) => state.baseOptions[optionId] !== undefined)) {
          unsavedCategories.push(category as GuildConfigOptionCategory);
        }
      });
    }
    if (state.roleRewards !== undefined) {
      unsavedCategories.push("xp");
    }
    return unsavedCategories;
  };

  const hasAnyUnsavedChange = (
    Object.keys(state.baseOptions).length !== 0
    || state.roleRewards !== undefined
  );

  return (
    <GuildConfigEditionContext.Provider value={{
      guildId,
      state,
      hasAnyUnsavedChange,
      getCategoriesWithUnsavedChanges,
      setBaseOptionValue,
      resetBaseOptionValue,
      setRoleRewardsValue,
      resetRoleRewardsValue,
      resetState,
    }}
    >
      {children}
    </GuildConfigEditionContext.Provider>
  );
}

export function useGuildConfigEditionContext() {
  return useContext(GuildConfigEditionContext);
}

export function useGuildConfigBaseOptionEditionContext() {
  const { guildId, state, setBaseOptionValue, resetBaseOptionValue } = useGuildConfigEditionContext();
  return {
    guildId,
    state: state.baseOptions,
    setValue: setBaseOptionValue,
    resetValue: resetBaseOptionValue,
  };
}

export function useGuildConfigRoleRewardsEditionContext() {
  const { guildId, state, setRoleRewardsValue, resetRoleRewardsValue } = useGuildConfigEditionContext();
  return {
    guildId,
    state: state.roleRewards,
    setValue: setRoleRewardsValue,
    resetValue: resetRoleRewardsValue,
  };
}
