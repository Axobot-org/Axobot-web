import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import { useGuildConfigEditionContext } from "../../../../repository/context/GuildConfigEditionContext";
import { usePutGuildRssFeedMutation } from "../../../../repository/redux/api/api";

interface UnsavedFeedsConfirmationDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}
export default function UnsavedFeedsConfirmationDialog({ open, onCancel, onConfirm }: UnsavedFeedsConfirmationDialogProps) {
  const { guildId, state, setRssFeedsValue } = useGuildConfigEditionContext();
  const [editFeedMutation, { isLoading }] = usePutGuildRssFeedMutation();

  async function saveFeeds() {
    await Promise.all(state.editedRssFeeds?.map(
      (feed) => editFeedMutation({ guildId, feed })
    ) ?? []);
    setRssFeedsValue(undefined);
    onConfirm();
  }

  return (
    <Dialog maxWidth="xs" open={open} onClose={onCancel}>
      <DialogTitle>You have unsaved changes!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You have unsaved changes in the RSS feeds configuration. Do you want to save them before leaving?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="gray" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button color="primary" onClick={saveFeeds} disabled={isLoading}>Save</Button>
        <Button color="error" onClick={onConfirm} disabled={isLoading}>Close without saving</Button>
      </DialogActions>
    </Dialog>
  );
}
