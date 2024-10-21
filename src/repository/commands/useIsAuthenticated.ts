import { useGetorFetchMe } from "./useGetOrFetchMe";

export function useIsAuthenticated() {
  const { user, loading } = useGetorFetchMe();
  return { isAuthenticated: user !== undefined, loading };
}
