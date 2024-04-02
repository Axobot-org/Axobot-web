import { useFetchMeQuery } from "../redux/api";

export function useGetorFetchMe() {
  const { data, error, isLoading } = useFetchMeQuery();

  return { user: data, error, loading: isLoading };
}