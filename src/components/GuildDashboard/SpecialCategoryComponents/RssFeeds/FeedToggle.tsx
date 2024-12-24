import { Switch, Tooltip } from "@mui/material";

import { RssFeed } from "../../../../repository/types/api";

interface FeedToggleProps {
  feed: RssFeed;
  editFeed: (feed: RssFeed) => void;
  disabled?: boolean;
}
export default function FeedToggle({ feed, editFeed, disabled }: FeedToggleProps) {
  function onChange() {
    editFeed({
      ...feed,
      enabled: !feed.enabled,
    });
  }

  return (
    <Tooltip title={feed.enabled ? "Disable" : "Enable"}>
      <Switch
        checked={feed.enabled}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
        disabled={disabled}
      />
    </Tooltip>
  );
}
