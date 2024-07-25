import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import LaunchIcon from "@mui/icons-material/Launch";
import { Button, Divider, Link, Stack, Typography } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";

import csvToJson from "../../../repository/convertCsvToJson";
import { isLeaderboardImport, parseLeaderboardImport } from "../../../repository/types/checks";

interface XpCategoryComponentProps {
  guildId: string;
}

export default function XpCategoryComponent({ guildId }: XpCategoryComponentProps) {
  return (
    <Fragment>
      <Divider sx={{ my: 1 }} />
      <Stack px={2} gap={1}>
        <Typography fontSize="1.2rem">Leaderboard actions</Typography>
        <Stack gap={2} direction={{ xs: "column", sm: "row" }}>
          <Button
            component={Link}
            target="_blank"
            variant="outlined"
            href={`/leaderboard/${guildId}`}
            endIcon={<LaunchIcon />}
          >
            View Leaderboard
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<DownloadIcon />}
          >
            Download as JSON
          </Button>
          <UploadButton guildId={guildId} />
        </Stack>
      </Stack>
    </Fragment>
  );
}

function UploadButton({ guildId }: XpCategoryComponentProps) {
  const [loading, setLoading] = useState(false);
  const inputFile = useRef<HTMLInputElement | null>(null);

  const onButtonClick = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      // when file content is read
      if (typeof e.target?.result === "string") {
        const rawContent = e.target.result;
        // check that content is less than 1MB
        if (rawContent.length > 1024 * 1024) {
          alert("File is too large. Max size is 1MB.");
          setLoading(false);
          return;
        }
        try {
          const content = parseImportFile(file, rawContent);
          console.log(`leaderboard of guild ${guildId}`, content);
        } catch (err) {
          console.error(err);
          alert("Invalid file format!");
        }
      }
      setLoading(false);
    };
    reader.onerror = (e) => {
      console.error(e);
      setLoading(false);
    };
    reader.readAsText(file);
  };

  return (
    <Fragment>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<CloudUploadIcon />}
        onClick={onButtonClick}
        disabled={loading}
      >
        Upload to database
      </Button>
      <input
        type="file"
        id="upload-leaderboard"
        accept=".json,.csv"
        ref={inputFile}
        onChange={onFileSelected}
        hidden
      />
    </Fragment>
  );
}

function parseImportFile(file: File, rawContent: string) {
  if (file.name.endsWith(".json")) {
    return parseLeaderboardImport(rawContent);
  }
  if (file.name.endsWith(".csv")) {
    const data = csvToJson(rawContent);
    console.log(data);
    if (isLeaderboardImport(data)) {
      return data;
    }
  }
  throw new Error("Unsupported file format");
}
