import { Stack, Typography } from "@mui/material";

interface PageTitleProps {
  text: string;
  icon?: React.ReactNode;
}

export default function PageTitle({ text, icon }: PageTitleProps) {
  if (icon === undefined) {
    return (
      <Typography my={2} variant="h4" noWrap>
        {text}
      </Typography>
    );
  }

  return (
    <Stack direction="row" alignItems="center" textAlign="center" my={2}>
      {icon}
      <Typography ml={2} variant="h4" noWrap>
        {text}
      </Typography>
    </Stack>
  );
}