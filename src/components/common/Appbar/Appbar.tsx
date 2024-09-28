import { AppBar, Box, Button, Container, Stack, Toolbar } from "@mui/material";
import { lazy, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

import { useGetorFetchMe } from "../../../repository/commands/useGetOrFetchMe";
import { ExternalRoutesURLs } from "../../../router/router";
import LogoAndTitle from "../LogoAndTitle";
const UserMenu = lazy(() => import("./UserMenu"));

export default function Appbar() {
  const { user } = useGetorFetchMe();

  const appbarLinks: { [key: string]: string } = useMemo(() => {
    const base = {
      "Invite Axobot": ExternalRoutesURLs.botInvite,
      "Documentation": ExternalRoutesURLs.documentation,
      "Support us": ExternalRoutesURLs.donate,
    };
    if (user) {
      return {
        "Dashboard": "/dashboard",
        ...base,
      };
    } else {
      return {
        "Login": ExternalRoutesURLs.discordAuth,
        ...base,
      };
    }
  }, [user]);

  const getExternalParams = (key: string, url: string) => ((url.startsWith("http") && key !== "Login") ? { target: "_blank", rel: "noopener" } : {});

  return (
    <AppBar position="fixed" sx={{ zIndex: 10 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box id="appbar-left-slot"/>

            <LogoAndTitle />
          </Stack>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1, marginInlineStart: 1 }}>
            {Object.keys(appbarLinks).map((key) => (
              <Button
                key={key}
                component={RouterLink}
                to={appbarLinks[key]}
                sx={{ color: "white", display: "block" }}
                {...getExternalParams(key, appbarLinks[key])}
              >
                {key}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <UserMenu appbarLinks={appbarLinks} />
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
