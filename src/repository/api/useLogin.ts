import { axoApi, useLoginMutation } from "../redux/api";
import { useAppDispatch } from "../redux/hooks";
import { setToken } from "../redux/slices/userSlice";


export function useLogin() {
  const [loginMutation, { error, isLoading, data }] = useLoginMutation();

  const dispatch = useAppDispatch();

  async function loginCommand(discordCode: string) {
    const response = await loginMutation(discordCode).unwrap();
    dispatch(setToken(response.token));
    if (window._mtm) {
      window._mtm.push({ event: "login", userId: response.id });
    }
    dispatch(axoApi.util.resetApiState());
  }

  return { loginCommand, error, loading: isLoading, data };
}