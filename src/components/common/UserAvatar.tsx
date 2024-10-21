import { PersonOutlineOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";

import { useGetorFetchMe } from "../../repository/commands/useGetOrFetchMe";


export default function UserAvatar() {
  const { user } = useGetorFetchMe();

  if (user === undefined) {
    return <PersonOutlineOutlined />;
  }

  return <Avatar alt={user.globalName ?? user.username} src={user.avatar} />;
}
