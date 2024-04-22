export function getMetaTagsFromURL(url: string) {
  const pageTitle = getTitleFromURL(url);
  const helmetProps = { "data-rh": true };
  switch (url) {
  case "leaderboard/global":
    return (
      <>
        <title>Axobot: {pageTitle}</title>
        <meta property="og:title" content={pageTitle} {...helmetProps} />
        <meta property="og:url" content="https://axobot.xyz/leaderboard/global" {...helmetProps} />
      </>
    );
  case url.match(/^leaderboard\/\d{17,20}$/)?.[0]:
    return (
      <>
        <title>Axobot: {pageTitle}</title>
        <meta property="og:title" content={pageTitle} {...helmetProps} />
        <meta property="og:url" content="https://axobot.xyz/leaderboard/global" {...helmetProps} />
      </>
    );
  case "dashboard":
    return (
      <>
        <title>Axobot: {pageTitle}</title>
        <meta property="og:title" content={pageTitle} {...helmetProps} />
        <meta property="og:url" content="https://axobot.xyz/dashboard" {...helmetProps} />
      </>
    );
  case url.match(/^dashboard\/\d{17,20}$/)?.[0]:
    return (
      <>
        <title>Axobot: {pageTitle}</title>
        <meta property="og:title" content={pageTitle} {...helmetProps} />
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
  return;
}

function getTitleFromURL(url: string) {
  switch (url) {
  case "leaderboard/global":
    return "Global Leaderboard";
  case url.match(/^leaderboard\/\d{17,20}$/)?.[0]:
    return "Server Leaderboard";
  case "dashboard":
    return "Your Dashboard";
  case url.match(/^dashboard\/\d{17,20}$/)?.[0]:
    return "Server Dashboard";
  default:
    return "Axobot";
  }
}