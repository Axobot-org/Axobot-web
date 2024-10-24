import { Button, Typography } from "@mui/material";
import { Fragment } from "react";

import { ExternalRoutesURLs } from "../../router/router";
import DiscordMarkWhite from "../../svg/discord-mark.svg?react";

export default function NeedsLoginErrorPage() {
  return (
    <Fragment>
      <Typography variant="h1" mb={2}>Hey!</Typography>
      <Typography my={1}>
        To access this page, you need to log in with your Discord account.
      </Typography>
      <Button
        variant="contained"
        color="blurple"
        href={ExternalRoutesURLs.discordAuth}
        sx={{ marginTop: 3 }}
        startIcon={<DiscordMarkWhite fill="white" width={20} />}
      >
        Login with Discord
      </Button>
    </Fragment>
  );
}
