import { MatomoManager } from "../matomo";
import { useFetchMeQuery } from "../redux/api/api";
import useTokenSelector from "../redux/tokenStorage/useTokenSelector";

export function useGetorFetchMe() {
  const token = useTokenSelector();
  const { data, error, isLoading } = useFetchMeQuery(undefined, { skip: token === null });
  if (data) {
    MatomoManager.setUserId(data.id);
  }
  return { user: data, error, loading: isLoading };
}
