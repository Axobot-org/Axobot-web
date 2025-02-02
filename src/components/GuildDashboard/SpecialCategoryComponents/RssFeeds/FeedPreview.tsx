import { Box, Collapse, Paper, Typography } from "@mui/material";
import { ComponentProps } from "react";

import { RssFeed, RssFeedParsedEntry } from "../../../../repository/types/api";
import DiscordMessagePreview from "../../../common/DiscordMessagePreview";

interface FeedPreviewButtonProps {
  isOpen: boolean;
  isLoading: boolean;
  feed: RssFeed;
  data: RssFeedParsedEntry | undefined;
}
export default function FeedPreview({ isOpen, feed, data, isLoading }: FeedPreviewButtonProps) {
  return (
    <Collapse in={isOpen}>
      <Box>
        {isLoading && (<Typography color="textSecondary">Fetching the latest data...</Typography>)}
        {(!isLoading && !data) && (<Typography color="error">Oops, something went wrong while fetching your feed.</Typography>)}
        {(!isLoading && data) && <InnerFeedPreview feed={feed} data={data} />}
      </Box>
    </Collapse>
  );
}

function InnerFeedPreview({ feed, data }: { feed: RssFeed; data: RssFeedParsedEntry }) {
  const discordMessage = useBuildDiscordMessageFromFeed({ feed, feedData: data });
  return (
    <Paper elevation={3} sx={{ px: 2, py: 1 }}>
      <DiscordMessagePreview {...discordMessage} />
    </Paper>
  );
}


type DiscordMessageInput = ComponentProps<typeof DiscordMessagePreview>;
function useBuildDiscordMessageFromFeed({ feed, feedData }: { feed: RssFeed; feedData: RssFeedParsedEntry }): DiscordMessageInput {
  const msgFormat = feed.structure.replaceAll("\\n", "\n");
  const variables = useVariablesDict(feed, feedData);
  const text = formatStringPythonLike(msgFormat, variables, feed.useEmbed ? 3900 : 2000);

  if (!feed.useEmbed) {
    return {
      content: text,
    };
  }

  const embed: DiscordMessageInput["embed"] = {
    description: text,
    color: feed.embed.color || 0x979C9F,
  };

  if (feed.embed.authorText) {
    embed.author = {
      name: formatStringPythonLike(feed.embed.authorText, variables, 256),
    };
  }
  if (feed.embed.footerText) {
    embed.footer = {
      text: formatStringPythonLike(feed.embed.footerText, variables, 2048),
    };
  }
  if (feed.embed.showDateInFooter !== false) {
    const parsedDate = parseDate(feedData.pubDate);
    if (parsedDate !== null) {
      embed.timestamp = parsedDate.getTime();
    }
  }
  if (feed.embed.title) {
    embed.title = formatStringPythonLike(feed.embed.title, variables, 256);
  } else {
    embed.title = feedData.title.substring(0, 256);
  }
  if (feedData.image) {
    if (feed.embed.imageLocation === undefined || feed.embed.imageLocation === "thumbnail") {
      embed.thumbnail = feedData.image;
    } else if (feed.embed.imageLocation === "banner") {
      embed.image = feedData.image;
    }
  }
  if (feed.embed.enableLinkInTitle) {
    embed.url = feedData.url;
  }

  return { embed };
}

function useVariablesDict(feed: RssFeed, feedData: RssFeedParsedEntry): Record<string, string> {
  const result: Record<string, string> = {
    "channel": feedData.channel || "?",
    "title": feedData.title,
    "url": feedData.url,
    "link": feedData.url,
    "author": feedData.author || "?",
    "logo": "📰",
    "full_text": feedData.postText || "",
    "description": feedData.postDescription || "",
  };
  const parsedDate = parseDate(feedData.pubDate);
  if (parsedDate !== null) {
    const timestamp = Math.round(parsedDate.getTime() / 1000);
    result["date"] = `<t:${timestamp}>`;
    result["long_date"] = parsedDate.toLocaleString("en-GB", {
      weekday: "long", year: "numeric", month: "2-digit", day: "numeric",
      hour: "numeric", minute: "numeric",
    });
    result["timestamp"] = timestamp.toString();
  } else {
    result["date"] = feedData.pubDate;
    result["long_date"] = feedData.pubDate;
    result["timestamp"] = "";
  }
  result["mentions"] = feed.roles.map((role) => `<@&${role}>`).join(", ");

  return result;
}

function formatStringPythonLike(str: string, variables: Record<string, string>, maxLength: number) {
  return str.replace(/{([^}]+)}/gi, (_, key) => variables[key] ?? `{${key}}`).substring(0, maxLength);
}

function parseDate(isoString: string) {
  const parsedDate = new Date(isoString);
  if (parsedDate.toString() === "Invalid Date") {
    return null;
  }
  return parsedDate;
}
