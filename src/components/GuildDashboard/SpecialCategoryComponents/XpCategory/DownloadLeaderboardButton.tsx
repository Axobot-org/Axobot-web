import DownloadIcon from "@mui/icons-material/Download";
import { Button, CircularProgress } from "@mui/material";
import { useRef } from "react";
import { Fragment } from "react/jsx-runtime";

import { useLazyFetchLeaderboardAsJsonQuery } from "../../../../repository/redux/api/api";

export default function DownloadLeaderboardButton({ guildId }: {guildId: string}) {
  const linkElement = useRef<HTMLAnchorElement | null>(null);
  const [trigger, { isLoading }] = useLazyFetchLeaderboardAsJsonQuery();

  async function onClick() {
    if (linkElement.current === null) return;
    const data = await trigger(guildId).unwrap();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    linkElement.current.setAttribute("href", url);
    linkElement.current.click();
  }

  return (
    <Fragment>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={isLoading ? <CircularProgress size={20} color="secondary" /> : <DownloadIcon />}
        onClick={onClick}
        disabled={isLoading}
      >
        Download as JSON
      </Button>
      <a
        download={`leaderboard-${guildId}.json`}
        ref={linkElement}
        target="_blank"
        hidden
      />
    </Fragment>
  );
}
