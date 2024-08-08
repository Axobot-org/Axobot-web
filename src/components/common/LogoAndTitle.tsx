import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const LogoAndTitle = () => (
  <Button
    component={Link}
    to="/"
    color="inherit"
    sx={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none", mr: 2, padding: "0px 8px" }}
  >
    <Box sx={{ marginRight: "1rem", height: { xs: "2rem", sm: "3rem" } }}>
      <img
        src="/assets/logo96.webp"
        srcSet="/assets/logo96.webp 96w, /assets/logo64.webp 64w, /assets/logo128.webp 128w"
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
