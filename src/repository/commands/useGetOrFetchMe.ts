import { useFetchMe } from "../api/useFetchMe";
import useTokenSelector from "../redux/selectors/useTokenSelector";
import useUserSelector from "../redux/selectors/useUserSelector";


export function useGetorFetchMe() {
  const { fetchMeCommand, error, loading } = useFetchMe();
  const token = useTokenSelector();
  const user = useUserSelector();

  if (user === null && token !== null && !loading && !error) {
    fetchMeCommand();
  }

  return { user, error, loading };
}