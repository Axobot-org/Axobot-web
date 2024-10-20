import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";

type EditionValueType = number | boolean | string | string[] | null;
type GuildConfigEdition = Record<string, EditionValueType>;

interface ContextType {
  guildId: string;
  state: GuildConfigEdition;
  hasAnyUnsavedChange: boolean;
  setValue: (optionId: string, value: EditionValueType) => void;
  resetValue: (optionId: string) => void;
  resetState: () => void;
}

const GuildConfigEditionContext = createContext<ContextType>({
  guildId: "",
  state: {},
  hasAnyUnsavedChange: false,
  setValue: () => {
    throw new Error("GuildConfigEditionContext is not provided");
  },
  resetValue: () => {
    throw new Error("GuildConfigEditionContext is not provided");
  },
  resetState: () => {
    throw new Error("GuildConfigEditionContext is not provided");
  },
});

export function useGuildConfigEditionContext() {
  return useContext(GuildConfigEditionContext);
}

export function GuildConfigEditionProvider({ guildId, children }: PropsWithChildren<{guildId: string}>) {
  const [state, setState] = useState<GuildConfigEdition>({});

  const setValue = useCallback((optionId: string, value: EditionValueType) => {
    setState(prevState => ({
      ...prevState,
      [optionId]: value,
    }));
  }, []);

  const resetValue = useCallback((optionId: string) => {
    setState(prevState => {
      const rest = Object.entries(prevState).filter(([key]) => key !== optionId);
      return Object.fromEntries(rest);
    });
  }, []);

  const resetState = useCallback(() => {
    setState({});
  }, []);

  const hasAnyUnsavedChange = Object.keys(state).length !== 0;

  return (
    <GuildConfigEditionContext.Provider value={{ guildId, state, hasAnyUnsavedChange, setValue, resetValue, resetState }}>
      {children}
    </GuildConfigEditionContext.Provider>
  );
}
