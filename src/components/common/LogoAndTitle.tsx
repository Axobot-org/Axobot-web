import { Box, Link, Stack, Typography } from "@mui/material";

const LogoAndTitle = () => (
  <Stack
    component={Link}
    href="/"
    direction="row"
    alignItems="center"
    color="inherit"
    mr={2}
    flexGrow={{ xs: 1, sm: 0 }}
    sx={{ textDecoration: "none" }}
  >
    <Box sx={{ marginRight: "1rem", height: { xs: "2rem", sm: "3rem" } }}>
      <img
        src="/assets/logo128.png"
        alt="logo"
        style={{ height: "100%" }}
      />
    </Box>
    <Typography
      variant="h6"
      noWrap
      sx={{
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".2rem",
      }}
    >
            Axobot
    </Typography>
  </Stack>
);

export default LogoAndTitle;