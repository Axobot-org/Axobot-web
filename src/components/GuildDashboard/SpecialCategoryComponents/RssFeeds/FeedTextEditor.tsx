import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";

import { RssFeed } from "../../../../repository/types/api";

interface FeedTextEditorProps {
  feed: RssFeed;
  editFeed: (feed: RssFeed) => void;
}

export default function FeedTextEditor({ feed, editFeed }: FeedTextEditorProps) {
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
