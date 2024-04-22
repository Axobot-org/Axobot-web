import { Stack } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";

import Appbar from "../../components/common/Appbar";
import { getMetaTagsFromURL } from "../../router/getMetaTags";

function DynamicHelmet() {
  const location = useLocation();
  const strippedPathName = location.pathname.replace(/^\/|\/$/, "");
  return <Helmet prioritizeSeoTags>{getMetaTagsFromURL(strippedPathName)}</Helmet>;
}


export default function PublicLayout() {
  return (
    <Stack height="100%" alignItems="center">
      <DynamicHelmet />
      <Appbar />
      <Stack px={{ xs: 3, md: "5%" }} maxWidth={{ xs: "100%", xl: "1536px" }} alignItems="center">
        <Outlet />
      </Stack>
    </Stack>
  );
}