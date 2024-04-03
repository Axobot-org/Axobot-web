import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, styled, Typography } from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";

import getBotInviteUrl from "../../repository/getBotInviteUrl";
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
      <ActionArea {...{ component: Link, to: `/dashboard/${guild.id}` }} disabled={!guild.isBotPresent}>
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
      {!guild.isBotPresent && <InviteButton guildId={guild.id} />}
    </Container>
  );
}

const Container = styled(Card)(({ theme }) => ({
  position: "relative",
  width: "13.75rem",
  height: "13.5rem",

  "&:hover .invite-button, &:active .invite-button": {
    visibility: "visible",
  },

  [theme.breakpoints.down("sm")]: {
    width: "calc(50% - 36px)",
  },
  [theme.breakpoints.down(510)]: {
    width: "75%",
  },
}));

const ActionArea = styled(CardActionArea)(({ disabled }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s",

  ...(disabled
    ? {
      opacity: 0.5,
    }
    : {
      "&:hover": {
        transform: "scale(1.02)",
      },
    }),
}));

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

function InviteButton({ guildId }: {guildId: string}) {
  const url = getBotInviteUrl(guildId);

  return <Button
    sx={{
      visibility: "hidden",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      whiteSpace: "nowrap",
    }}
    className="invite-button"
    variant="contained"
    color="primary"
    href={url}
    target="_blank"
  >
    Invite Axobot
  </Button>;
}