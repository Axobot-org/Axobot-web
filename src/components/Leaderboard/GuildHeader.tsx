import { Avatar } from "@mui/material";

import { LeaderboardGuildData } from "../../repository/redux/slices/leaderboardSlice";
import HeaderLayout from "./HeaderLayout";


interface GuildHeaderProps {
  guildData: LeaderboardGuildData;
}

export default function GuildHeader({ guildData }: GuildHeaderProps) {
  return <HeaderLayout icon={<Avatar src={guildData.icon ?? undefined} alt={guildData.name} />} name={guildData.name} />;
}