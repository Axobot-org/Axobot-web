import EditIcon from "@mui/icons-material/Edit";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { ChannelType } from "discord-api-types/v10";
import { useMemo, useState } from "react";

import { useGuildConfigEditionContext } from "../../../../repository/context/GuildConfigEditionContext";
import { useFetchGuildChannelsQuery } from "../../../../repository/redux/api/api";
import { GuildChannel } from "../../../../repository/types/guild";
import { TextChannelOptionRepresentation } from "../../../../repository/types/guild-config-types";
import ChannelMention from "../../../common/ChannelMention";
import useIsConfigEdited from "./useIsConfigEdited";


interface TextChannelPickerProps {
  optionId: string;
  option: TextChannelOptionRepresentation & {value: unknown};
  guildId: string;
}

export default function TextChannelPicker({ optionId, option, guildId }: TextChannelPickerProps) {
  const { state, setValue, resetValue } = useGuildConfigEditionContext();
  const isEdited = useIsConfigEdited(optionId);
  const { data, isLoading, error } = useFetchGuildChannelsQuery({ guildId });
  const [editing, setEditing] = useState(false);

  const channels = useMemo(() => (
    data?.filter((channel) => {
      if (channel.isVoice) return false;
      if (!option.allow_threads && channel.isThread) return false;
      if (!option.allow_announcement_channels && channel.type === ChannelType.GuildAnnouncement) return false;
      if (!option.allow_non_nsfw_channels && !channel.isNSFW) return false;
      return true;
    }) ?? []
  ), [data, option.allow_announcement_channels, option.allow_non_nsfw_channels, option.allow_threads]);

  if (option.value !== null && typeof option.value !== "string") {
    console.error("TextChannelConfigComponent: option value is not a string", option.value);
    return null;
  }

  function isOptionDisabled(channel: GuildChannel) {
    return channel.type === ChannelType.GuildCategory || channel.type === ChannelType.GuildForum || channel.type === ChannelType.GuildMedia;
  }

  const currentValue = isEdited ? state[optionId] as string : option.value;
  const currentChannel: GuildChannel | null = (
    channels.find((channel) => channel.id === currentValue)
    || (
      currentValue === null ? null : {
        id: currentValue,
        name: currentValue,
        type: ChannelType.GuildText,
        isText: true,
        isVoice: false,
        isThread: false,
        isNSFW: false,
        position: null,
        parentId: null,
      }
    )
  );

  function onChange(value: GuildChannel | null) {
    if (value === null) {
      if (option.value === null) {
        resetValue(optionId);
      } else {
        setValue(optionId, null);
      }
    } else if (value.id === option.value) {
      resetValue(optionId);
    } else {
      setValue(optionId, value.id);
    }
  }

  if (error) return null;

  if (editing) {
    return (
      <Autocomplete
        openOnFocus
        blurOnSelect
        options={channels}
        value={currentChannel}
        onChange={(_, newValue) => onChange(newValue)}
        sx={{ width: 250 }}
        loading={isLoading || !channels}
        isOptionEqualToValue={(opt, value) => opt.id === value.id}
        getOptionLabel={(channel) => channel.name}
        getOptionDisabled={isOptionDisabled}
        onBlur={() => setEditing(false)}
        renderInput={(params) => <TextField {...params} autoFocus variant="standard" placeholder="Pick a channel" />}
        renderOption={(props, opt) => (
          <li {...props} key={opt.id}>
            <ChannelMention channel={opt} disabled={isOptionDisabled(opt)} indent />
          </li>
        )}
      />
    );
  }

  return (
    <ReadonlyChannelPicker currentChannel={currentChannel} onClick={() => setEditing(true)} />
  );
}

interface ReadonlyChannelPickerProps {
  currentChannel: GuildChannel | null;
  onClick: () => void;
}

function ReadonlyChannelPicker({ currentChannel, onClick }: ReadonlyChannelPickerProps) {
  return (
    <Button onClick={onClick} endIcon={<EditIcon />} sx={{ textTransform: "none", fontSize: "1rem", height: "32px" }}>
      {
        currentChannel === null
          ? <Typography color="gray" fontStyle="italic">Pick a channel</Typography>
          : <ChannelMention channel={currentChannel} />
      }
    </Button>
  );
}
