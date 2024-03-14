import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Appbar from "../../components/common/Appbar";


export default function PublicLayout() {
  return (
    <Stack height="100%" alignItems="center">
      <Appbar />
      <Stack px={{ xs: 3, md: "5%" }} maxWidth={{ xs: "100%", xl: "1536px" }} alignItems="center">
        <Outlet />
      </Stack>
    </Stack>
  );
}