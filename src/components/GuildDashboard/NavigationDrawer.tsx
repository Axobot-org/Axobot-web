import { Gavel, Handshake, HowToVote, InfoOutlined, Leaderboard, LiveTv, Mic, QuestionMark, Settings, WavingHand } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CSSObject, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Theme, Toolbar } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { Fragment, useState } from "react";

import { GuildConfigOptionCategory, GuildConfigOptionCategoryNames } from "../../repository/types/guild-config-types";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    zIndex: 1,

    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }),
);

const PageTab = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "isOpen" && prop !== "isSelected",
})<{isOpen: boolean, isSelected: boolean}>(({ theme, isOpen, isSelected }) => ({
  minHeight: 48,
  justifyContent: isOpen ? "initial" : "center",
  px: 2.5,

  ...(isSelected && {
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
}));

function TabIcon({ page }: {page: GuildConfigOptionCategory}) {
  switch (page) {
  case "core":
    return <Settings />;
  case "info":
    return <InfoOutlined />;
  case "moderation":
    return <Gavel />;
  case "partners":
    return <Handshake />;
  case "poll-channels":
    return <HowToVote />;
  case "streamers":
    return <LiveTv />;
  case "voice-channels":
    return <Mic />;
  case "welcome":
    return <WavingHand />;
  case "xp":
    return <Leaderboard />;
  default:
    return <QuestionMark />;
  }
}

function TabContent({ page, isOpen }: {page: GuildConfigOptionCategory, isOpen: boolean}) {
  const formatedTitle = page.replace(/-/g, " ").replace(/^\w/, c => c.toUpperCase());
  return (
    <Fragment>
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : "auto",
          justifyContent: "center",
        }}
      >
        <TabIcon page={page} />
      </ListItemIcon>
      <ListItemText primary={formatedTitle} sx={{ opacity: isOpen ? 1 : 0 }} />
    </Fragment>
  );
}


interface NavigationDrawerProps {
  activePage: GuildConfigOptionCategory;
  onClick: (page: GuildConfigOptionCategory) => void;
}

export default function NavigationDrawer({ activePage, onClick }: NavigationDrawerProps) {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar />
      <DrawerHeader>
        <IconButton onClick={toggleOpen}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {GuildConfigOptionCategoryNames.map(page => (
          <ListItem key={page} disablePadding sx={{ display: "block" }}>
            <PageTab
              isOpen={open}
              isSelected={activePage === page}
              onClick={() => onClick(page)}
            >
              <TabContent page={page} isOpen={open} />
            </PageTab>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}