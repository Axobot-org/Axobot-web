import { createContext, PropsWithChildren, useCallback, useState } from "react";

type EditionValueType = number | boolean | string | string[] | null;
type GuildConfigEdition = Record<string, EditionValueType>;

interface ContextType {
  state: GuildConfigEdition;
  setValue: (optionId: string, value: EditionValueType) => void;
  resetValue: (optionId: string) => void;
  resetState: () => void;
}

export const GuildConfigEditionContext = createContext<ContextType>({
  state: {},
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

export default function GuildConfigEditionProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<GuildConfigEdition>({});

  const setValue = useCallback((optionId: string, value: EditionValueType) => {
    setState({
      ...state,
      [optionId]: value,
    });
  }, [state]);

  const resetValue = useCallback((optionId: string) => {
    const [, ...rest] = Object.entries(state).filter(([key]) => key !== optionId);
    setState(Object.fromEntries(rest));
  }, [state]);

  const resetState = useCallback(() => {
    setState({});
  }, []);

  return (
    <GuildConfigEditionContext.Provider value={{ state, setValue, resetValue, resetState }}>
      {children}
    </GuildConfigEditionContext.Provider>
  );
}