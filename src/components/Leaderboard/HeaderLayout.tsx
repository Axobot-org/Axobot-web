import { Stack, Typography } from "@mui/material";
import React from "react";

interface HeaderLayoutProps {
  icon: React.ReactNode;
  name: string;
}

export default function HeaderLayout({ icon, name }: HeaderLayoutProps) {
  return (
    <Stack direction="row" alignItems="center" textAlign="center" my={2}>
      {icon}
      <Typography ml={2} variant="h4" noWrap>
        {name}
      </Typography>
    </Stack>
  );
}