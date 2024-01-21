import { Typography } from "@mui/material";
import { Fragment } from "react";


export default function Home() {
  return (
    <Fragment>
      <Typography my={2} variant="h2" noWrap>Axobot</Typography>
      <Typography variant="h5" fontWeight="500" color="primary" textAlign="center">Your friendliest Discord bot</Typography>

      <Typography mt="5%">
      Meet Axobot, your Discord's best friend!<br/><br/>
      This versatile bot combines moderation, RSS tracking, XP systems, Twitch alerts, games, and wayyy more. With a fun-loving axolotl personality and interactive features, Axobot is here to elevate your server's potential!
      </Typography>
    </Fragment>
  );
}
