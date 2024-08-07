import { Skeleton, Typography } from "@mui/material";

import { useFetchBotInfoQuery } from "../../repository/redux/api/api";

export default function BotGuildCounter() {
  const { data, error } = useFetchBotInfoQuery();

  if (error) {
    console.error(error);
    return null;
  }

  const guildCount = data?.approximate_guild_count;

  return (
    <Typography variant="h5" component="div" display="flex" justifyContent="center" alignItems="center" flexWrap="wrap" gap={1}>
      Currently in
      {
        guildCount === undefined
          ? <Skeleton variant="circular" width={38} height={38} />
          : <GuildCount guildCount={guildCount} />
      }
      servers!
    </Typography>
  );
}

function GuildCount({ guildCount }: {guildCount: number}) {
  return (
    <Typography variant="h4" color="primary" component="span">
      {guildCount + "+"}
    </Typography>
  );
}