const GuildLeaderboardUrl = /^leaderboard\/\d{17,20}$/;
const GuildDashboardUrl = /^dashboard\/\d{17,20}(\/\w+)?$/;

export function getMetaTagsFromURL(url: string) {
  const pageTitle = getTitleFromURL(url);
  const helmetProps = { "data-rh": true };
  switch (url) {
    case "leaderboard/global":
      return (
        <>
          <title>{"Axobot: " + pageTitle}</title>
          <meta property="og:title" content={pageTitle} {...helmetProps} />
          <meta property="og:url" content="https://axobot.xyz/leaderboard/global" {...helmetProps} />
        </>
      );
    case url.match(GuildLeaderboardUrl)?.[0]:
      return (
        <>
          <title>{"Axobot: " + pageTitle}</title>
          <meta property="og:title" content={pageTitle} {...helmetProps} />
          <meta property="og:url" content="https://axobot.xyz/leaderboard/global" {...helmetProps} />
        </>
      );
    case "dashboard":
      return (
        <>
          <title>{"Axobot: " + pageTitle}</title>
          <meta property="og:title" content={pageTitle} {...helmetProps} />
          <meta property="og:url" content="https://axobot.xyz/dashboard" {...helmetProps} />
        </>
      );
    case url.match(GuildDashboardUrl)?.[0]:
      return (
        <>
          <title>{"Axobot: " + pageTitle}</title>
          <meta property="og:title" content={pageTitle} {...helmetProps} />
        </>
      );
    case "terms":
      return (
        <>
          <title>Axobot: Terms of Use</title>
          <meta property="og:title" content="Terms of Use" {...helmetProps} />
        </>
      );
    case "privacy":
      return (
        <>
          <title>Axobot: Privacy Policy</title>
          <meta property="og:title" content="Privacy Policy" {...helmetProps} />
        </>
      );
    default:
      return (
        <>
          <title>{pageTitle}</title>
          <meta property="og:title" content={pageTitle} {...helmetProps} />
        </>
      );
  }
}

function getTitleFromURL(url: string) {
  switch (url) {
    case "leaderboard/global":
      return "Global Leaderboard";
    case url.match(GuildLeaderboardUrl)?.[0]:
      return "Server Leaderboard";
    case "dashboard":
      return "Your Dashboard";
    case url.match(GuildDashboardUrl)?.[0]:
      return "Server Dashboard";
    default:
      return "Axobot";
  }
}
