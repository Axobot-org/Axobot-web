import { Box, createTheme, Stack, styled, Theme, ThemeProvider, Typography } from "@mui/material";
import { useMemo } from "react";

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
  });

  return (
    <ThemeProvider theme={overrideTheme}>
      <Stack direction="column" position="relative" py="0.125rem" pl="72px" pr="48px" minHeight="2.75rem">
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
          position: "absolute",
          left: "16px",
          marginTop: "calc(4px - 0.125rem)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
        }}
      />
      <Typography variant="h3" fontSize="1rem" lineHeight="1.375rem">
        <MessageAuthorAndTimestamp timestamp={props.timestamp} />
      </Typography>
      <Typography component="span" whiteSpace="pre-wrap" color="#dbdee1">
        {props.content?.trim()}
      </Typography>
    </Box>
  );
}

function MessageAuthorAndTimestamp(props: Pick<DiscordMessagePreviewProps, "timestamp">) {
  return (
    <Typography component="span">
      <Typography component="span" fontWeight={500} mr=".25rem" lineHeight="1.375rem">
        Axobot
      </Typography>
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
    return formatRelativeTimestamp(embed.timestamp);
  }, [embed.timestamp]);

  return (
    <Box display="grid" maxWidth="516px" my=".125rem" borderRadius="4px" borderLeft={`4px solid ${hexEmbedColor}`} bgcolor="#2b2d31">
      <Box sx={{
        overflow: "hidden",
        padding: ".5rem 1rem 1rem .75rem",
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
                  <DiscordLink color="#f2f3f5" href={embed.author.url}>{embed.author.name}</DiscordLink>
                )
                : (
                  embed.author.name
                )}
            </Typography>
          </Stack>
        )}
        {embed.title && (
          <Typography component="div" mt="8px" lineHeight="1.375rem" fontWeight={700} color="#f2f3f5" gridColumn="1 / 1">
            {embed.url
              ? (
                <DiscordLink href={embed.url}>{embed.title}</DiscordLink>
              )
              : (
                embed.title
              )}
          </Typography>
        )}
        {embed.description && (
          <Typography component="div" mt="8px" fontSize="0.875rem" lineHeight="1.125rem" fontWeight={400} color="#dbdee1" whiteSpace="pre-wrap" gridColumn="1 / 1">
            {embed.description.trim()}
          </Typography>
        )}
        {embed.image && (
          <Box mt="16px" maxWidth="400px" maxHeight="225px">
            <img style={{ userSelect: "none", maxWidth: "100%", maxHeight: "100%", borderRadius: "4px" }} alt="Image" src={embed.image}></img>
          </Box>
        )}
        {(embed.footer || embed.timestamp) && (
          <Typography component="span" mt="8px" fontSize="0.75rem" lineHeight="1rem" fontWeight={500} color="#dbdee1" gridColumn="1 / 1">
            {embed.footer?.text}
            {embed.footer && timestamp && " • "}
            {timestamp}
          </Typography>
        )}
        {embed.thumbnail && (
          <Box gridRow="1 / 8" gridColumn="2 / 2" ml="16px" mt="8px" flexShrink={0} justifySelf="end">
            <img style={{ userSelect: "none", maxWidth: "80px", maxHeight: "80px", borderRadius: "4px" }} alt="Thumbnail" src={embed.thumbnail}></img>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function formatRelativeTimestamp(timestamp: number) {
  const diff = Math.round((timestamp - Date.now()));
  const units: Record<string, number> = {
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };

  if (Math.abs(diff) <= units.day) {
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    for (const unitName in units) {
      if (Math.abs(diff) > units[unitName] || unitName === "second") {
        return rtf.format(Math.round(diff / units[unitName]), unitName as Intl.RelativeTimeFormatUnit);
      }
    }
  }

  return new Date(timestamp).toLocaleString("en-GB", {
    year: "numeric", month: "numeric", day: "numeric",
    hour: "numeric", minute: "numeric",
  });
}

const DiscordLink = styled("a")(({ color }) => ({
  color: color || "#00aafc",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

