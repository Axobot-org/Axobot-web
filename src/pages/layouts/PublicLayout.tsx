import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Appbar from "../../components/common/Appbar";


export default function PublicLayout() {
  return (
    <Stack height="100%" alignItems="center">
      <Appbar />
      <Outlet />
    </Stack>
  );
}