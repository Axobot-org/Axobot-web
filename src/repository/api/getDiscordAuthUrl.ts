export default function getDiscordAuthUrl() {
  const params = new URLSearchParams({
    "client_id": process.env.REACT_APP_DISCORD_CLIENT_ID,
    "redirect_uri": `${process.env.PUBLIC_URL}/discord-callback`,
    "response_type": "code",
    "scope": "identify guilds",
  });
  return "https://discord.com/api/oauth2/authorize?" + params;
}
