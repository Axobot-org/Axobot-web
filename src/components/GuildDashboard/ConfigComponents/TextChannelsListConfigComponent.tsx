import { Autocomplete, TextField } from "@mui/material";
import { ChannelType } from "discord-api-types/v10";
import { useMemo } from "react";

import { useGuildConfigEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { useFetchGuildChannelsQuery } from "../../../repository/redux/api/api";
import { GuildChannel } from "../../../repository/types/guild";
import { TextChannelsListOptionRepresentation } from "../../../repository/types/guild-config-types";
import ChannelMention from "../../common/ChannelMention";
import { ComplexConfiguration } from "./shared/SharedConfigComponents";
import useIsConfigEdited from "./shared/useIsConfigEdited";

interface TextChannelsListConfigComponentProps {
  optionId: string;
  option: TextChannelsListOptionRepresentation & {value: unknown};
  guildId: string;
}

function isArrayOfString(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

function findChannel(channels: GuildChannel[], channelId: string): GuildChannel {
  return channels.find((channel) => channel.id === channelId) ?? {
    id: channelId,
    name: channelId,
    type: ChannelType.GuildText,
    isText: true,
    isVoice: false,
    isThread: false,
    isNSFW: false,
    position: null,
    parentId: null,
  };
}

export default function TextChannelsListConfigComponent({ optionId, option, guildId }: TextChannelsListConfigComponentProps) {
  const { state, setValue, resetValue } = useGuildConfigEditionContext();
  const isEdited = useIsConfigEdited(optionId);
  const { data, isLoading, error } = useFetchGuildChannelsQuery({ guildId });

  const channels = useMemo(() => (
    data?.filter((channel) => {
      if (channel.isVoice) return false;
      if (!option.allow_threads && channel.isThread) return false;
      if (!option.allow_announcement_channels && channel.type === ChannelType.GuildAnnouncement) return false;
      if (!option.allow_non_nsfw_channels && !channel.isNSFW) return false;
      return true;
    }) ?? []
  ), [data, option.allow_announcement_channels, option.allow_non_nsfw_channels, option.allow_threads]);

  if (option.value !== null && !isArrayOfString(option.value)) {
    console.error("TextChannelsListConfigComponent: option value is not an array of string", option.value);
    return null;
  }

  function isOptionDisabled(channel: GuildChannel) {
    return channel.type === ChannelType.GuildCategory || channel.type === ChannelType.GuildForum || channel.type === ChannelType.GuildMedia;
  }

  const currentValue = isEdited ? state[optionId] as string[] : option.value;
  const currentChannels = currentValue?.map((channelId) => findChannel(channels, channelId)) ?? [];

  function onChange(value: GuildChannel[]) {
    if (value.length === 0) {
      if (option.value === null) {
        resetValue(optionId);
      } else {
        setValue(optionId, null);
      }
    } else if (value.map((channel) => channel.id) === option.value) {
      resetValue(optionId);
    } else {
      setValue(optionId, value.map((channel) => channel.id));
    }
  }

  return (
    <ComplexConfiguration optionId={optionId}>
      {!error && (
        <Autocomplete
          multiple
          openOnFocus
          options={channels}
          value={currentChannels}
          loading={isLoading || !channels}
          getOptionLabel={(channel) => channel.name}
          getOptionDisabled={(opt) => isOptionDisabled(opt) || currentChannels.length >= option.max_count}
          onChange={(_, newValue) => onChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              placeholder={currentChannels.length === 0 ? "Pick channels" : undefined}
            />
          )}
          renderOption={(props, opt) => (
            <li {...props} key={opt.id}>
              <ChannelMention channel={opt} disabled={isOptionDisabled(opt)} indent />
            </li>
          )}
          renderTags={(value, getTagProps) => value.map((channel, index) => (
            <ChannelMention channel={channel} {...getTagProps({ index })}/>
          ))}
          sx={{
            "& .MuiInput-root": {
              paddingBottom: "5px",
            },
          }}
        />
      )}
    </ComplexConfiguration>
  );
}
