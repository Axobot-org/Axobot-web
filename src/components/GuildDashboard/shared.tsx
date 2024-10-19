import { CircularProgress, Stack, styled, Typography } from "@mui/material";

export function ErrorPage({ title, message }: {title: string, message: string}) {
  return (
    <TextPageContainer>
      <Typography variant="h6">
        {title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" fontStyle="italic" textAlign="center">
        {message}
      </Typography>
    </TextPageContainer>
  );
}

export function LoadingPlaceholder() {
  return (
    <TextPageContainer>
      <CircularProgress color="primary" aria-label="Loading guild configuration" />
    </TextPageContainer>
  );
}

const TextPageContainer = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
  alignItems: "center",
}));