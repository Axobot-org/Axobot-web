import { MenuItem, Select, Stack, styled } from "@mui/material";
import { ComponentProps, useState } from "react";

import { getGuildDashboardTranslations } from "../../../i18n/i18n";
import { useConfigComponentContext } from "../../../repository/context/ConfigComponentContext";
import { useGuildConfigBaseOptionEditionContext } from "../../../repository/context/GuildConfigEditionContext";
import { PopulatedOption } from "../../../repository/types/guild";
import { LevelupChannelOptionRepresentation } from "../../../repository/types/guild-config-types";
import { LargeConfiguration } from "./shared/SharedConfigComponents";
import TextChannelPicker from "./shared/TextChannelPicker";
import useIsConfigEdited from "./shared/useIsConfigEdited";

interface LevelupChannelConfigComponentProps {
  optionId: string;
  option: PopulatedOption<LevelupChannelOptionRepresentation>;
}

type TextChannelPickerOption = ComponentProps<typeof TextChannelPicker>["option"];
const SpecificChannelEnum = "specific channel";

export default function LevelupChannelConfigComponent({ optionId, option }: LevelupChannelConfigComponentProps) {
  const { state, setValue, resetValue } = useGuildConfigBaseOptionEditionContext();
  const { isDisabled } = useConfigComponentContext();
  const isEdited = useIsConfigEdited(optionId);

  const staticValues = ["none", "any", "dm"];
  const currentValue = isEdited ? state[optionId] : option.value;
  const valueIsChannelId = typeof currentValue === "string" && !staticValues.includes(currentValue);

  const [showChannelSelector, setShowChannelSelector] = useState(valueIsChannelId);

  if (typeof option.value !== "string") {
    console.error("LevelupChannelConfigComponent: option value is not a string", option.value);
    return null;
  }

  function onChange(value: string) {
    if (value === option.value) {
      resetValue(optionId);
    } else if (value === SpecificChannelEnum) {
      setValue(optionId, null);
    } else {
      setValue(optionId, value);
    }
    setShowChannelSelector(!staticValues.includes(value));
  }

  const currentEnumValue = showChannelSelector ? SpecificChannelEnum : currentValue;

  function translateEnum(value: string) {
    return getGuildDashboardTranslations(`enum.levelup_channel.${value}`);
  }

  const textChannelOption: TextChannelPickerOption = {
    "type": "text_channel",
    "default": null,
    "value": showChannelSelector && valueIsChannelId ? currentValue : null,
    "is_listed": true,
    "allow_announcement_channels": true,
    "allow_non_nsfw_channels": true,
    "allow_threads": true,
  };

  return (
    <LargeConfiguration optionId={optionId}>
      <Stack gap={1}>
        <StyledSelect
          value={currentEnumValue}
          onChange={(e) => onChange(e.target.value as string)}
          variant="standard"
          disabled={isDisabled}
        >
          {
            [...staticValues, SpecificChannelEnum].map((value) => (
              <MenuItem key={value} value={value}>{translateEnum(value)}</MenuItem>
            ))
          }
        </StyledSelect>
        {showChannelSelector && <TextChannelPicker optionId={optionId} option={textChannelOption} />}
      </Stack>
    </LargeConfiguration>
  );
}

const StyledSelect = styled(Select)({
  "& .MuiInputBase-input": {
    paddingLeft: 8,
  },
});
