import { Box, createTheme, Stack, styled, Theme, ThemeProvider, Typography } from "@mui/material";
import { useMemo } from "react";

import formatRelativeTimestamp from "../../repository/formatRelativeTimestamp";
import DiscordMarkdown from "./DiscordMarkdown";

interface DiscordMessagePreviewProps {
  content?: string;
  timestamp?: string;
  embed?: {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: number;
    color: number;
    footer?: {
      text?: string;
      iconUrl?: string;
    };
    image?: string;
    thumbnail?: string;
    author?: {
      name?: string;
      url?: string;
      iconUrl?: string;
    };
  };
}

export default function DiscordMessagePreview(props: DiscordMessagePreviewProps) {
  const overrideTheme = (outerTheme: Theme) => createTheme({
    ...outerTheme,
    typography: {
      ...outerTheme.typography,
      body1: {
        ...outerTheme.typography.body1,
        fontFamily: "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
      },
    },
    components: {
      MuiStack: {
        styleOverrides: {
          root: {
            fontFamily: "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={overrideTheme}>
      <Stack direction="column" position="relative" py="0.125rem" pl="72px" pr="24px" minHeight="2.75rem" overflow="hidden">
        <MessageAuthorAndContent {...props} />
        {props.embed && <MessageEmbed embed={props.embed} />}
      </Stack>
    </ThemeProvider>
  );
}

function MessageAuthorAndContent(props: Pick<DiscordMessagePreviewProps, "content" | "timestamp">) {
  return (
    <Box>
      <img
        src="/assets/logo96.webp"
        srcSet="/assets/logo96.webp 96w, /assets/logo64.webp 64w, /assets/logo128.webp 128w"
        alt="Axobot avatar"
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          position: "absolute",
          left: "16px",
          marginTop: "calc(4px - 0.125rem)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
        }}
      />
      <Typography variant="h3" fontSize="1rem" lineHeight="1.375rem" pb="1px">
        <MessageAuthorAndTimestamp timestamp={props.timestamp} />
      </Typography>
      <Stack whiteSpace="pre-wrap" color="#efeff0">
        <DiscordMarkdown text={props.content?.trim()} />
      </Stack>
    </Box>
  );
}

function MessageAuthorAndTimestamp(props: Pick<DiscordMessagePreviewProps, "timestamp">) {
  return (
    <Typography component="span">
      <Typography component="span" fontWeight={500} mr=".25rem" lineHeight="1.375rem">
        Axobot
      </Typography>
      <Box component="span" display="inline-flex" mt=".2em" borderRadius="4px" padding="0 .275rem 0 .075rem" sx={{ verticalAlign: "sub", backgroundColor: "#5865f2" }}>
        <svg aria-label="Verified app" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 24 24">
          <path fill="white" fillRule="evenodd" d="M19.06 6.94a1.5 1.5 0 0 1 0 2.12l-8 8a1.5 1.5 0 0 1-2.12 0l-4-4a1.5 1.5 0 0 1 2.12-2.12L10 13.88l6.94-6.94a1.5 1.5 0 0 1 2.12 0Z" clipRule="evenodd"></path>
        </svg>
        <Typography component="span" fontSize=".8rem" fontWeight={600} lineHeight=".9375rem">APP</Typography>
      </Box>
      <Typography component="span" display="inline-block" ml=".25rem" fontSize=".75rem" height="1.25rem" color="#949ba4" sx={{ verticalAlign: "baseline" }}>
        {props.timestamp ?? "In the near future"}
      </Typography>
    </Typography>
  );
}

function MessageEmbed({ embed }: { embed: Exclude<DiscordMessagePreviewProps["embed"], undefined> }) {
  const hexEmbedColor = "#" + embed.color.toString(16).padStart(6, "0");

  const timestamp = useMemo(() => {
    if (!embed.timestamp) return "";
    return formatRelativeTimestamp(embed.timestamp, { useAbsoluteWhenOverOneDay: true });
  }, [embed.timestamp]);

  return (
    <Box display="grid" maxWidth="516px" my=".125rem" borderRadius="4px" borderLeft={`4px solid ${hexEmbedColor}`} bgcolor="#242429">
      <Box sx={{
        overflow: "hidden",
        padding: ".125rem 1rem 1rem .75rem",
        display: "grid",
        gridTemplateColumns: "auto",
        gridTemplateRows: embed.thumbnail ? "auto min-content" : "auto",
      }}
      >
        {embed.author?.name && (
          <Stack direction="row" mt="8px" alignItems="center" spacing={1} gridColumn="1 / 1">
            {embed.author?.iconUrl && (
              <img style={{ width: "24px", height: "24px", borderRadius: "50%" }} alt="Author icon" src={embed.author.iconUrl}></img>
            )}
            <Typography component="span" lineHeight="1.375rem" fontSize="0.875rem" fontWeight={600}>
              {embed.author.url
                ? (
                  <DiscordLink color="#f2f3f5" href={embed.author.url} target="_blank">{embed.author.name}</DiscordLink>
                )
                : (
                  embed.author.name
                )}
            </Typography>
          </Stack>
        )}
        {embed.title && (
          <Typography component="div" mt="8px" lineHeight="1.375rem" fontWeight={600} color="#e3e3e6" gridColumn="1 / 1">
            {embed.url
              ? (
                <DiscordLink href={embed.url} target="_blank">{embed.title}</DiscordLink>
              )
              : (
                embed.title
              )}
          </Typography>
        )}
        {embed.description && (
          <Typography component="div" mt="8px" fontSize="0.875rem" lineHeight="1.125rem" fontWeight={400} color="#efeff0" whiteSpace="pre-wrap" gridColumn="1 / 1">
            <DiscordMarkdown text={embed.description?.trim()} />
          </Typography>
        )}
        {embed.image && (
          <Box mt="16px" maxWidth="400px" maxHeight="225px">
            <img style={{ userSelect: "none", WebkitUserSelect: "none", maxWidth: "100%", maxHeight: "100%", borderRadius: "4px" }} alt="Image" src={embed.image}></img>
          </Box>
        )}
        {(embed.footer || embed.timestamp) && (
          <Typography component="span" mt="8px" fontSize="0.75rem" lineHeight="1rem" fontWeight={500} color="#efeff0" gridColumn="1 / 1">
            {embed.footer?.text}
            {embed.footer && timestamp && " • "}
            {timestamp}
          </Typography>
        )}
        {embed.thumbnail && (
          <Box gridRow="1 / 8" gridColumn="2 / 2" ml="16px" mt="8px" flexShrink={0} justifySelf="end">
            <img style={{ userSelect: "none", WebkitUserSelect: "none", maxWidth: "80px", maxHeight: "80px", borderRadius: "4px" }} alt="Thumbnail" src={embed.thumbnail}></img>
          </Box>
        )}
      </Box>
    </Box>
  );
}

const DiscordLink = styled("a")(({ color }) => ({
  color: color || "#00aafc",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

