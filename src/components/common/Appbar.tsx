import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, Container, IconButton, Link, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useMemo } from "react";

import useUserSelector from "../../repository/redux/selectors/useUserSelector";
import { ExternalRoutesURLs } from "../../router/router";
import UserAvatar from "./UserAvatar";

export default function Appbar() {
  const { user } = useUserSelector();

  const pages: {[key: string]: string} = useMemo(() => {
    const base = {
      "Documentation": ExternalRoutesURLs.documentation,
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

  const settings: {[key: string]: string} = useMemo(() => {
    const base = {
      "Support server": ExternalRoutesURLs.supportServer,
    };
    if (user) {
      return {
        "Dashboard": "/dashboard",
        ...base,
        "Logout": "/logout",
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


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {Object.keys(pages).map((key) => (
                <MenuItem key={key} component={Link} href={pages[key]}>
                  <Typography textAlign="center">{key}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <LogoAndTitle />

          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {Object.keys(pages).map((key) => (
              <Button
                key={key}
                href={pages[key]}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {key}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <UserAvatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {Object.keys(settings).map((key) => (
                <MenuItem key={key} component={Link} href={settings[key]}>
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

const LogoAndTitle = () => (
  <Stack
    component={Link}
    href="/"
    direction="row"
    alignItems="center"
    color="inherit"
    mr={2}
    flexGrow={{ xs: 1, sm: 0 }}
    sx={{ textDecoration: "none" }}
  >
    <Box sx={{ marginRight: "1rem", height: { xs: "2rem", sm: "3rem" } }}>
      <img
        src="/assets/logo128.png"
        alt="logo"
        style={{ height: "100%" }}
      />
    </Box>
    <Typography
      variant="h6"
      noWrap
      sx={{
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".2rem",
      }}
    >
            Axobot
    </Typography>
  </Stack>
);
