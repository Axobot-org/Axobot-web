import { useFetchMeQuery } from "../redux/api/api";
import useTokenSelector from "../redux/tokenStorage/useTokenSelector";

export function useGetorFetchMe() {
  const token = useTokenSelector();
  const { data, error, isLoading } = useFetchMeQuery(undefined, { skip: token === null });
  return { user: data, error, loading: isLoading };
}