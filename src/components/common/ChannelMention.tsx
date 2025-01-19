import FolderIcon from "@mui/icons-material/Folder";
import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { ChannelType } from "discord-api-types/v10";

import DeleteCircleButton from "./DeleteCircleButton";


interface ChannelMentionProps {
  channel: {
    name: string;
    type: ChannelType;
    parentId: string | null | undefined;
  };
  disabled?: boolean;
  indent?: boolean;
  disableColor?: boolean;
  onDelete?: (event: unknown) => void;
}

export default function ChannelMention({ channel, disabled, indent, disableColor, onDelete }: ChannelMentionProps) {
  const mentionColor = 0xc9cdfb;
  const backgroundColor = 0x5865f24d;
  const Icon = getIconComponent(channel.type);
  const indentationLevel = getIdentationLevel(channel) * 12;

  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{
        color: disableColor ? undefined : `#${mentionColor.toString(16).padStart(6, "0")}`,
        backgroundColor: disableColor ? undefined : `#${backgroundColor.toString(16).padStart(8, "0")}`,
        borderRadius: "5px",
        alignItems: "center",
        overflow: indent ? undefined : "hidden",
        padding: onDelete ? "2px 4px" : "0 2px",
        marginLeft: (indent ? indentationLevel / 8 : 0) + (onDelete ? 0.5 : 0),
        marginRight: onDelete ? 0.5 : 0,
      }}
    >
      <Typography noWrap={!indent} component="span">
        {Icon}{channel.name}
      </Typography>
      {onDelete && !disabled && <DeleteCircleButton onClick={onDelete} />}
    </Stack>
  );
}

const IconStyle = {
  width: "1rem",
  height: "1rem",
  verticalAlign: "middle",
  marginBottom: ".2rem",
  marginRight: "4px",
} as const;

function getIconComponent(channelType: ChannelType) {
  switch (channelType) {
    case ChannelType.GuildCategory:
      return <FolderIcon sx={IconStyle} />;
    case ChannelType.GuildText:
      return TextChannelIcon;
    case ChannelType.GuildVoice:
      return VoiceChannelIcon;
    case ChannelType.GuildStageVoice:
      return StageChannelIcon;
    case ChannelType.AnnouncementThread:
    case ChannelType.PrivateThread:
    case ChannelType.PublicThread:
      return ThreadChannelIcon;
    case ChannelType.GuildAnnouncement:
      return AnnouncementChannelIcon;
    case ChannelType.GuildForum:
      return ForumChannelIcon;
    case ChannelType.GuildMedia:
      return MediaChannelIcon;
    default:
      console.warn("ChannelMention: unknown channel type", channelType);
      return null;
  }
}

function getIdentationLevel(channel: ChannelMentionProps["channel"]) {
  if (channel.type === ChannelType.GuildCategory) return 0;
  if ([ChannelType.AnnouncementThread, ChannelType.PrivateThread, ChannelType.PublicThread].includes(channel.type)) {
    return 2;
  };
  if (channel.parentId) return 1;
  return 0;
}

const IconSVG = styled("svg")(IconStyle);

const TextChannelIcon = (
  <IconSVG aria-label="Channel" aria-hidden="false" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path fill="currentColor" fillRule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clipRule="evenodd" />
  </IconSVG>
);

const VoiceChannelIcon = (
  <IconSVG aria-label="Voice Channel" aria-hidden="false" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z" />
    <path fill="currentColor" d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z" />
  </IconSVG>
);

const StageChannelIcon = (
  <IconSVG aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path fill="currentColor" d="M19.61 18.25a1.08 1.08 0 0 1-.07-1.33 9 9 0 1 0-15.07 0c.26.42.25.97-.08 1.33l-.02.02c-.41.44-1.12.43-1.46-.07a11 11 0 1 1 18.17 0c-.33.5-1.04.51-1.45.07l-.02-.02Z" />
    <path fill="currentColor" d="M16.83 15.23c.43.47 1.18.42 1.45-.14a7 7 0 1 0-12.57 0c.28.56 1.03.6 1.46.14l.05-.06c.3-.33.35-.81.17-1.23A4.98 4.98 0 0 1 12 7a5 5 0 0 1 4.6 6.94c-.17.42-.13.9.18 1.23l.05.06Z" />
    <path fill="currentColor" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.33 20.03c-.25.72.12 1.5.8 1.84a10.96 10.96 0 0 0 9.73 0 1.52 1.52 0 0 0 .8-1.84 6 6 0 0 0-11.33 0Z" />
  </IconSVG>
);

const ThreadChannelIcon = (
  <IconSVG aria-label="Thread" aria-hidden="false" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path d="M12 2.81a1 1 0 0 1 0-1.41l.36-.36a1 1 0 0 1 1.41 0l9.2 9.2a1 1 0 0 1 0 1.4l-.7.7a1 1 0 0 1-1.3.13l-9.54-6.72a1 1 0 0 1-.08-1.58l1-1L12 2.8ZM12 21.2a1 1 0 0 1 0 1.41l-.35.35a1 1 0 0 1-1.41 0l-9.2-9.19a1 1 0 0 1 0-1.41l.7-.7a1 1 0 0 1 1.3-.12l9.54 6.72a1 1 0 0 1 .07 1.58l-1 1 .35.36ZM15.66 16.8a1 1 0 0 1-1.38.28l-8.49-5.66A1 1 0 1 1 6.9 9.76l8.49 5.65a1 1 0 0 1 .27 1.39ZM17.1 14.25a1 1 0 1 0 1.11-1.66L9.73 6.93a1 1 0 0 0-1.11 1.66l8.49 5.66Z" fill="currentColor" />
  </IconSVG>
);

const AnnouncementChannelIcon = (
  <IconSVG aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path fill="currentColor" fillRule="evenodd" d="M19.56 2a3 3 0 0 0-2.46 1.28 3.85 3.85 0 0 1-1.86 1.42l-8.9 3.18a.5.5 0 0 0-.34.47v10.09a3 3 0 0 0 2.27 2.9l.62.16c1.57.4 3.15-.56 3.55-2.12a.92.92 0 0 1 1.23-.63l2.36.94c.42.27.79.62 1.07 1.03A3 3 0 0 0 19.56 22h.94c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5h-.94Zm-8.53 15.8L8 16.7v1.73a1 1 0 0 0 .76.97l.62.15c.5.13 1-.17 1.12-.67.1-.41.29-.78.53-1.1Z" clipRule="evenodd" />
    <path fill="currentColor" d="M2 10c0-1.1.9-2 2-2h.5c.28 0 .5.22.5.5v7a.5.5 0 0 1-.5.5H4a2 2 0 0 1-2-2v-4Z" />
  </IconSVG>
);

const ForumChannelIcon = (
  <IconSVG aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path fill="currentColor" d="M18.91 12.98a5.45 5.45 0 0 1 2.18 6.2c-.1.33-.09.68.1.96l.83 1.32a1 1 0 0 1-.84 1.54h-5.5A5.6 5.6 0 0 1 10 17.5a5.6 5.6 0 0 1 5.68-5.5c1.2 0 2.32.36 3.23.98Z" />
    <path fill="currentColor" d="M19.24 10.86c.32.16.72-.02.74-.38L20 10c0-4.42-4.03-8-9-8s-9 3.58-9 8c0 1.5.47 2.91 1.28 4.11.14.21.12.49-.06.67l-1.51 1.51A1 1 0 0 0 2.4 18h5.1a.5.5 0 0 0 .49-.5c0-4.2 3.5-7.5 7.68-7.5 1.28 0 2.5.3 3.56.86Z" />
  </IconSVG>
);

const MediaChannelIcon = (
  <IconSVG aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path fill="currentColor" fillRule="evenodd" d="M2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5Zm13.35 8.13 3.5 4.67c.37.5.02 1.2-.6 1.2H5.81a.75.75 0 0 1-.59-1.22l1.86-2.32a1.5 1.5 0 0 1 2.34 0l.5.64 2.23-2.97a2 2 0 0 1 3.2 0ZM10.2 5.98c.23-.91-.88-1.55-1.55-.9a.93.93 0 0 1-1.3 0c-.67-.65-1.78-.01-1.55.9a.93.93 0 0 1-.65 1.12c-.9.26-.9 1.54 0 1.8.48.14.77.63.65 1.12-.23.91.88 1.55 1.55.9a.93.93 0 0 1 1.3 0c.67.65 1.78.01 1.55-.9a.93.93 0 0 1 .65-1.12c.9-.26.9-1.54 0-1.8a.93.93 0 0 1-.65-1.12Z" clipRule="evenodd" />
  </IconSVG>
);
