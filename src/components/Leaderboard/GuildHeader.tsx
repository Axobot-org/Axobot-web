import { Avatar } from "@mui/material";

import { LeaderboardGuildData } from "../../repository/redux/slices/leaderboardSlice";
import PageTitle from "../common/PageTitle";


interface GuildHeaderProps {
  guildData: LeaderboardGuildData;
}

export default function GuildHeader({ guildData }: GuildHeaderProps) {
  return <PageTitle text={guildData.name} icon={<Avatar src={guildData.icon ?? undefined} alt={guildData.name} />} />;
}