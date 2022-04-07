import React from "react";
import { Container, Typography, Stack } from "@mui/material";

const ErrorPage = () => {
  return (
    <>
      <Container maxWidth="md">
        <Stack
          direction="column"
          spacing={2}
          sx={{ position: "relative", top: "300px", alignItems: "center" }}
        >
          <Typography variant="h5">
            Sorry, something has gone wrong...
          </Typography>
        </Stack>
      </Container>
    </>
  );
};

export default ErrorPage;
