import { Stack, Typography } from "@mui/material";
import { lazy, Suspense } from "react";
import { Fragment } from "react/jsx-runtime";

import { useGuildConfigEditionContext } from "../../../../repository/context/GuildConfigEditionContext";
import { useFetchGuildConfigQuery, useFetchGuildRssFeedsQuery } from "../../../../repository/redux/api/api";
import { RssFeed } from "../../../../repository/types/api";
import { ErrorPage, LoadingPlaceholder } from "../../shared";
const FeedComponent = lazy(() => import("./FeedComponent"));

export default function RssFeedsComponent() {
  const { guildId } = useGuildConfigEditionContext();
  const { data, isLoading, error } = useFetchGuildRssFeedsQuery({ guildId });

  return (
    <Fragment>
      <PageTitle feeds={data} />
      <PageContent data={data} isLoading={isLoading} showErrorMessages={error !== undefined} />
    </Fragment>
  );
}

function PageTitle({ feeds }: { feeds: RssFeed[] | undefined }) {
  const { guildId } = useGuildConfigEditionContext();
  const { data: configData } = useFetchGuildConfigQuery({ guildId: guildId, categories: ["core"] });

  const maxFeeds = configData?.core?.["rss_max_number"] as number;

  let title = "RSS Feeds";
  if (feeds !== undefined) {
    if (maxFeeds) {
      title += ` (${feeds.length}/${maxFeeds})`;
    } else {
      title += ` (${feeds.length})`;
    }
  }

  return <Typography variant="h5" gutterBottom textAlign="center">{title}</Typography>;
}

function PageContent({ data, isLoading, showErrorMessages }: { data: RssFeed[] | undefined; isLoading: boolean; showErrorMessages: boolean }) {
  if (showErrorMessages) {
    if (isLoading) {
      return (
        <LoadingPlaceholder />
      );
    }

    return (
      <ErrorPage title="Oops, something went wrong!" message="Sorry, an unexpected error has occurred." />
    );
  }

  if (data === undefined) {
    return (
      <LoadingPlaceholder />
    );
  }

  if (data.length === 0) {
    return (
      <Typography variant="body1" textAlign="center">No feeds added yet.</Typography>
    );
  }

  const sortedFeed = data.toSorted((a, b) => (b.addedAt > a.addedAt ? -1 : 1));


  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <Stack spacing={{ xs: 3, md: 1 }}>
        {sortedFeed.map((feed) => (
          <FeedComponent key={feed.id} feed={feed} />
        ))}
      </Stack>
    </Suspense>
  );
}
