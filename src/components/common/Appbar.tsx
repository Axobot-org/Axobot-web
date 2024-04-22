import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, Container, IconButton, Link, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
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

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getExternalParams = (url: string) => (url.startsWith("http") ? { target: "_blank", rel: "noopener" } : {});

  return (
    <AppBar position="static" sx={{ zIndex: 10 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              aria-controls="website-menu"
              aria-label="Website menu"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="website-menu"
              anchorEl={anchorElNav}
              keepMounted
              open={Boolean(anchorElNav)}
              onClick={handleCloseNavMenu}
              onClose={handleCloseNavMenu}
            >
              {Object.keys(pages).map((key) => (
                <MenuItem key={key} component={Link} href={pages[key]} {...getExternalParams(pages[key])}>
                  <Typography textAlign="center">{key}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <LogoAndTitle />

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
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
