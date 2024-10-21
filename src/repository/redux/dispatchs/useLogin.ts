import { MatomoManager } from "../../matomo";
import { axoApi, useLoginMutation } from "../api/api";
import { useAppDispatch } from "../hooks";
import { setToken } from "../tokenStorage/tokenSlice";


export function useLogin() {
  const [loginMutation, { error, isLoading, data }] = useLoginMutation();

  const dispatch = useAppDispatch();

  async function loginCommand(discordCode: string) {
    const response = await loginMutation(discordCode).unwrap();
    dispatch(setToken(response.token));
    MatomoManager.setUserId(response.id);
    dispatch(axoApi.util.resetApiState());
  }

  return { loginCommand, error, loading: isLoading, data };
}
