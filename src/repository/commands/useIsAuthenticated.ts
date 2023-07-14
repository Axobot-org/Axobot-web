import { useGetorFetchMe } from "./useGetOrFetchMe";


export function useIsAuthenticated() {
  const { user } = useGetorFetchMe();
  return user !== null;
}