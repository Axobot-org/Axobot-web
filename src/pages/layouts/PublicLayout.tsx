import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Appbar from "../../components/common/Appbar";


export default function PublicLayout() {
  return (
    <Stack height="100%" alignItems="center">
      <Appbar />
      <Stack mx={{ xs: 3, md: "5%" }} maxWidth={{ xl: "1536px" }} alignItems="center">
        <Outlet />
      </Stack>
    </Stack>
  );
}