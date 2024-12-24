import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useState } from "react";

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
  rssFeeds?: StateRssFeed;
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
  setRssFeedsValue: Dispatch<SetStateAction<GuildConfigEdition["rssFeeds"]>>;
  resetRssFeedsValue: () => void;
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
  setRssFeedsValue: () => {
    throw new Error("GuildConfigEditionContext is not provided");
  },
  resetRssFeedsValue: () => {
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

  const setRssFeedsValue: Dispatch<SetStateAction<GuildConfigEdition["rssFeeds"]>> = useCallback(
    (valueOrUpdater) => {
      setState((prevState) => {
        const newRssFeeds
          = typeof valueOrUpdater === "function"
            ? valueOrUpdater(prevState.rssFeeds)
            : valueOrUpdater;

        return {
          ...prevState,
          rssFeeds: newRssFeeds,
        };
      });
    },
    []
  );

  const resetRssFeedsValue = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      rssFeeds: undefined,
    }));
  }, []);

  const resetState = useCallback(() => {
    setState(getDefaultState());
  }, []);

  const isAnyRssFeedEdited = (!!state.rssFeeds && (
    state.rssFeeds.add.length !== 0
    || state.rssFeeds.edit.length !== 0
    || state.rssFeeds.remove.length !== 0
  ));

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
    if (isAnyRssFeedEdited) {
      unsavedCategories.push("rss");
    }
    return unsavedCategories;
  };

  const hasAnyUnsavedChange = (
    Object.keys(state.baseOptions).length !== 0
    || state.roleRewards !== undefined
    || isAnyRssFeedEdited
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
      setRssFeedsValue,
      resetRssFeedsValue,
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

export function useGuildConfigRssFeedsEditionContext() {
  const { guildId, state, setRssFeedsValue } = useGuildConfigEditionContext();

  function setRssFeedsSubstate<Key extends keyof StateRssFeed>(key: Key, callback: (prevState: StateRssFeed[Key]) => StateRssFeed[Key]) {
    setRssFeedsValue((prevState) => ({
      add: prevState?.add ?? [],
      edit: prevState?.edit ?? [],
      remove: prevState?.remove ?? [],
      [key]: callback(prevState?.[key] ?? []),
    }));
  }

  const findFeedInState = (feedId: string): RssFeed | undefined => {
    if (!state.rssFeeds) {
      return undefined;
    }
    return state.rssFeeds.add.find((f) => f.id === feedId) ?? state.rssFeeds.edit.find((f) => f.id === feedId);
  };

  const editFeed = (feed: RssFeed) => {
    if (!state.rssFeeds) {
      state.rssFeeds = {
        add: [],
        edit: [],
        remove: [],
      };
    }
    const existingFeed = findFeedInState(feed.id);
    const stateKey = isNewRssFeed(feed) ? "add" : "edit";
    if (existingFeed) {
      setRssFeedsSubstate(stateKey, (prevState) => prevState.map((f) => (f.id === feed.id ? feed : f)));
    } else {
      setRssFeedsSubstate(stateKey, (prevState) => [...prevState, feed]);
    }
  };

  const unregisterFeed = (feedId: string) => {
    const stateKey = isNewRssFeed({ id: feedId }) ? "add" : "edit";
    setRssFeedsSubstate(stateKey, (prevState) => prevState.filter((f) => f.id !== feedId));
  };

  return {
    guildId,
    state: state.rssFeeds,
    findFeedInState,
    editFeed,
    unregisterFeed,
  };
}

export function isNewRssFeed(feed: { id: string }) {
  return feed.id.startsWith("temp_");
}
