import { Stack, Toolbar } from "@mui/material";
import { PropsWithChildren } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";

import Appbar from "../../components/common/Appbar";
import Footer from "../../components/common/Footer";
import { getMetaTagsFromURL } from "../../router/getMetaTags";

function DynamicHelmet() {
  const location = useLocation();
  const strippedPathName = location.pathname.replace(/^\/|\/$/, "");
  return <Helmet prioritizeSeoTags>{getMetaTagsFromURL(strippedPathName)}</Helmet>;
}

export function PublicLayout({ children }: PropsWithChildren) {
  return (
    <Stack height="100vh" alignItems="center">
      <DynamicHelmet />
      <Appbar />
      <Toolbar />
      <Stack px={{ xs: 3, md: "5%" }} maxWidth={{ xs: "100%", xl: "1536px" }} alignItems="center" flex={1}>
        {children}
      </Stack>
      <Footer />
    </Stack>
  );
}


export default function RouterPublicLayout() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}