import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useState } from "react";


type EditionValueType = number | boolean | string | string[] | null;

export interface StateRssFeed {
  id?: string;
  channelId: string;
  roles: string[];
  silentMention: boolean;
  markedForDeletion?: boolean;
}

interface GuildConfigEdition {
  baseOptions: Record<string, EditionValueType>;
  roleRewards?: {
    id?: string;
    roleId: string;
    level: string;
  }[];
  rssFeeds?: StateRssFeed[];
}

interface ContextType {
  guildId: string;
  state: GuildConfigEdition;
  hasAnyUnsavedChange: boolean;
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

  const hasAnyUnsavedChange = Object.keys(state.baseOptions).length !== 0 || state.roleRewards !== undefined || !!state.rssFeeds?.length;

  return (
    <GuildConfigEditionContext.Provider value={{
      guildId,
      state,
      hasAnyUnsavedChange,
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

  const editFeed = (feed: StateRssFeed) => {
    if (!state.rssFeeds) {
      state.rssFeeds = [];
    }
    const existingFeed = state.rssFeeds.find((f) => f.id === feed.id);
    const newFeed = {
      id: feed.id,
      channelId: feed.channelId,
      roles: feed.roles,
      silentMention: feed.silentMention,
      markedForDeletion: feed.markedForDeletion ?? false,
    };
    if (existingFeed) {
      setRssFeedsValue((prevState) => prevState?.map((f) => (f.id === newFeed.id ? newFeed : f)));
    } else {
      setRssFeedsValue((prevState) => [...(prevState ?? []), newFeed]);
    }
  };

  const removeFeed = (feedId: string) => {
    setRssFeedsValue((prevState) => prevState?.filter((f) => f.id !== feedId));
  };

  return {
    guildId,
    state: state.rssFeeds,
    editFeed,
    removeFeed,
  };
}
