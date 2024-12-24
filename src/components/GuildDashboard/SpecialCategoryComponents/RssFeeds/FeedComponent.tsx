import { ExpandLess, ExpandMore, InfoOutlined, WarningAmberRounded } from "@mui/icons-material";
import { Autocomplete, Collapse, IconButton, Link, Stack, styled, Switch, TextField, Tooltip, Typography } from "@mui/material";
import { ChannelType } from "discord-api-types/v10";
import { CSSProperties, PropsWithChildren, useEffect, useRef, useState } from "react";

import { useGuildConfigEditionContext } from "../../../../repository/context/GuildConfigEditionContext";
import { useFetchGuildChannelsQuery } from "../../../../repository/redux/api/api";
import { RssFeed } from "../../../../repository/types/api";
import { GuildChannel } from "../../../../repository/types/guild";
import { ExternalRoutesURLs } from "../../../../router/router";
import ChannelMention from "../../../common/ChannelMention";
import { ReadonlyChannelPicker } from "../../ConfigComponents/shared/TextChannelPicker";
import FeedToggle from "./FeedToggle";
import RssFeedMention from "./RssFeedMention";

const RECENT_ERRORS_THRESHOLD = 3;

interface FeedComponentProps {
  feed: RssFeed;
  editFeed: (feed: RssFeed) => void;
}

export default function FeedComponent({ feed, editFeed }: FeedComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = isOpen ? ExpandLess : ExpandMore;

  function toggleCollapsedZone() {
    setIsOpen(!isOpen);
  }

  const isTwitter = feed.type === "tw";
  const isMinecraft = feed.type === "mc";
  const displayRecentErrors = !isTwitter && feed.recentErrors >= RECENT_ERRORS_THRESHOLD;

  return (
    <FeedRowContainer isOpen={isOpen} disabled={!feed.enabled}>
      <FeedTitleStack onClick={toggleCollapsedZone}>
        <Stack direction="row" overflow="hidden" alignItems="center">
          <RssFeedMention feed={feed} />
          {displayRecentErrors && <RecentErrorsIcon />}
          {!feed.enabled && <DisabledTag />}
        </Stack>

        <Stack direction="row">
          <FeedToggle feed={feed} editFeed={editFeed} disabled={isTwitter} />
          <IconButton onClick={toggleCollapsedZone}>
            <Icon />
          </IconButton>
        </Stack>
      </FeedTitleStack>

      <Collapse in={isOpen}>
        <Stack gap={1} px={2}>
          {displayRecentErrors && <RecentErrorsDescription recentErrors={feed.recentErrors} />}
          <SimpleParameterRow label="Channel">
            <ChannelSelection feed={feed} editFeed={editFeed} />
          </SimpleParameterRow>
          {!isMinecraft && (
            <SimpleParameterRow label="Use silent mentions">
              <SilentMentionToggle feed={feed} editFeed={editFeed} />
            </SimpleParameterRow>
          )}
          {!isMinecraft && (
            <SimpleParameterColumn label="Text template" documentationUrl="rss.html#change-the-text">
              <FeedTextEditor feed={feed} editFeed={editFeed} />
            </SimpleParameterColumn>
          )}
        </Stack>
      </Collapse>
    </FeedRowContainer>
  );
}

const FeedRowContainer = styled(Stack, { shouldForwardProp: (prop) => prop !== "isOpen" && prop !== "disabled" })<{ isOpen: boolean; disabled: boolean }>(({ theme, isOpen, disabled }) => ({
  flexDirection: "column",
  gap: theme.spacing(1, 2),
  borderRadius: 10,
  padding: theme.spacing(1.5, 2),
  opacity: disabled ? 0.7 : 1,
  backgroundColor: isOpen ? theme.palette.custom.background2 : "transparent",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.custom.background1,
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

function SimpleParameterRow({ label, children }: PropsWithChildren<{ label: string }>) {
  return (
    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
      <Typography>{label}</Typography>
      {children}
    </Stack>
  );
}

function SimpleParameterColumn({ label, documentationUrl, children }: PropsWithChildren<{ label: string; documentationUrl?: string }>) {
  return (
    <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="stretch">
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>{label}</Typography>
        {documentationUrl && (
          <Link href={`${ExternalRoutesURLs.documentation}/en/latest/${documentationUrl}`} target="_blank" title="Documentation" display="inline-flex">
            <InfoOutlined fontSize="small" color="info" />
          </Link>
        )}
      </Stack>
      {children}
    </Stack>
  );
}

function ChannelSelection({ feed, editFeed }: FeedComponentProps) {
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

function SilentMentionToggle({ feed, editFeed }: FeedComponentProps) {
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

function FeedTextEditor({ feed, editFeed }: FeedComponentProps) {
  const MIN_LENGTH = 5;
  const MAX_LENGTH = 1800;
  const lastValidValue = useRef(feed.structure);

  useEffect(() => {
    if (feed.structure.length >= MIN_LENGTH && feed.structure.length <= MAX_LENGTH) {
      lastValidValue.current = feed.structure;
    }
  }, [feed.structure]);

  function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    editFeed({
      ...feed,
      structure: event.target.value,
    });
  }

  function onBlur(event: React.FocusEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    if ((value.length < MIN_LENGTH || value.length > MAX_LENGTH) && lastValidValue.current) {
      editFeed({
        ...feed,
        structure: lastValidValue.current,
      });
    }
  }

  return (
    <TextField
      placeholder="Text template"
      value={feed.structure}
      onChange={onChange}
      onBlur={onBlur}
      variant="outlined"
      multiline
      maxRows={8}
      slotProps={{
        htmlInput: { minLength: MIN_LENGTH, maxLength: MAX_LENGTH },
      }}
    />
  );
}
