export default function getDiscordAuthUrl() {
  const params = new URLSearchParams({
    "client_id": import.meta.env.VITE_DISCORD_CLIENT_ID,
    "redirect_uri": `${import.meta.env.VITE_DISCORD_AUTH_REDIRECT}/discord-callback`,
    "response_type": "code",
    "scope": "identify guilds",
  });
  return "https://discord.com/api/oauth2/authorize?" + params;
}
