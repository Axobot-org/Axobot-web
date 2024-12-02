import { Switch, Tooltip } from "@mui/material";

import { useGuildConfigEditionContext } from "../../../../repository/context/GuildConfigEditionContext";
import { useToggleGuildRssFeedMutation } from "../../../../repository/redux/api/api";
import { RssFeed } from "../../../../repository/types/api";

interface FeedToggleProps {
  feed: Pick<RssFeed, "id" | "enabled">;
  disabled?: boolean;
}
export default function FeedToggle({ feed, disabled }: FeedToggleProps) {
  const { guildId } = useGuildConfigEditionContext();
  const [toggleFeedMutation, { isLoading }] = useToggleGuildRssFeedMutation();

  function onChange() {
    toggleFeedMutation({ guildId, feedId: feed.id.toString() });
  }

  return (
    <Tooltip title={feed.enabled ? "Disable" : "Enable"}>
      <Switch
        checked={feed.enabled}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
        disabled={isLoading || disabled}
      />
    </Tooltip>
  );
}
