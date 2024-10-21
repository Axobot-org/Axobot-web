import { useEffect, useMemo } from "react";

import { useFetchGuildsQuery } from "../redux/api/api";
import useLogout from "../redux/dispatchs/useLogout";

export function useGetOrFetchAdminGuilds() {
  const { data, error, isLoading } = useFetchGuildsQuery();
  const { logoutCommand } = useLogout();

  const filteredGuilds = useMemo(() => (
    data?.filter((guild) => guild.isAdmin)
  ), [data]);

  useEffect(() => {
    if (error && "originalStatus" in error && error.originalStatus === 401) {
      logoutCommand();
    }
  }, [error, logoutCommand]);

  return { guilds: filteredGuilds, error, loading: isLoading };
}
