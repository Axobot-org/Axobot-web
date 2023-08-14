import { Box, Button, Link, Typography } from "@mui/material";

const LogoAndTitle = () => (
  <Button
    component={Link}
    href="/"
    color="inherit"
    mr={2}
    sx={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none", padding: "0px 8px" }}
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
  </Button>
);

export default LogoAndTitle;