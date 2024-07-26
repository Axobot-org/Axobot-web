import LaunchIcon from "@mui/icons-material/Launch";
import { IconButton, Link, Stack } from "@mui/material";
import { PropsWithChildren } from "react";

import DiscordMarkWhite from "../../svg/discord-mark.svg?react";

export default function Footer() {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      rowGap={0.5}
      columnGap={3}
      justifyContent="center"
      alignItems="center"
      py={2}
      mt={2}
      fontSize="0.9rem"
    >
      <span>© 2024 Axobot</span>
      <LinkInNewTab href="/tos">Terms of Service</LinkInNewTab>
      <LinkInNewTab href="/privacy">Privacy Policy</LinkInNewTab>
      <DiscordServerButton />
    </Stack>
  );
}

function LinkInNewTab({ href, children }: PropsWithChildren<{href: string}>) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      color="lightgray"
      sx={(theme) => ({
        display: "flex",
        gap: 0.5,
        alignItems: "center",
        transition: "color 0.2s",
        "&:hover": {
          color: theme.palette.primary.main,
        },
      })}
    >
      {children}
      <LaunchIcon sx={{ fontSize: "1rem" }}/>
    </Link>
  );
}

function DiscordServerButton() {
  return (
    <IconButton
      href="https://discord.gg/axobot"
      target="_blank"
      rel="noopener"
      color="inherit"
      aria-label="Discord server"
      sx={(theme) => ({
        "& svg": {
          fill: "lightgray",
          transition: "fill 0.2s",
        },
        "&:hover svg": {
          fill: theme.palette.blurple.main,
        },
      })}
    >
      <DiscordMarkWhite width={20} />
    </IconButton>
  );
}

