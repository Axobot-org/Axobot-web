import { Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { MouseEvent, useMemo, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Link as RouterLink } from "react-router-dom";

import { useGetorFetchMe } from "../../../repository/commands/useGetOrFetchMe";
import useLogout from "../../../repository/redux/dispatchs/useLogout";
import { ExternalRoutesURLs } from "../../../router/router";
import UserAvatar from "../UserAvatar";

interface UserMenuProps {
  appbarLinks: Record<string, string>;
}

export function UserMenu(props: UserMenuProps) {
  const { user } = useGetorFetchMe();
  const { logoutCommand } = useLogout();

  const settings: Record<string, string> = useMemo(() => {
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

  const mobileLinks = Object.fromEntries(Object.entries(props.appbarLinks).filter(([key]) => settings[key] === undefined));

  const getExternalParams = (key: string, url: string) => ((url.startsWith("http") && key !== "Login") ? { target: "_blank", rel: "noopener" } : {});

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Fragment>
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
          <MenuItem key={key} component={RouterLink} to={settings[key]} {...getExternalParams(key, settings[key])}>
            <Typography textAlign="center">{key}</Typography>
          </MenuItem>
        ))}
        {user && (
          <MenuItem onClick={logoutCommand}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        )}
        <Divider sx={{ display: { xs: "flex", md: "none" }, mx: 3 }} />
        {Object.keys(mobileLinks).map((key) => (
          <MenuItem key={key} component={RouterLink} to={mobileLinks[key]} sx={{ display: { xs: "flex", md: "none" } }} {...getExternalParams(key, mobileLinks[key])}>
            <Typography textAlign="center">{key}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}

export default UserMenu;
