import LaunchIcon from "@mui/icons-material/Launch";
import { Button, Divider, Link, Stack, Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

import { useFetchGuildConfigCategory } from "../../../../repository/commands/useFetchGuildConfigCategory";
import DownloadLeaderboardButton from "./DownloadLeaderboardButton";
import UploadLeaderboardButton from "./UploadLeaderboardButton";


interface XpCategoryComponentProps {
  guildId: string;
}

export default function XpCategoryComponent({ guildId }: XpCategoryComponentProps) {
  const { data } = useFetchGuildConfigCategory({ guildId, category: "xp" });

  const isNotGlobalXp = data?.["xp_type"].value !== "global";

  return (
    <Fragment>
      <Divider sx={{ my: 1 }} />
      <Stack px={2} gap={1}>
        <Typography fontSize="1.2rem">Leaderboard actions</Typography>
        <Stack gap={2} direction={{ xs: "column", sm: "row" }}>
          <Button
            component={Link}
            target="_blank"
            variant="outlined"
            href={`/leaderboard/${guildId}`}
            endIcon={<LaunchIcon />}
          >
            View Leaderboard
          </Button>
          <DownloadLeaderboardButton guildId={guildId} />
          {isNotGlobalXp && <UploadLeaderboardButton guildId={guildId} />}
        </Stack>
      </Stack>
    </Fragment>
  );
}

