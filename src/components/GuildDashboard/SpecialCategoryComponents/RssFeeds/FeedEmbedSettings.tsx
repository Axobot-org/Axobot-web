import { MenuItem, Select, Stack, styled, Switch, TextField } from "@mui/material";
import { matchIsValidColor, MuiColorInput } from "mui-color-input";
import { useState } from "react";

import { RssFeed } from "../../../../repository/types/api";
import { SimpleParameterColumn, SimpleParameterRow } from "./shared";


interface FeedEmbedSettingsProps {
  feed: RssFeed;
  editFeed: (feed: RssFeed) => void;
}

export default function FeedEmbedSettings({ feed, editFeed }: FeedEmbedSettingsProps) {
  return (
    <Stack spacing={1}>
      <SimpleParameterRow label="Show date in footer">
        <ShowDateInFooterToggle feed={feed} editFeed={editFeed} />
      </SimpleParameterRow>
      <SimpleParameterRow label="Show link in title">
        <EnableLinkInTitleToggle feed={feed} editFeed={editFeed} />
      </SimpleParameterRow>
      <SimpleParameterRow label="Image location">
        <ImageLocationSelector feed={feed} editFeed={editFeed} />
      </SimpleParameterRow>
      <SimpleParameterRow label="Embed color">
        <EmbedColorEditor feed={feed} editFeed={editFeed} />
      </SimpleParameterRow>

      <SimpleParameterColumn label="Embed title">
        <EmbedTitleEditor feed={feed} editFeed={editFeed} />
      </SimpleParameterColumn>
      <SimpleParameterColumn label="Author text">
        <EmbedAuthorTextEditor feed={feed} editFeed={editFeed} />
      </SimpleParameterColumn>
      <SimpleParameterColumn label="Footer text">
        <EmbedFooterTextEditor feed={feed} editFeed={editFeed} />
      </SimpleParameterColumn>
    </Stack>
  );
}

function ShowDateInFooterToggle({ feed, editFeed }: FeedEmbedSettingsProps) {
  const currentValue = feed.embed.show_date_in_footer ?? true;
  function onChange() {
    editFeed({
      ...feed,
      embed: {
        ...feed.embed,
        "show_date_in_footer": !currentValue,
      },
    });
  }

  return (
    <Switch
      checked={currentValue}
      onChange={onChange}
    />
  );
}

function EnableLinkInTitleToggle({ feed, editFeed }: FeedEmbedSettingsProps) {
  const currentValue = feed.embed.enable_link_in_title ?? false;
  function onChange() {
    editFeed({
      ...feed,
      embed: {
        ...feed.embed,
        "enable_link_in_title": !currentValue,
      },
    });
  }

  return (
    <Switch
      checked={currentValue}
      onChange={onChange}
    />
  );
}

function ImageLocationSelector({ feed, editFeed }: FeedEmbedSettingsProps) {
  const possibleValues = ["thumbnail", "banner", "none"] as const;
  const currentValue = feed.embed.image_location ?? possibleValues[0];

  function valueIsValid(value: string): value is typeof possibleValues[number] {
    return possibleValues.includes(value as never);
  }

  function onChange(value: string) {
    if (valueIsValid(value)) {
      editFeed({
        ...feed,
        embed: {
          ...feed.embed,
          "image_location": value,
        },
      });
    }
  }

  return (
    <StyledSelect
      value={currentValue}
      onChange={(e) => onChange(e.target.value as string)}
      variant="standard"
    >
      {
        possibleValues.map((value) => (
          <MenuItem key={value} value={value}>{value}</MenuItem>
        ))
      }
    </StyledSelect>
  );
}

function EmbedTitleEditor({ feed, editFeed }: FeedEmbedSettingsProps) {
  function onChange(value: string) {
    editFeed({
      ...feed,
      embed: {
        ...feed.embed,
        title: value || undefined,
      },
    });
  }

  return (
    <TextField
      value={feed.embed.title ?? ""}
      onChange={(e) => onChange(e.target.value)}
      variant="standard"
      style={{ marginTop: 0 }}
      placeholder="Leave empty to use the post title"
      slotProps={{
        htmlInput: { maxLength: 250 },
      }}
    />
  );
}

function EmbedAuthorTextEditor({ feed, editFeed }: FeedEmbedSettingsProps) {
  function onChange(value: string) {
    editFeed({
      ...feed,
      embed: {
        ...feed.embed,
        "author_text": value || undefined,
      },
    });
  }

  return (
    <TextField
      value={feed.embed.author_text ?? ""}
      onChange={(e) => onChange(e.target.value)}
      variant="standard"
      style={{ marginTop: 0 }}
      slotProps={{
        htmlInput: { maxLength: 250 },
      }}
    />
  );
}

function EmbedFooterTextEditor({ feed, editFeed }: FeedEmbedSettingsProps) {
  function onChange(value: string) {
    editFeed({
      ...feed,
      embed: {
        ...feed.embed,
        "footer_text": value || undefined,
      },
    });
  }

  return (
    <TextField
      value={feed.embed.footer_text ?? ""}
      onChange={(e) => onChange(e.target.value)}
      variant="standard"
      style={{ marginTop: 0 }}
      slotProps={{
        htmlInput: { maxLength: 2000 },
      }}
    />
  );
}

function EmbedColorEditor({ feed, editFeed }: FeedEmbedSettingsProps) {
  const currentValueAsHex = "#" + (feed.embed.color?.toString(16).padStart(6, "0") ?? "000");
  const [lastCorrectValue, setLastCorrectValue] = useState(currentValueAsHex);

  function onChange(value: string) {
    let parsedValue: number | undefined = undefined;
    if (value !== "") {
      parsedValue = value.startsWith("#") ? parseInt(value.slice(1), 16) : parseInt(value, 16);
    }
    editFeed({
      ...feed,
      embed: {
        ...feed.embed,
        color: parsedValue,
      },
    });
    if (matchIsValidColor(value)) {
      setLastCorrectValue(value);
    }
  }

  return (
    <MuiColorInput
      value={currentValueAsHex}
      fallbackValue={lastCorrectValue}
      onChange={onChange}
      variant="standard"
      format="hex"
      isAlphaHidden
      sx={{ maxWidth: "7.5em" }}
    />
  );
}

const StyledSelect = styled(Select)({
  "& .MuiInputBase-input": {
    paddingLeft: 8,
  },
});

