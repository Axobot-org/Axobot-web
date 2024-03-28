export default function getBotInviteUrl() {
  const params = new URLSearchParams({
    "client_id": import.meta.env.VITE_DISCORD_CLIENT_ID,
    "scope": "bot",
  });
  return "https://discord.com/api/oauth2/authorize?" + params;
}