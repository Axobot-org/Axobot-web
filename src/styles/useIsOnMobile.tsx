import { useMediaQuery, useTheme } from "@mui/material";

export const useIsOnMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("md"));
};