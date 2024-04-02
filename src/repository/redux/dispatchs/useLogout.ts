import { axoApi } from "../api/api";
import { useAppDispatch } from "../hooks";
import { logout } from "../tokenStorage/tokenSlice";

export default function useLogout() {
  const dispatch = useAppDispatch();

  async function logoutCommand() {
    dispatch(logout());
    dispatch(axoApi.util.resetApiState());
    if (window._mtm) {
      window._mtm.push({ event: "logout", userId: undefined });
    }
  }

  return { logoutCommand };
}