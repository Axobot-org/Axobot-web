import { useFetchGuildsQuery } from "../redux/api/api";

export function useGetOrFetchGuilds() {
  const { data, error, isLoading } = useFetchGuildsQuery();
  return { guilds: data, error, loading: isLoading };
}