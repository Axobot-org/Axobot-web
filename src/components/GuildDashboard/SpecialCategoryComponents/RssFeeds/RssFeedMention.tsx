import { Language } from "@mui/icons-material";
import { Stack, Tooltip, Typography } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { CSSProperties, PropsWithChildren } from "react";

import { RssFeed } from "../../../../repository/types/api";
import BlueskyIcon from "../../../../svg/bluesky.svg?react";
import DeviantArtIcon from "../../../../svg/deviantart.svg?react";
import MinecraftIcon from "../../../../svg/minecraft.svg?react";
import TwitchIcon from "../../../../svg/twitch.svg?react";
import TwitterIcon from "../../../../svg/twitter.svg?react";
import YoutubeIcon from "../../../../svg/youtube.svg?react";


interface RssFeedMentionProps {
  feed: Pick<RssFeed, "type" | "link" | "displayName">;
  sx?: SystemStyleObject;
}

export default function RssFeedMention({ feed, sx }: RssFeedMentionProps) {
  return (
    <Stack direction="row" gap={{ xs: 0.5, md: 1 }} overflow="hidden" sx={sx}>
      <FeedTypeIcon feedType={feed.type} />
      <Typography noWrap component="span">
        {feed.displayName ?? feed.link}
      </Typography>
    </Stack>
  );
}

function FeedTypeIcon({ feedType }: { feedType: string }) {
  switch (feedType) {
    case "bluesky":
      return (
        <IconTooltip title="Bluesky">
          <BlueskyIcon width={24} />
        </IconTooltip>
      );
    case "deviant":
      return (
        <IconTooltip title="DeviantArt">
          <DeviantArtIcon width={24} />
        </IconTooltip>
      );
    case "mc":
      return (
        <IconTooltip title="Minecraft">
          <MinecraftIcon width={24} />
        </IconTooltip>
      );
    case "tw":
      return (
        <IconTooltip title="Twitter">
          <TwitterIcon width={24} />
        </IconTooltip>
      );
    case "twitch":
      return (
        <IconTooltip title="Twitch">
          <TwitchIcon width={24} />
        </IconTooltip>
      );
    case "yt":
      return (
        <IconTooltip title="YouTube">
          <YoutubeIcon width={24} />
        </IconTooltip>
      );
    default:
      return (
        <IconTooltip title="Other">
          <Language htmlColor="#8c8c8c" />
        </IconTooltip>
      );
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
