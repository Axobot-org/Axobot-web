import { useAppDispatch } from "../hooks";
import { login, UserState } from "../slices/userSlice";

export default function useSetUser() {
  const dispatch = useAppDispatch();

  async function setUserCommand(user: Exclude<UserState["user"], null>) {
    dispatch(login(user));
    if (window._mtm) {
      window._mtm.push({ event: "login", userId: user.id });
    }
  }

  return { setUserCommand };
}