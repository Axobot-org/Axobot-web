import { Stack, Typography } from "@mui/material";
import { lazy, Suspense, useCallback } from "react";
import { Fragment } from "react/jsx-runtime";

import { useGuildConfigEditionContext, useGuildConfigRssFeedsEditionContext } from "../../../../repository/context/GuildConfigEditionContext";
import { useFetchGuildConfigQuery, useFetchGuildRssFeedsQuery } from "../../../../repository/redux/api/api";
import { RssFeed } from "../../../../repository/types/api";
import { ErrorPage, LoadingPlaceholder } from "../../shared";
const FeedComponent = lazy(() => import("./FeedComponent"));

export default function RssFeedsComponent() {
  const { guildId } = useGuildConfigEditionContext();
  const { data, isLoading, error } = useFetchGuildRssFeedsQuery({ guildId });
  const { findFeedInState, editFeed: editStateFeed, unregisterFeed } = useGuildConfigRssFeedsEditionContext();

  const editFeed = useCallback((feed: RssFeed) => {
    const uneditedFeed = data?.find((f) => f.id === feed.id);
    if (uneditedFeed && compareFeeds(feed, uneditedFeed)) {
      unregisterFeed(feed.id);
    } else {
      editStateFeed(feed);
    }
  }, [data, editStateFeed, unregisterFeed]);

  if (error) {
    if (isLoading) {
      return (
        <Fragment>
          <PageTitle feeds={data} />
          <LoadingPlaceholder />
        </Fragment>
      );
    }

    console.error(error);
    return (
      <Fragment>
        <PageTitle feeds={data} />
        <ErrorPage title="Oops, something went wrong!" message="Sorry, an unexpected error has occurred." />
      </Fragment>
    );
  }

  if (data === undefined) {
    return (
      <Fragment>
        <PageTitle feeds={data} />
        <LoadingPlaceholder />
      </Fragment>
    );
  }

  const sortedFeed = data.map((feedFromApi): RssFeed => {
    const feedFromState = findFeedInState(feedFromApi.id) ?? {};
    return { ...feedFromApi, ...feedFromState };
  }).toSorted((a, b) => (b.addedAt > a.addedAt ? -1 : 1));


  return (
    <Fragment>
      <PageTitle feeds={data} />
      <Suspense fallback={<LoadingPlaceholder />}>
        <Stack gap={{ xs: 3, md: 1 }}>
          {sortedFeed.map((feed) => (
            <FeedComponent key={feed.id} feed={feed} editFeed={editFeed} />
          ))}
        </Stack>
      </Suspense>
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

function compareFeeds(a: RssFeed, b: RssFeed) {
  return Object.keys(a).every((key) => key in b && a[key as keyof RssFeed] === b[key as keyof RssFeed]);
}
