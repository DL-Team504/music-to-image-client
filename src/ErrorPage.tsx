import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Stack
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      spacing={3}
    >
      <Typography variant="h1">Oops!</Typography>
      <Typography variant="body2">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body2" fontStyle="italic">
        {isRouteErrorResponse(error)
          ? error.statusText || error.status
          : "Unknown error message"}
      </Typography>
    </Stack>
  );
}
