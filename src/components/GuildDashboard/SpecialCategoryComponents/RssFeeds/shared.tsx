import { InfoOutlined } from "@mui/icons-material";
import { Link, Stack, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

import { ExternalRoutesURLs } from "../../../../router/router";

export function SimpleParameterRow({ label, children }: PropsWithChildren<{ label: string }>) {
  return (
    <Stack direction="row" spacing={1} justifyContent="space-between" minHeight={40} alignItems="center">
      <Typography>{label}</Typography>
      {children}
    </Stack>
  );
}

export function SimpleParameterColumn({ label, documentationUrl, children }: PropsWithChildren<{ label: string; documentationUrl?: string }>) {
  return (
    <Stack direction="column" spacing={1} justifyContent="flex-start" alignItems="stretch">
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>{label}</Typography>
        {documentationUrl && (
          <Link href={`${ExternalRoutesURLs.documentation}/en/latest/${documentationUrl}`} target="_blank" title="Documentation" display="inline-flex">
            <InfoOutlined fontSize="small" color="info" />
          </Link>
        )}
      </Stack>
      {children}
    </Stack>
  );
}
