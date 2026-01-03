import { layout, route, type RouteConfig } from "@react-router/dev/routes";

import getBotInviteUrl from "./repository/getBotInviteUrl";
import getDiscordAuthUrl from "./repository/getDiscordAuthUrl";

export default [
  layout("./pages/layouts/PublicLayout.tsx", [
    route("/", "./pages/Home.tsx"),
    route("/terms", "./pages/legal/TOS.tsx"),
    route("/privacy", "./pages/legal/PrivacyPolicy.tsx"),
    route("/leaderboard/:id", "./pages/Leaderboard.tsx"),
    layout("./router/guards/UnAuthGuard.tsx", [
      route("/discord-callback", "./pages/DiscordLoginCallback.tsx"),
    ]),
    layout("./router/guards/AuthGuard.tsx", [
      route("/dashboard/", "./pages/Dashboard.tsx"),
      route("/dashboard/:id/*", "./pages/GuildDashboard.tsx"),
    ]),
  ]),
] satisfies RouteConfig;


export const ExternalRoutesURLs = {
  documentation: "https://axobot.rtfd.io",
  donate: "https://github.com/sponsors/ZRunner",
  supportServer: "https://discord.gg/mEBFnfujtX",
  discordAuth: getDiscordAuthUrl(),
  botInvite: getBotInviteUrl(),
};
