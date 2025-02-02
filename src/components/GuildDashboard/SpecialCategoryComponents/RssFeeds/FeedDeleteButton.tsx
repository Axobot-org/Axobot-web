import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Fragment, useState } from "react";

import { getGuildDashboardTranslations } from "../../../../i18n/i18n";
import { useGuildConfigEditionContext } from "../../../../repository/context/GuildConfigEditionContext";
import { useDeleteGuildRssFeedMutation } from "../../../../repository/redux/api/api";
import { RssFeed } from "../../../../repository/types/api";

interface FeedDeleteButtonProps {
  feed: Pick<RssFeed, "id" | "type" | "link" | "displayName">;
}
export default function FeedDeleteButton({ feed }: FeedDeleteButtonProps) {
  const { guildId } = useGuildConfigEditionContext();
  const [deleteFeedMutation, { isLoading }] = useDeleteGuildRssFeedMutation();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  async function deleteCurrentFeed() {
    if (isLoading) return;
    await deleteFeedMutation({ guildId, feedId: feed.id });
    closeConfirmModal();
  }

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  return (
    <Fragment>
      <Button color="error" variant="outlined" onClick={openConfirmModal} startIcon={<DeleteIcon />}>
        Delete this feed
      </Button>
      <ConfirmationDialog open={isConfirmModalOpen} feed={feed} onCancel={closeConfirmModal} onConfirm={deleteCurrentFeed} />
    </Fragment>
  );
}


interface ConfirmationDialogProps {
  open: boolean;
  feed: FeedDeleteButtonProps["feed"];
  onCancel: () => void;
  onConfirm: () => void;
}
function ConfirmationDialog({ open, feed, onCancel, onConfirm }: ConfirmationDialogProps) {
  const feedType = getGuildDashboardTranslations("rss_type." + feed.type, feed.type);
  const description = `This action is irreversible. The ${feedType} feed '${feed.displayName ?? feed.link}' will be deleted forever.`;

  return (
    <Dialog maxWidth="xs" open={open} onClose={onCancel}>
      <DialogTitle>Are you sure you want to delete this feed?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="gray" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="error" onClick={onConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
