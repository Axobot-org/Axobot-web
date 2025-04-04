import { Feed, Gavel, Handshake, HowToVote, InfoOutlined, Leaderboard, LiveTv, Mic, NewspaperOutlined, QuestionMark, Settings, WavingHand } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Box, CSSObject, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Theme, Toolbar } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { Fragment, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";

import { getGuildDashboardTranslations } from "../../i18n/i18n";
import { useGuildConfigEditionContext } from "../../repository/context/GuildConfigEditionContext";
import { GuildConfigOptionCategory, GuildConfigOptionCategoryNames } from "../../repository/types/guild-config-types";
import { useIsOnMobile } from "../../styles/useIsOnMobile";
import UnsavedFeedsConfirmationDialog from "./SpecialCategoryComponents/RssFeeds/UnsavedFeedsConfirmationDialog";

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

interface PageTabProps {
  isOpen: boolean;
  isSelected: boolean;
  to?: string;
  component?: React.ElementType;
}

const PageTab = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "isOpen" && prop !== "isSelected",
})<PageTabProps>(({ theme, isOpen, isSelected }) => ({
  minHeight: 48,
  justifyContent: isOpen ? "initial" : "center",
  margin: theme.spacing(0.5, 1),
  padding: theme.spacing(1),

  borderRadius: isOpen ? "4px" : "100%",
  transition: theme.transitions.create("border-radius", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),

  ...(isSelected && {
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
}));

function TabIcon({ page }: { page: GuildConfigOptionCategory }) {
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
    case "rss":
      return <NewspaperOutlined />;
    case "streamers":
      return <LiveTv />;
    case "voice-channels":
      return <Mic />;
    case "welcome":
      return <WavingHand />;
    case "xp":
      return <Leaderboard />;
    case "edition-logs":
      return <Feed />;
    default:
      return <QuestionMark />;
  }
}

function getPageTitle(page: string) {
  return getGuildDashboardTranslations(`category_name.${page}`);
}

function TabContent({ page, isOpen, isUnsaved }: { page: GuildConfigOptionCategory; isOpen: boolean; isUnsaved: boolean }) {
  const formatedTitle = getPageTitle(page);

  return (
    <Fragment>
      <ListItemIcon
        sx={{
          minWidth: 0,
          px: 1.5,
          mr: isOpen ? 3 : 0,
          justifyContent: "center",
        }}
      >
        <Badge color="warning" variant="dot" invisible={!isUnsaved}>
          <TabIcon page={page} />
        </Badge>
      </ListItemIcon>
      <ListItemText primary={formatedTitle} sx={{ opacity: isOpen ? 1 : 0 }} />
    </Fragment>
  );
}

interface NavigationDrawerContentProps {
  open: boolean;
  activePage?: GuildConfigOptionCategory;
  toggleOpen: () => void;
}

function NavigationDrawerContent({ open, activePage, toggleOpen }: NavigationDrawerContentProps) {
  const { getCategoriesWithUnsavedChanges } = useGuildConfigEditionContext();
  const unsavedCategories = getCategoriesWithUnsavedChanges();
  const isOnMobile = useIsOnMobile();
  const navigate = useNavigate();

  const [isUnsavedFeedsDialogOpen, setIsUnsavedFeedsDialogOpen] = useState(false);
  const destinationPage = useRef<GuildConfigOptionCategory | null>(null);

  function handleClickOnTab(page: GuildConfigOptionCategory) {
    return async () => {
      if (activePage === "rss" && unsavedCategories.includes("rss")) {
        destinationPage.current = page;
        setIsUnsavedFeedsDialogOpen(true);
        return;
      }
      navigate(page);
      if (isOnMobile) {
        toggleOpen();
      }
    };
  }

  const closeUnsavedFeedsDialog = () => setIsUnsavedFeedsDialogOpen(false);
  const closeUnsavedFeedsDialogAndNavigate = () => {
    closeUnsavedFeedsDialog();
    if (destinationPage.current) {
      navigate(destinationPage.current);
    }
  };

  return (
    <Fragment>
      <Toolbar sx={{ display: { xs: "none", md: "initial" } }} />
      <Box sx={{ width: open ? undefined : "64px" }}>
        <DrawerHeader>
          <IconButton onClick={toggleOpen}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {GuildConfigOptionCategoryNames.map((page) => (
            <ListItem key={page} disablePadding sx={{ display: "block" }}>
              <PageTab
                isOpen={open}
                isSelected={activePage === page}
                onClick={handleClickOnTab(page)}
              >
                <TabContent page={page} isOpen={open} isUnsaved={unsavedCategories.includes(page)} />
              </PageTab>
            </ListItem>
          ))}
        </List>
      </Box>
      <UnsavedFeedsConfirmationDialog
        open={isUnsavedFeedsDialogOpen}
        onCancel={closeUnsavedFeedsDialog}
        onConfirm={closeUnsavedFeedsDialogAndNavigate}
      />
    </Fragment>
  );
}

export default function NavigationDrawer() {
  const location = useLocation();
  const isOnMobile = useIsOnMobile();
  const [open, setOpen] = useState(!isOnMobile);

  const currentEndpoint = location.pathname.split("/").pop() || "";
  const activePage = (GuildConfigOptionCategoryNames.includes(currentEndpoint as GuildConfigOptionCategory) ? currentEndpoint : undefined) as GuildConfigOptionCategory | undefined;

  const toggleOpen = () => {
    setOpen(!open);
  };

  const appbarLeftSlot = document.getElementById("appbar-left-slot");

  if (isOnMobile) {
    return (
      <Fragment>
        <MuiDrawer variant="temporary" anchor="left" open={open} onClose={toggleOpen}>
          <NavigationDrawerContent open={open} activePage={activePage} toggleOpen={toggleOpen} />
        </MuiDrawer>
        {appbarLeftSlot && createPortal(
          <IconButton onClick={toggleOpen}>
            <MenuIcon />
          </IconButton>,
          appbarLeftSlot
        )}
      </Fragment>
    );
  }

  return (
    <Drawer variant="permanent" open={open} sx={{ "& .MuiPaper-root": { scrollbarWidth: "thin" } }}>
      <NavigationDrawerContent open={open} activePage={activePage} toggleOpen={toggleOpen} />
    </Drawer>
  );
}
