import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";

import csvToJson from "../../../../repository/convertCsvToJson";
import { usePutGuildLeaderboardMutation } from "../../../../repository/redux/api/api";
import { LeaderboardAsJson } from "../../../../repository/types/api";
import { isLeaderboardImport, parseLeaderboardImport } from "../../../../repository/types/checks";
import { LeaderboardImport, LeaderboardUserImport } from "../../../../repository/types/leaderboard";

export default function UploadLeaderboardButton({ guildId }: {guildId: string}) {
  const [readingFile, setReadingFile] = useState(false);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const { loading: sending, sendNewLeaderboard } = useSendNewLeaderboard(guildId);

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
    setReadingFile(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      // when file content is read
      if (typeof e.target?.result === "string") {
        const rawContent = e.target.result;
        // check that content is less than 1MB
        if (rawContent.length > 1024 * 1024) {
          alert("File is too large. Max size is 1MB.");
          setReadingFile(false);
          return;
        }
        try {
          const content = parseImportFile(file, rawContent);
          if (window.confirm("Are you sure you want to upload this leaderboard? This will overwrite the current leaderboard.")) {
            sendNewLeaderboard(content);
          }
        } catch (err) {
          console.error(err);
          alert("Invalid file format!");
        }
      }
      setReadingFile(false);
    };
    reader.onerror = (e) => {
      console.error(e);
      setReadingFile(false);
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
        disabled={readingFile || sending}
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
  const fileExtension = file.name.toLowerCase().split(".").pop();
  if (fileExtension === "json") {
    return parseLeaderboardImport(rawContent);
  }
  if (fileExtension === "csv") {
    const data = csvToJson(rawContent);
    if (isLeaderboardImport(data)) {
      return data;
    }
  }
  throw new Error("Unsupported file format");
}

function useSendNewLeaderboard(guildId: string) {
  const [putMutation, { error, isLoading }] = usePutGuildLeaderboardMutation();

  function formatPlayerData(player: LeaderboardUserImport) {
    const xp = Number(player.xp);
    if ("user_id" in player) {
      return { "user_id": player.user_id, xp };
    }
    if ("userId" in player) {
      return { "user_id": player.userId, xp };
    }
    return { "user_id": player.id, xp };
  }

  function formatData(data: LeaderboardImport): LeaderboardAsJson {
    if (Array.isArray(data)) {
      return data.map(formatPlayerData);
    }
    if ("players" in data) {
      return data.players.map(formatPlayerData);
    }
    if ("levels" in data) {
      return data.levels.map(formatPlayerData);
    }
    throw new Error("Invalid data format");
  }

  function sendNewLeaderboard(data: LeaderboardImport) {
    putMutation({ guildId, players: formatData(data) });
  }

  return { sendNewLeaderboard, error, loading: isLoading };
}