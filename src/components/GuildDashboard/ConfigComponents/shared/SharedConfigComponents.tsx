import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import { Stack, styled, Tooltip, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

import { getGuildDashboardTranslations } from "../../../../i18n/i18n";
import useIsConfigEdited from "./useIsConfigEdited";

interface SimpleConfigurationProps {
  optionId: string;
}

export function SimpleConfiguration({ optionId, children }: PropsWithChildren<SimpleConfigurationProps>) {
  const isEdited = useIsConfigEdited(optionId);

  const translatedName = getGuildDashboardTranslations("option_name." + optionId);
  const translatedDescription = getGuildDashboardTranslations("option_description." + optionId);

  const optionName = translatedName.includes("option_name.") ? optionId : translatedName;
  const optionDescription = translatedDescription.includes("option_description.") ? undefined : translatedDescription;

  return (
    <Stack>
      <SimpleConfigurationRow position="relative">
        <ConfigurationName>
          {optionName}
          {isEdited && <EditedBadge />}
        </ConfigurationName>
        {children}
      </SimpleConfigurationRow>
      <ConfigurationDescription>{optionDescription}</ConfigurationDescription>
    </Stack>
  );
}

function EditedBadge() {
  return (
    <Tooltip title="This configuration has been edited and needs to be saved.">
      <Stack direction="row" gap={0.5} display="inline-flex" ml={1.5} sx={{ verticalAlign: "sub" }}>
        <SyncProblemIcon color="warning" fontSize="small" />
        <Typography component="span" variant="caption" color="text.secondary" sx={{ display: "inline-block" }}>Edited</Typography>
      </Stack>
    </Tooltip>
  );
}

const SimpleConfigurationRow = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
});

const ConfigurationName = styled(Typography)({
  display: "inline-block",
  fontWeight: "500",
  fontSize: "1.2rem",
});

const ConfigurationDescription = styled(Typography)(({ theme }) => ({
  display: "inline-block",
  fontSize: "1rem",
  fontStyle: "italic",
  color: theme.palette.text.secondary,
}));