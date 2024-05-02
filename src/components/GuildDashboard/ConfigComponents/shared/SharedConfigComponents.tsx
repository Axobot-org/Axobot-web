import { Stack, styled, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

import { getGuildDashboardTranslations } from "../../../../i18n/i18n";

interface SimpleConfigurationProps {
  optionId: string;
}

export function SimpleConfiguration({ optionId, children }: PropsWithChildren<SimpleConfigurationProps>) {
  const translatedName = getGuildDashboardTranslations("option_name." + optionId);
  const translatedDescription = getGuildDashboardTranslations("option_description." + optionId);

  const optionName = translatedName.includes("option_name.") ? optionId : translatedName;
  const optionDescription = translatedDescription.includes("option_description.") ? undefined : translatedDescription;

  return (
    <Stack>
      <SimpleConfigurationRow>
        <ConfigurationName>{optionName}</ConfigurationName>
        {children}
      </SimpleConfigurationRow>
      <ConfigurationDescription>{optionDescription}</ConfigurationDescription>
    </Stack>
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