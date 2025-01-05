import { MenuItem, Select, styled, Switch } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

import { RssFeed } from "../../../../repository/types/api";
import { SimpleParameterRow } from "./shared";


interface FeedEmbedSettingsProps {
  feed: RssFeed;
  editFeed: (feed: RssFeed) => void;
}

export default function FeedEmbedSettings({ feed, editFeed }: FeedEmbedSettingsProps) {
  return (
    <Fragment>
      <SimpleParameterRow label="Show date in footer">
        <ShowDateInFooterToggle feed={feed} editFeed={editFeed} />
      </SimpleParameterRow>
      <SimpleParameterRow label="Show link in title">
        <EnableLinkInTitleToggle feed={feed} editFeed={editFeed} />
      </SimpleParameterRow>
      <SimpleParameterRow label="Image location">
        <ImageLocationSelector feed={feed} editFeed={editFeed} />
      </SimpleParameterRow>
    </Fragment>
  );
}

function ShowDateInFooterToggle({ feed, editFeed }: FeedEmbedSettingsProps) {
  const currentValue = feed.embed.showDateInFooter ?? true;
  function onChange() {
    editFeed({
      ...feed,
      embed: {
        ...feed.embed,
        showDateInFooter: !currentValue,
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
  const currentValue = feed.embed.enableLinkInTitle ?? false;
  function onChange() {
    editFeed({
      ...feed,
      embed: {
        ...feed.embed,
        enableLinkInTitle: !currentValue,
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
  const currentValue = feed.embed.imageLocation ?? possibleValues[0];

  function valueIsValid(value: string): value is typeof possibleValues[number] {
    return possibleValues.includes(value as never);
  }

  function onChange(value: string) {
    if (valueIsValid(value)) {
      editFeed({
        ...feed,
        embed: {
          ...feed.embed,
          imageLocation: value,
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

const StyledSelect = styled(Select)({
  "& .MuiInputBase-input": {
    paddingLeft: 8,
  },
});
