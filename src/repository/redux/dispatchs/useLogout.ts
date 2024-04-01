import { useAppDispatch } from "../hooks";
import { logout } from "../slices/userSlice";
import { resetLeaderboards } from "../slices/leaderboardSlice";
import { resetGuilds } from "../slices/guildSlice";

export default function useLogout() {
  const dispatch = useAppDispatch();

  async function logoutCommand() {
    dispatch(logout());
    dispatch(resetLeaderboards());
    dispatch(resetGuilds());
    if (window._mtm) {
      window._mtm.push({ event: "logout", userId: undefined });
    }
  }

  return { logoutCommand };
}