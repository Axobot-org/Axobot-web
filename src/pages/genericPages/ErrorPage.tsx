import { Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import { PublicLayout } from "../layouts/PublicLayout";

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    if (typeof error.data === "string") {
      errorMessage = error.data;
    } else {
      errorMessage = error.statusText;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <PublicLayout>
      <h1>Oops!</h1>
      <Typography variant="h6" my={1}>
        Sorry, an unexpected error has occurred
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" fontStyle="italic" textAlign="center">
        {errorMessage}
      </Typography>
    </PublicLayout>
  );
}