import { useAppDispatch } from "../hooks";
import { setToken } from "../slices/userSlice";

export default function useSetToken() {
  const dispatch = useAppDispatch();

  async function setTokenCommand(token: string) {
    dispatch(setToken(token));
  }

  return { setTokenCommand };
}