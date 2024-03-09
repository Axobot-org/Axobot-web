import { Button, Typography } from "@mui/material";
import { Fragment } from "react";

import { ExternalRoutesURLs } from "../../router/router";
import DiscordMarkWhite from "../../svg/discord-mark-white.svg?react";

export default function NeedsLoginErrorPage() {

  return (
    <Fragment>
      <h1>Hey!</h1>
      <Typography my={1}>
        To access this page, you need to log in with your Discord account.
      </Typography>
      <Button
        variant="contained"
        color="blurple"
        href={ExternalRoutesURLs.discordAuth}
        sx={{ marginTop: 3 }}
        startIcon={<DiscordMarkWhite width={20} />}
      >
        Login with Discord
      </Button>
    </Fragment>
  );
}