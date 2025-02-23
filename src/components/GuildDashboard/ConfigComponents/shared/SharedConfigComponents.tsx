import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import { Stack, styled, Tooltip, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

import { getGuildDashboardTranslations } from "../../../../i18n/i18n";
import { getMissingOptionRequirement, useConfigComponentContext } from "../../../../repository/context/ConfigComponentContext";
import useIsConfigEdited from "./useIsConfigEdited";

interface SimpleConfigurationProps {
  optionId: string;
}

export function SimpleConfiguration({ optionId, children }: PropsWithChildren<SimpleConfigurationProps>) {
  const isEdited = useIsConfigEdited(optionId);

  const optionName = getGuildDashboardTranslations("option_name." + optionId, optionId);
  const optionDescription = getGuildDashboardTranslations("option_description." + optionId, "");

  return (
    <ConfigComponentContainer>
      <SimpleConfigurationRow>
        <ConfigurationName>
          {optionName}
          {isEdited && <EditedBadge />}
          <MissingRequirementLabel />
        </ConfigurationName>
        {children}
      </SimpleConfigurationRow>
      <ConfigurationDescription>{optionDescription}</ConfigurationDescription>
    </ConfigComponentContainer>
  );
}

export function LargeConfiguration({ optionId, children }: PropsWithChildren<SimpleConfigurationProps>) {
  const isEdited = useIsConfigEdited(optionId);

  const optionName = getGuildDashboardTranslations("option_name." + optionId, optionId);
  const optionDescription = getGuildDashboardTranslations("option_description." + optionId, "");

  return (
    <ConfigComponentContainer direction={{ xs: "column", md: "row" }}>
      <Stack flex={1}>
        <ConfigurationName>
          {optionName}
          {isEdited && <EditedBadge />}
          <MissingRequirementLabel />
        </ConfigurationName>
        <ConfigurationDescription>{optionDescription}</ConfigurationDescription>
      </Stack>
      {children}
    </ConfigComponentContainer>
  );
}

export function ComplexConfiguration({ optionId, children }: PropsWithChildren<SimpleConfigurationProps>) {
  const isEdited = useIsConfigEdited(optionId);

  const optionName = getGuildDashboardTranslations("option_name." + optionId, optionId);
  const optionDescription = getGuildDashboardTranslations("option_description." + optionId, "");

  return (
    <ConfigComponentContainer>
      <ConfigurationName>
        {optionName}
        {isEdited && <EditedBadge />}
        <MissingRequirementLabel />
      </ConfigurationName>
      <ConfigurationDescription mb={1}>{optionDescription}</ConfigurationDescription>
      {children}
    </ConfigComponentContainer>
  );
}

function EditedBadge() {
  return (
    <Tooltip title="This configuration has been edited and needs to be saved.">
      <Stack direction="row" spacing={0.5} component="span" display="inline-flex" sx={{ verticalAlign: "sub" }}>
        <SyncProblemIcon color="warning" fontSize="small" />
        <Typography component="span" variant="caption" color="text.secondary" sx={{ display: "inline-block" }}>Edited</Typography>
      </Stack>
    </Tooltip>
  );
}

function MissingRequirementLabel() {
  const { option, isDisabled, config } = useConfigComponentContext();
  if (!isDisabled) return null;
  const missingRequirement = getMissingOptionRequirement(option, config);
  if (missingRequirement === null) return null;

  const optionName = getGuildDashboardTranslations("option_name." + missingRequirement.option);
  let message = `Missign requirement: '${optionName}'`;
  if ("to_be_defined" in missingRequirement) {
    message = `Requires '${optionName}' to be defined`;
  } else if ("to_be" in missingRequirement) {
    if (Array.isArray(missingRequirement.to_be)) {
      message = `Requires '${optionName}' to be one of: ${missingRequirement.to_be.join(", ")}`;
    } else if (typeof missingRequirement.to_be === "boolean") {
      message = `Requires '${optionName}' to be ${missingRequirement.to_be ? "enabled" : "disabled"}`;
    } else {
      message = `Requires '${optionName}' to be '${missingRequirement.to_be}'`;
    }
  }

  return (
    <Stack direction="row"component="span" display="inline-flex" sx={{ verticalAlign: "sub" }}>
      <PriorityHighIcon color="error" fontSize="small" />
      <Typography component="span" variant="caption" color="text.secondary" sx={{ display: "inline-block" }}>{message}</Typography>
    </Stack>
  );
}

const ConfigComponentContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderRadius: 15,
  transitionProperty: "background-color",
  transitionDuration: "150ms",

  "&:hover": {
    backgroundColor: theme.palette.custom.background1,
  },
}));

const SimpleConfigurationRow = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
});

const ConfigurationName = styled(Typography)(({ theme }) => ({
  display: "inline-flex",
  flexWrap: "wrap",
  fontWeight: "500",
  fontSize: "1.2rem",
  alignItems: "last baseline",
  rowGap: theme.spacing(0.5),
  columnGap: theme.spacing(1.5),
}));

const ConfigurationDescription = styled(Typography)(({ theme }) => ({
  display: "inline-block",
  fontSize: "1rem",
  fontStyle: "italic",
  color: theme.palette.text.secondary,
}));
