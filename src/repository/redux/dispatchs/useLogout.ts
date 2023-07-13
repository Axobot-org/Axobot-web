import { useAppDispatch } from "../hooks";
import { logout } from "../slices/userSlice";

export default function useLogout() {
  const dispatch = useAppDispatch();

  async function logoutCommand() {
    dispatch(logout());
  }

  return { logoutCommand };
}