import { Typography } from "@mui/material";
import { Fragment } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import Appbar from "../../components/common/Appbar";

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <Fragment>
      <Appbar />
      <h1>Oops!</h1>
      <Typography my={1}>
        Sorry, an unexpected error has occurred
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" fontStyle="italic">
        {errorMessage}
      </Typography>
    </Fragment>
  );
}