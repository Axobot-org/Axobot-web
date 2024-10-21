import { Avatar } from "@mui/material";

import PageTitle from "../common/PageTitle";


interface GuildHeaderProps {
  guildData: {
    name: string;
    icon: string | null;
  };
}

export default function GuildHeader({ guildData }: GuildHeaderProps) {
  return <PageTitle text={guildData.name} icon={<Avatar src={guildData.icon ?? undefined} alt={guildData.name} />} />;
}
