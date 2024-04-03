import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, styled, Typography } from "@mui/material";
import { useMemo } from "react";
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

  const avatarText = useMemo(() => {
    if (guild.icon) return undefined;
    // return first letter of each word in guild name
    return guild.name
      .split(" ")
      .map((word) => word[0])
      .join("");
  }, [guild.icon, guild.name]);

  return (
    <Container>
      <ActionArea {...{ component: Link, to: `/dashboard/${guild.id}` }}>
        {banner ? (
          <CardMedia component="img" height={BANNER_HEIGHT} image={banner} alt="guild banner" />
        ) : (
          <GuildColoredBannedContainer>
            <GuildColoredBanned url={icon} />
          </GuildColoredBannedContainer>
        )}
        <GuildAvatar src={icon}>{avatarText}</GuildAvatar>
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

const GuildColoredBannedContainer = styled(Box)({
  width: "100%",
  overflow: "hidden",
});

const GuildColoredBanned = styled(Box, {
  shouldForwardProp: (prop) => prop !== "url",
})<{url: string | undefined}>(({ theme, url }) => ({
  height: BANNER_HEIGHT,
  ...(url
    ? {
      backgroundImage: `url("${url}");`,
      backgroundSize: "cover",
      filter: "blur(50px)",
      transform: "scale(4)",
    }
    : {
      backgroundColor: theme.palette.custom.background3,
    }),
}));

const GuildAvatar = styled(Avatar)(({ theme }) => ({
  position: "absolute",
  top: BANNER_HEIGHT,
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: theme.spacing(7),
  height: theme.spacing(7),
  color: "white",
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