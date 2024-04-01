import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import useGuildsSelector from "../redux/selectors/useGuildsSelector";
import { GuildState, setGuilds } from "../redux/slices/guildSlice";
import { useFetchGuilds } from "../api/useFetchGuilds";
import useTokenSelector from "../redux/selectors/useTokenSelector";

export function useGetOrFetchGuilds() {
  const { fetchGuildsCommand, data, error, loading } = useFetchGuilds();
  const token = useTokenSelector();
  const guilds = useGuildsSelector();
  const dispatch = useAppDispatch();

  if (token !== null && guilds === null && data === null && !loading && !error) {
    fetchGuildsCommand();
  }

  useEffect(() => {
    if (data !== null && error === null && !loading) {
      const guildsMap = data.reduce((acc, guild) => {
        acc[guild.id] = guild;
        return acc;
      }, {} as Exclude<GuildState, null>);
      console.log("dispatching", Object.keys(guildsMap).length, "guilds");
      dispatch(setGuilds(guildsMap));
    }
  }, [data, dispatch, error, loading]);

  return { guilds, error, loading };
}