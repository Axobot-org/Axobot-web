import { CircularProgress, Typography } from "@mui/material";
import { Fragment } from "react";


export default function LoadingPage() {
  return (
    <Fragment>
      <Typography my={2}>
        We're loading your page, it shouldn't take long...
      </Typography>
      <CircularProgress color="primary" />
    </Fragment>
  );
}