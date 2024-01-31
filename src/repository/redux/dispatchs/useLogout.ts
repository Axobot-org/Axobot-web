import { useAppDispatch } from "../hooks";
import { logout } from "../slices/userSlice";

export default function useLogout() {
  const dispatch = useAppDispatch();

  async function logoutCommand() {
    dispatch(logout());
    if (window._mtm) {
      window._mtm.push({ event: "logout", userId: undefined });
    }
  }

  return { logoutCommand };
}