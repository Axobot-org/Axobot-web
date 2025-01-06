import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import { Button } from "@mui/material";

import { useGuildConfigRssFeedsEditionContext } from "../../../../repository/context/GuildConfigEditionContext";

interface FeedDeleteButtonProps {
  feedId: string;
}
export default function FeedDeleteButton({ feedId }: FeedDeleteButtonProps) {
  const { deleteFeed, unDeleteFeed, isFeedMarkedForDeletion } = useGuildConfigRssFeedsEditionContext();

  const isMarkedForDeletion = isFeedMarkedForDeletion(feedId);
  const deleteCurrentFeed = () => deleteFeed(feedId);
  const restoreCurrentFeed = () => unDeleteFeed(feedId);


  if (isMarkedForDeletion) {
    return (
      <Button color="error" variant="outlined" onClick={restoreCurrentFeed} startIcon={<RestoreIcon />}>
        Restore this feed
      </Button>
    );
  } else {
    return (
      <Button color="error" variant="outlined" onClick={deleteCurrentFeed} startIcon={<DeleteIcon />}>
        Delete this feed
      </Button>
    );
  }
}
