import { Box, Button, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";

import BotGuildCounter from "../components/Home/BotGuildCounter";
import { ExternalRoutesURLs } from "../router/router";

export default function Home() {
  return (
    <Fragment>
      <Typography my={2} variant="h2" noWrap>Axobot</Typography>
      <Typography
        variant="h5"
        fontWeight="500"
        color="primary"
        textAlign="center"
      >
        Your friendliest Discord bot
      </Typography>

      <Typography mt="5%">
        Meet Axobot, your Discord's best friend!
        <br />
        <br />
        This versatile bot combines moderation, RSS tracking, XP systems, Twitch alerts, games, and wayyy more.
        With a fun-loving axolotl personality and interactive features,
        Axobot is here to elevate your server's potential!
      </Typography>

      <Box mt={8}>
        <BotGuildCounter />
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} gap={3} mt={5} mb={8}>
        <Button variant="contained" target="_blank" href={ExternalRoutesURLs.botInvite}>
          Invite Axobot
        </Button>

        <Button variant="contained" color="secondary" component={Link} to="/dashboard">
          Open Dashboard
        </Button>
      </Stack>
    </Fragment>
  );
}

export const Component = Home;
