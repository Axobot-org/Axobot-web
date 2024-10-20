import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import { Button, Paper, Snackbar, Stack, styled, Typography } from "@mui/material";
import { useEffect } from "react";

import { useGuildConfigEditionContext } from "../../repository/context/GuildConfigEditionContext";
import { usePatchGuildConfig } from "../../repository/redux/dispatchs/usePatchGuildConfig";
import { useIsOnMobile } from "../../styles/useIsOnMobile";


interface SaveConfigBannerProps {
  guildId: string;
}

export default function SaveConfigBanner({ guildId }: SaveConfigBannerProps) {
  const { patchGuildConfigCommand, putRoleRewardsCommand, loading, success } = usePatchGuildConfig();
  const { state, hasAnyUnsavedChange, resetState } = useGuildConfigEditionContext();
  const isOnMobile = useIsOnMobile();

  function saveConfiguration() {
    if (Object.keys(state.baseOptions).length > 0) {
      patchGuildConfigCommand(guildId, state.baseOptions);
    }
    if (state.roleRewards !== undefined) {
      putRoleRewardsCommand(guildId, state.roleRewards);
    }
  }

  useEffect(() => {
    if (success) {
      resetState();
    }
  }, [success, resetState]);

  const buttonSize = isOnMobile ? "small" : "medium";

  return (
    <Snackbar
      // somehow 'horizontal: left' with sticky position centers the banner
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={hasAnyUnsavedChange}
      sx={{
        width: { xs: "95vw", md: "70vw" },
        maxWidth: "900px",
        marginTop: "24px",
        position: "sticky",
      }}
    >
      <SnackbarContent elevation={5}>
        <Stack>
          <Typography variant="h6">
            <SyncProblemIcon color="warning" sx={{ verticalAlign: "sub" }} /> Unsaved changes
          </Typography>
          <Typography variant="subtitle2" color="gray">
            You have unsaved changes in the configuration. They won't be applied until you save them.
          </Typography>
        </Stack>
        <ActionsStack direction="row">
          <Button size={buttonSize} disabled={loading} variant="contained" onClick={saveConfiguration}>Save</Button>
          <DiscardButton size={buttonSize} disabled={loading} onClick={resetState} >Discard</DiscardButton>
        </ActionsStack>
      </SnackbarContent>
    </Snackbar>
  );
}

const SnackbarContent = styled(Paper)(({ theme }) => ({
  display: "flex",
  flex: 1,
  gap: theme.spacing(2),
  justifyContent: "space-between",
  padding: theme.spacing(2, 3),
  borderRadius: 3,
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const ActionsStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

const DiscardButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.dark,
}));