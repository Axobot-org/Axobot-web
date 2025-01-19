import { ExpandLess, ExpandMore, WarningAmberRounded } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Autocomplete, Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, styled, Switch, TextField, Tooltip, Typography } from "@mui/material";
import { ChannelType } from "discord-api-types/v10";
import { CSSProperties, Fragment, PropsWithChildren, useState } from "react";

import { useGuildConfigEditionContext } from "../../../../repository/context/GuildConfigEditionContext";
import { useFetchGuildChannelsQuery, useLazyTestRssFeedQuery, usePutGuildRssFeedMutation } from "../../../../repository/redux/api/api";
import { RssFeed } from "../../../../repository/types/api";
import { GuildChannel } from "../../../../repository/types/guild";
import ChannelMention from "../../../common/ChannelMention";
import { ReadonlyChannelPicker } from "../../ConfigComponents/shared/TextChannelPicker";
import FeedDeleteButton from "./FeedDeleteButton";
import FeedEmbedSettings from "./FeedEmbedSettings";
import FeedPreview from "./FeedPreview";
import FeedTextEditor from "./FeedTextEditor";
import FeedToggle from "./FeedToggle";
import RssFeedMention from "./RssFeedMention";
import { SimpleParameterColumn, SimpleParameterRow } from "./shared";

const RECENT_ERRORS_THRESHOLD = 3;

interface FeedComponentProps {
  feed: RssFeed;
}

export default function FeedComponent({ feed }: FeedComponentProps) {
  const { guildId } = useGuildConfigEditionContext();
  const [editFeedMutation, { isLoading }] = usePutGuildRssFeedMutation();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [editedFeed, setEditedFeed] = useState<RssFeed | null>(null);
  const Icon = isDetailsOpen ? ExpandLess : ExpandMore;

  function editFeed(newFeedObject: RssFeed) {
    if (compareFeeds(feed, newFeedObject)) {
      setEditedFeed(null);
    } else {
      setEditedFeed(newFeedObject);
    }
  }

  async function saveFeed() {
    if (editedFeed && !isLoading) {
      const result = await editFeedMutation({ guildId, feed: editedFeed });
      if (!result.error) {
        setEditedFeed(null);
      }
    }
  }

  function toggleCollapsedZone() {
    if (isDetailsOpen && editedFeed) {
      setIsConfirmModalOpen(true);
    } else {
      setIsDetailsOpen(!isDetailsOpen);
    }
  }

  function closeConfirmationDialog() {
    setIsConfirmModalOpen(false);
  }

  function closeConfirmationDialogAndDetails() {
    closeConfirmationDialog();
    setIsDetailsOpen(false);
    setEditedFeed(null);
  }

  const isTwitter = feed.type === "tw";
  const displayRecentErrors = !isTwitter && feed.recentErrors >= RECENT_ERRORS_THRESHOLD;
  const feedToShow = editedFeed ?? feed;

  return (
    <FeedRowContainer isOpen={isDetailsOpen}>
      <FeedTitleStack onClick={toggleCollapsedZone}>
        <Stack spacing={{ xs: 0, sm: 1 }} direction="row" overflow="hidden" alignItems="center">
          <RssFeedMention feed={feedToShow} />
          {displayRecentErrors && <RecentErrorsIcon />}
          {!feed.enabled && <DisabledTag />}
          {editedFeed && <UnsavedTag />}
        </Stack>

        <Stack direction="row">
          <FeedToggle feed={feedToShow} disabled={isTwitter} />
          <IconButton onClick={toggleCollapsedZone}>
            <Icon />
          </IconButton>
        </Stack>
      </FeedTitleStack>

      <Collapse in={isDetailsOpen}>
        <InnerFeedComponent feed={feedToShow} isEdited={editedFeed !== null} editFeed={editFeed} saveFeed={saveFeed} displayRecentErrors={displayRecentErrors} isVisible={isDetailsOpen} />
      </Collapse>

      <UnsavedConfirmationDialog open={isConfirmModalOpen} onCancel={closeConfirmationDialog} onConfirm={closeConfirmationDialogAndDetails} />
    </FeedRowContainer>
  );
}


interface InnerComponentsProps {
  feed: RssFeed;
  isEdited: boolean;
  displayRecentErrors: boolean;
  isVisible: boolean;
  editFeed: (feed: RssFeed) => void;
  saveFeed: () => void;
}

function InnerFeedComponent({ feed, isEdited, editFeed, saveFeed, displayRecentErrors, isVisible }: InnerComponentsProps) {
  const isMinecraft = feed.type === "mc";

  return (
    <Stack spacing={1} px={2}>
      {displayRecentErrors && <RecentErrorsDescription recentErrors={feed.recentErrors} />}
      <SimpleParameterRow label="Channel">
        <ChannelSelection feed={feed} editFeed={editFeed} />
      </SimpleParameterRow>
      {!isMinecraft && (
        <Fragment>
          <SimpleParameterRow label="Use silent mentions">
            <SilentMentionToggle feed={feed} editFeed={editFeed} />
          </SimpleParameterRow>
          <SimpleParameterRow label="Display as an embed">
            <UseEmbedToggle feed={feed} editFeed={editFeed} />
          </SimpleParameterRow>
          <Collapse in={feed.useEmbed} sx={{ mb: 1 }}>
            {isVisible && <FeedEmbedSettings feed={feed} editFeed={editFeed} />}
          </Collapse>
          <SimpleParameterColumn label="Text template" documentationUrl="rss.html#change-the-text">
            <FeedTextEditor feed={feed} editFeed={editFeed} />
          </SimpleParameterColumn>
        </Fragment>
      )}
      <FeedActionsAndPreview feed={feed} isEdited={isEdited} saveFeed={saveFeed} />
    </Stack>
  );
}

const FeedRowContainer = styled(Stack, { shouldForwardProp: (prop) => prop !== "isOpen" })<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  flexDirection: "column",
  gap: theme.spacing(1, 2),
  borderRadius: 10,
  padding: theme.spacing(1.5, 2),
  backgroundColor: isOpen ? theme.palette.custom.background2 : theme.palette.custom.background1,
  transition: "background-color 0.2s",
  "&:hover": !isOpen && {
    opacity: 0.7,
  },
}));

const FeedTitleStack = styled(Stack)(({ theme, onClick }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  justifyContent: "space-between",
  alignItems: "center",
  cursor: onClick && "pointer",

  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(0),
  },
}));

function IconTooltip({ title, spanStyle, children }: PropsWithChildren<{ title: string; spanStyle?: CSSProperties }>) {
  return (
    <Tooltip
      title={title}
      placement="top"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -8],
              },
            },
          ],
        } }}
    >
      <span style={{ display: "inline-flex", ...spanStyle }}>
        {children}
      </span>
    </Tooltip>
  );
}

function DisabledTag() {
  return <Typography variant="caption" color="text.secondary" ml={0.5}>Disabled</Typography>;
}

function UnsavedTag() {
  return <Typography variant="caption" color="primary" ml={0.5}>Unsaved</Typography>;
}

function RecentErrorsIcon() {
  return (
    <IconTooltip title="Recent errors" spanStyle={{ verticalAlign: "bottom", marginLeft: "4px" }}>
      <WarningAmberRounded color="warning" />
    </IconTooltip>
  );
}

function RecentErrorsDescription({ recentErrors }: { recentErrors: number }) {
  let text: string;
  if (recentErrors >= 72) {
    text = "This feed got too many recent errors and has been automatically disabled.";
  } else {
    text = `This feed got ${recentErrors} recent errors and may be disabled soon.`;
  }

  return (
    <Typography variant="body2" color="text.secondary" ml={0.5} display="inline-flex" alignItems="center">
      <WarningAmberRounded color="warning" />
      {text}
    </Typography>
  );
}

function ChannelSelection({ feed, editFeed }: Pick<InnerComponentsProps, "feed" | "editFeed">) {
  const { guildId } = useGuildConfigEditionContext();
  const { data, isLoading, error } = useFetchGuildChannelsQuery({ guildId });
  const [editing, setEditing] = useState(false);

  if (error) return null;

  const channels = data?.filter((channel) => channel.isThread || channel.type === ChannelType.GuildText) ?? [];
  function isOptionDisabled(channel: GuildChannel) {
    return channel.type === ChannelType.GuildCategory || channel.type === ChannelType.GuildForum || channel.type === ChannelType.GuildMedia;
  }

  const currentChannel: GuildChannel | null = (
    channels.find((channel) => channel.id === feed.channelId)
    || {
      id: feed.channelId,
      name: feed.channelId,
      type: ChannelType.GuildText,
      isText: true,
      isVoice: false,
      isThread: false,
      isNSFW: false,
      position: null,
      parentId: null,
    }
  );

  function onChange(value: GuildChannel) {
    if (value.id !== feed.channelId) {
      editFeed({
        ...feed,
        channelId: value.id,
      });
    }
  }

  if (editing) {
    return (
      <Autocomplete
        openOnFocus
        blurOnSelect
        disableClearable
        options={channels}
        value={currentChannel}
        onChange={(_, newValue) => onChange(newValue)}
        sx={{ width: { md: 250, lg: 300 } }}
        loading={isLoading || !channels}
        isOptionEqualToValue={(opt, value) => opt.id === value.id}
        getOptionLabel={(channel) => channel.name}
        getOptionDisabled={isOptionDisabled}
        onBlur={() => setEditing(false)}
        renderInput={(params) => <TextField {...params} autoFocus variant="standard" placeholder="Pick a channel" />}
        renderOption={(props, opt) => (
          <li {...props} key={opt.id}>
            <ChannelMention channel={opt} disabled={isOptionDisabled(opt)} disableColor={isOptionDisabled(opt)} indent />
          </li>
        )}
      />
    );
  }

  return <ReadonlyChannelPicker currentChannel={currentChannel} onClick={() => setEditing(true)} />;
}

function SilentMentionToggle({ feed, editFeed }: Pick<InnerComponentsProps, "feed" | "editFeed">) {
  function onChange() {
    editFeed({
      ...feed,
      silentMention: !feed.silentMention,
    });
  }

  return (
    <Switch
      checked={feed.silentMention}
      onChange={onChange}
    />
  );
}

function UseEmbedToggle({ feed, editFeed }: Pick<InnerComponentsProps, "feed" | "editFeed">) {
  function onChange() {
    editFeed({
      ...feed,
      useEmbed: !feed.useEmbed,
    });
  }

  return (
    <Switch
      checked={feed.useEmbed}
      onChange={onChange}
    />
  );
}

interface FeedActionsAndPreviewProps {
  feed: RssFeed;
  isEdited: boolean;
  saveFeed: () => void;
}
function FeedActionsAndPreview({ feed, isEdited, saveFeed }: FeedActionsAndPreviewProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const canPreview = ["yt", "web"].includes(feed.type);
  const [fetchFeed, { data: previewData, isLoading }] = useLazyTestRssFeedQuery();

  const togglePreview = async () => {
    setIsPreviewOpen(!isPreviewOpen);
    if (!isPreviewOpen && !previewData && !isLoading) {
      await fetchFeed({ type: feed.type, url: feed.link });
    }
  };

  return (
    <Stack direction="column" spacing={2} my={2}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {canPreview && (
          <Button color="secondary" variant="outlined" onClick={togglePreview} startIcon={<VisibilityIcon />}>
            {isPreviewOpen ? "Hide Preview" : "Preview"}
          </Button>
        )}
        {isEdited && (
          <Button color="primary" variant="outlined" onClick={saveFeed} startIcon={<SaveIcon />}>
            Save changes
          </Button>
        )}
        <FeedDeleteButton feed={feed} />
      </Stack>
      <FeedPreview isOpen={isPreviewOpen} isLoading={isLoading} feed={feed} data={previewData} />
    </Stack>
  );
}

interface UnsavedConfirmationDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}
function UnsavedConfirmationDialog({ open, onCancel, onConfirm }: UnsavedConfirmationDialogProps) {
  return (
    <Dialog maxWidth="xs" open={open} onClose={onCancel}>
      <DialogTitle>You have unsaved changes!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Closing this feed will discard your changes. Are you sure you want to continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="gray" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="error" onClick={onConfirm}>Close without saving</Button>
      </DialogActions>
    </Dialog>
  );
}


function compareFeeds(a: RssFeed, b: RssFeed) {
  return Object.keys(a).every((key) => key in b && a[key as keyof RssFeed] === b[key as keyof RssFeed]);
}

