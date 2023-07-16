import { Button, Typography } from "@mui/material";
import { Fragment } from "react";

import { ExternalRoutesURLs } from "../../router/router";

export default function NeedsLoginErrorPage() {

  return (
    <Fragment>
      <h1>Hey!</h1>
      <Typography my={1}>
        To access this page, you need to be logged in.
      </Typography>
      <Button variant="contained" href={ExternalRoutesURLs.discordAuth} sx={{ marginTop: 3 }}>Login</Button>
    </Fragment>
  );
}