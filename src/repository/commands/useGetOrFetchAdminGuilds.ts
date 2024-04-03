import { useMemo } from "react";

import { useFetchGuildsQuery } from "../redux/api/api";

export function useGetOrFetchAdminGuilds() {
  const { data, error, isLoading } = useFetchGuildsQuery();

  const filteredGuilds = useMemo(() => (
    data?.filter(guild => guild.isAdmin)
  ), [data]);

  return { guilds: filteredGuilds, error, loading: isLoading };
}