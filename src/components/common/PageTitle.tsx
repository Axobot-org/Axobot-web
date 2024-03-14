import { Stack, Typography } from "@mui/material";

interface PageTitleProps {
  text: string;
  icon?: React.ReactNode;
}

export default function PageTitle({ text, icon }: PageTitleProps) {
  if (icon === undefined) {
    return (
      <Title my={2} maxWidth="100%">
        {text}
      </Title>
    );
  }

  return (
    <Stack direction="row" alignItems="center" textAlign="center" my={2} maxWidth="100%">
      {icon}
      <Title ml={2}>
        {text}
      </Title>
    </Stack>
  );
}

const Title = (props: React.ComponentProps<typeof Typography>) => <Typography variant="h4" fontSize={{ xs: "1.75rem", sm: "2.125rem" }} noWrap {...props} />;
