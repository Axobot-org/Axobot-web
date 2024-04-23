import { Stack, styled, Typography } from "@mui/material";

export const ConfigurationName = styled(Typography)({
  display: "inline-block",
  fontWeight: "500",
  fontSize: "1.2rem",
});

export const SimpleConfigurationContainer = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
});