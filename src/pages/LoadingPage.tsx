import { CircularProgress, Stack, Typography } from "@mui/material";


export default function LoadingPage() {
  return (
    <Stack
      alignItems="center"
    >
      <Typography my={2}>
        We're loading your page, it shouldn't take long...
      </Typography>
      <CircularProgress color="primary" />
    </Stack>
  );
}