import EditIcon from "@mui/icons-material/Edit";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { ChannelType } from "discord-api-types/v10";
import { useMemo, useState } from "react";

import { useConfigComponentContext } from "../../../repository/context/ConfigComponentContext";
import { useGuildConfigEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { useFetchGuildChannelsQuery } from "../../../repository/redux/api/api";
import { GuildChannel, PopulatedOption } from "../../../repository/types/guild";
import { VoiceChannelOptionRepresentation } from "../../../repository/types/guild-config-types";
import ChannelMention from "../../common/ChannelMention";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";
import useIsConfigEdited from "./shared/useIsConfigEdited";


interface VoiceChannelConfigComponentProps {
  optionId: string;
  option: PopulatedOption<VoiceChannelOptionRepresentation>;
}

export default function VoiceChannelConfigComponent({ optionId, option }: VoiceChannelConfigComponentProps) {
  const { guildId, state, setValue, resetValue } = useGuildConfigEditionContext();
  const { isDisabled } = useConfigComponentContext();
  const isEdited = useIsConfigEdited(optionId);
  const { data, isLoading, error } = useFetchGuildChannelsQuery({ guildId });
  const [editing, setEditing] = useState(false);

  const channels = useMemo(() => {
    const allVoiceAndCategories = data?.filter((channel) => {
      if (!channel.isVoice && channel.type !== ChannelType.GuildCategory) return false;
      if (!option.allow_stage_channels && channel.type === ChannelType.GuildStageVoice) return false;
      if (!option.allow_non_nsfw_channels && !channel.isNSFW) return false;
      return true;
    }) ?? [];
    return allVoiceAndCategories.filter((channel) => {
      if (channel.type === ChannelType.GuildCategory && !allVoiceAndCategories.some((c) => c.parentId === channel.id)) return false;
      return true;
    });
  }, [data, option.allow_non_nsfw_channels, option.allow_stage_channels]);

  if (option.value !== null && typeof option.value !== "string") {
    console.error("VoiceChannelConfigComponent: option value is not a string", option.value);
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
        type: ChannelType.GuildVoice,
        isText: false,
        isVoice: true,
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

  return (
    <SimpleConfiguration optionId={optionId}>
      {!error && (
        (editing && !isDisabled)
          ? <Autocomplete
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
                <ChannelMention channel={opt} disabled={isOptionDisabled(opt)} disableColor={isOptionDisabled(opt)} indent />
              </li>
            )}
          />
          : <ReadonlyChannelPicker currentChannel={currentChannel} onClick={() => setEditing(!isDisabled)} />
      )}
    </SimpleConfiguration>
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
