import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { GuildData } from "../../repository/types/guild";

interface GuildBoxProps {
  guild: GuildData;
}

const BANNER_HEIGHT = 110;

export default function GuildBox({ guild }: GuildBoxProps) {

  const icon = guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp` : undefined;
  const banner = guild.banner
    ? `https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}.webp`
    : guild.splash
      ? `https://cdn.discordapp.com/splashes/${guild.id}/${guild.splash}.webp`
      : undefined;

  return (
    <Container>
      <ActionArea {...{ component: Link, to: `/dashboard/${guild.id}` }}>
        {banner ? (
          <CardMedia component="img" height={BANNER_HEIGHT} image={banner} alt="guild banner" />
        ) : (
          <GuildColoredBanned />
        )}
        <GuildAvatar src={icon} />
        <CardContentCentered>
          <GuildName name={guild.name} />
        </CardContentCentered>
      </ActionArea>
    </Container>
  );
}

const Container = styled(Card)({
  width: "13.75rem",
  height: "13.5rem",
});

const ActionArea = styled(CardActionArea)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const GuildColoredBanned = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: BANNER_HEIGHT,
  backgroundColor: theme.palette.custom.background3,
}));

const GuildAvatar = styled(Avatar)(({ theme }) => ({
  position: "absolute",
  top: BANNER_HEIGHT,
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: theme.spacing(7),
  height: theme.spacing(7),
  backgroundColor: theme.palette.background.paper,
  backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
}));

const CardContentCentered = styled(CardContent)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(4),
  display: "flex",
  overflow: "hidden",
}));

function GuildName({ name }: {name: string}) {
  return (
    <Typography gutterBottom variant="h6" textAlign="center" alignSelf="center">
      {name}
    </Typography>
  );
}