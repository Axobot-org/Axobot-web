import EditIcon from "@mui/icons-material/Edit";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { ChannelType } from "discord-api-types/v10";
import { useMemo, useState } from "react";

import { useConfigComponentContext } from "../../../repository/context/ConfigComponentContext";
import { useGuildConfigBaseOptionEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { useFetchGuildChannelsQuery } from "../../../repository/redux/api/api";
import { GuildChannel, PopulatedOption } from "../../../repository/types/guild";
import { CategoryOptionRepresentation } from "../../../repository/types/guild-config-types";
import ChannelMention from "../../common/ChannelMention";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";
import useIsConfigEdited from "./shared/useIsConfigEdited";


interface CategoryConfigComponentProps {
  optionId: string;
  option: PopulatedOption<CategoryOptionRepresentation>;
}

export default function CategoryConfigComponent({ optionId, option }: CategoryConfigComponentProps) {
  const { guildId, state, setValue, resetValue } = useGuildConfigBaseOptionEditionContext();
  const { isDisabled } = useConfigComponentContext();
  const isEdited = useIsConfigEdited(optionId);
  const { data, isLoading, error } = useFetchGuildChannelsQuery({ guildId });
  const [editing, setEditing] = useState(false);

  const categories = useMemo(() => (
    data?.filter((channel) => channel.type === ChannelType.GuildCategory) ?? []
  ), [data]);

  if (option.value !== null && typeof option.value !== "string") {
    console.error("CategoryConfigComponent: option value is not a string", option.value);
    return null;
  }

  const currentValue = isEdited ? state[optionId] as string : option.value;
  const currentCategory: GuildChannel | null = (
    categories.find((category) => category.id === currentValue)
    || (
      currentValue === null ? null : {
        id: currentValue,
        name: currentValue,
        type: ChannelType.GuildCategory,
        isText: false,
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

  return (
    <SimpleConfiguration optionId={optionId}>
      {!error && (
        (editing && !isDisabled)
          ? <Autocomplete
            openOnFocus
            blurOnSelect
            options={categories}
            value={currentCategory}
            onChange={(_, newValue) => onChange(newValue)}
            sx={{ width: 250 }}
            loading={isLoading || !categories}
            isOptionEqualToValue={(opt, value) => opt.id === value.id}
            getOptionLabel={(category) => category.name}
            onBlur={() => setEditing(false)}
            renderInput={(params) => <TextField {...params} autoFocus variant="standard" placeholder="Pick a category" />}
            renderOption={(props, opt) => (
              <li {...props} key={opt.id}>
                <ChannelMention channel={opt} />
              </li>
            )}
          />
          : <ReadonlyChannelPicker currentCategory={currentCategory} onClick={() => setEditing(!isDisabled)} />
      )}
    </SimpleConfiguration>
  );
}

interface ReadonlyChannelPickerProps {
  currentCategory: GuildChannel | null;
  onClick: () => void;
}

function ReadonlyChannelPicker({ currentCategory, onClick }: ReadonlyChannelPickerProps) {
  return (
    <Button onClick={onClick} endIcon={<EditIcon />} sx={{ textTransform: "none", fontSize: "1rem", height: "32px" }}>
      {
        currentCategory === null
          ? <Typography color="gray" fontStyle="italic">Pick a category</Typography>
          : <ChannelMention channel={currentCategory} />
      }
    </Button>
  );
}
