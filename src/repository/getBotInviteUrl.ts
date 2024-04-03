export default function getBotInviteUrl(guildId: string | undefined = undefined) {
  const params = new URLSearchParams({
    "client_id": import.meta.env.VITE_DISCORD_CLIENT_ID,
    "scope": "bot",
  });
  if (guildId) {
    params.set("guild_id", guildId);
  }
  return "https://discord.com/api/oauth2/authorize?" + params;
}