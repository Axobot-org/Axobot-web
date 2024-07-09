import { AppBar, Box, Button, Container, Divider, IconButton, Link, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useMemo } from "react";

import { useGetorFetchMe } from "../../repository/commands/useGetOrFetchMe";
import useLogout from "../../repository/redux/dispatchs/useLogout";
import { ExternalRoutesURLs } from "../../router/router";
import LogoAndTitle from "./LogoAndTitle";
import UserAvatar from "./UserAvatar";

export default function Appbar() {
  const { user } = useGetorFetchMe();
  const { logoutCommand } = useLogout();

  const pages: { [key: string]: string } = useMemo(() => {
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
  const mobilePagesKeys = Object.keys(pages).filter(key => key !== "Dashboard");

  const settings: { [key: string]: string } = useMemo(() => {
    const base = {
      "Global leaderboard": "/leaderboard/global",
      "Support server": ExternalRoutesURLs.supportServer,
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

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getExternalParams = (url: string) => (url.startsWith("http") ? { target: "_blank", rel: "noopener" } : {});

  return (
    <AppBar position="fixed" sx={{ zIndex: 10 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box id="appbar-left-slot"/>

            <LogoAndTitle />
          </Stack>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1, marginInlineStart: 1 }}>
            {Object.keys(pages).map((key) => (
              <Button
                key={key}
                href={pages[key]}
                sx={{ color: "white", display: "block" }}
                {...getExternalParams(pages[key])}
              >
                {key}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user?.globalName ?? user?.username}>
              <IconButton
                onClick={handleOpenUserMenu}
                aria-controls="user-menu"
                aria-label="User menu"
              >
                <UserAvatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="user-menu"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              open={Boolean(anchorElUser)}
              onClick={handleCloseUserMenu}
              onClose={handleCloseUserMenu}
            >
              {Object.keys(settings).map((key) => (
                <MenuItem key={key} component={Link} href={settings[key]} {...getExternalParams(settings[key])}>
                  <Typography textAlign="center">{key}</Typography>
                </MenuItem>
              ))}
              {user && (
                <MenuItem onClick={logoutCommand}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              )}
              <Divider sx={{ display: { xs: "flex", md: "none" }, mx: 3 }} />
              {mobilePagesKeys.map((key) => (
                <MenuItem key={key} component={Link} href={pages[key]} sx={{ display: { xs: "flex", md: "none" } }} {...getExternalParams(pages[key])}>
                  <Typography textAlign="center">{key}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
