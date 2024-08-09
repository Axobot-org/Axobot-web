import { Link as MUILink, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { Link as RouterLink } from "react-router-dom";

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
      color="#D3D3D3"
    >
      <Stack direction="column" columnGap={{ xs: 2, sm: 3 }} alignItems="center">
        <CustomLink newTab href={ExternalRoutesURLs.botInvite}>Invite Axobot</CustomLink>
        <CustomLink newTab href={ExternalRoutesURLs.supportServer}>Support server</CustomLink>
      </Stack>
      <Stack direction="column" columnGap={{ xs: 2, sm: 3 }} order={{ xs: -1, sm: 0 }} alignItems="center">
        <span>© 2024 Axobot</span>
        <span>All rights reserved.</span>
      </Stack>
      <Stack direction="column" columnGap={{ xs: 2, sm: 3 }} alignItems="center">
        <CustomLink href="/terms">Terms of Use</CustomLink>
        <CustomLink href="/privacy">Privacy Policy</CustomLink>
      </Stack>
    </Stack>
  );
}

function CustomLink({ href, newTab, children }: PropsWithChildren<{href: string, newTab?: boolean}>) {
  return (
    <MUILink
      component={RouterLink}
      to={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener" : undefined}
      color="#D3D3D3"
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
    </MUILink>
  );
}
