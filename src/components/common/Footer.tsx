import { Link, Stack } from "@mui/material";
import { PropsWithChildren } from "react";

import { ExternalRoutesURLs } from "../../router/router";

export default function Footer() {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      rowGap={0.5}
      columnGap={6}
      justifyContent="center"
      alignItems="center"
      py={2}
      mt={2}
      fontSize="0.85rem"
      color="lightgray"
    >
      <Stack direction="column" columnGap={{ xs: 2, sm: 3 }} alignItems="center">
        <LinkInNewTab href={ExternalRoutesURLs.supportServer}>Invite Axobot</LinkInNewTab>
        <LinkInNewTab href={ExternalRoutesURLs.supportServer}>Support server</LinkInNewTab>
      </Stack>
      <Stack direction="column" columnGap={{ xs: 2, sm: 3 }} order={{ xs: -1, sm: 0 }} alignItems="center">
        <span>© 2024 Axobot</span>
        <span>All rights reserved.</span>
      </Stack>
      <Stack direction="column" columnGap={{ xs: 2, sm: 3 }} alignItems="center">
        <LinkInNewTab href="/terms">Terms of Use</LinkInNewTab>
        <LinkInNewTab href="/privacy">Privacy Policy</LinkInNewTab>
      </Stack>
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
    </Link>
  );
}
