import { Language } from "@mui/icons-material";
import { Stack, Tooltip, Typography } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { CSSProperties, memo, PropsWithChildren } from "react";

import { getGuildDashboardTranslations } from "../../../../i18n/i18n";
import { RssFeed } from "../../../../repository/types/api";
import BlueskyIcon from "../../../../svg/bluesky.svg?react";
import DeviantArtIcon from "../../../../svg/deviantart.svg?react";
import MinecraftIcon from "../../../../svg/minecraft.svg?react";
import TwitchIcon from "../../../../svg/twitch.svg?react";
import TwitterIcon from "../../../../svg/twitter.svg?react";
import YoutubeIcon from "../../../../svg/youtube.svg?react";


const RssFeedMention = memo(_RssFeedMention);
export default RssFeedMention;

interface RssFeedMentionProps {
  feed: Pick<RssFeed, "type" | "link" | "displayName">;
  sx?: SystemStyleObject;
}
function _RssFeedMention({ feed, sx }: RssFeedMentionProps) {
  const tooltipTitle = getGuildDashboardTranslations("rss_type." + feed.type, feed.type);

  return (
    <Stack direction="row" gap={{ xs: 0.5, md: 1 }} overflow="hidden" sx={sx}>
      <IconTooltip title={tooltipTitle}>
        <FeedTypeIcon feedType={feed.type} />
      </IconTooltip>
      <Typography noWrap component="span">
        {feed.displayName ?? feed.link}
      </Typography>
    </Stack>
  );
}

function FeedTypeIcon({ feedType }: { feedType: string }) {
  switch (feedType) {
    case "bluesky":
      return <BlueskyIcon width={24} />;
    case "deviant":
      return <DeviantArtIcon width={24} />;
    case "mc":
      return <MinecraftIcon width={24} />;
    case "tw":
      return <TwitterIcon width={24} />;
    case "twitch":
      return <TwitchIcon width={24} />;
    case "yt":
      return <YoutubeIcon width={24} />;
    default:
      return <Language htmlColor="#8c8c8c" />;
  }
}

function IconTooltip({ title, spanStyle, children }: PropsWithChildren<{ title: string; spanStyle?: CSSProperties }>) {
  return (
    <Tooltip
      title={title}
      placement="top"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -8],
              },
            },
          ],
        } }}
    >
      <span style={{ display: "inline-flex", ...spanStyle }}>
        {children}
      </span>
    </Tooltip>
  );
}
