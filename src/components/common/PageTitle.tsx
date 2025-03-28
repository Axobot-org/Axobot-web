import { Stack, styled, Typography } from "@mui/material";

interface PageTitleProps {
  text: string;
  icon?: React.ReactNode;
}

export default function PageTitle({ text, icon }: PageTitleProps) {
  if (icon === undefined) {
    return (
      <Title variant="h2" maxWidth="100%">
        {text}
      </Title>
    );
  }

  return (
    <TitleStack>
      {icon}
      <Title variant="h2">
        {text}
      </Title>
    </TitleStack>
  );
}

const TitleStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  columnGap: theme.spacing(2),
  alignItems: "center",
  textAlign: "center",
  maxWidth: "100%",
}));

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  fontSize: "2.125rem",
  margin: theme.spacing(3, 0),
  overflow: "hidden",
  textOverflow: "ellipsis",

  [theme.breakpoints.down("sm")]: {
    fontSize: "1.75rem",
    margin: theme.spacing(2, 0),
  },
}));
