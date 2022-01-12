import React from "react";
import { Button, Container, Typography, Stack } from "@mui/material";
import { navigate } from "@reach/router";

const HomePage = () => {
  return (
    <>
      <Container maxWidth="md">
        <Stack
          direction="column"
          spacing={2}
          sx={{ position: "relative", top: "100px", alignItems: "center" }}
        >
          <Typography variant="h4">Welcome to Nat's University</Typography>
          <div>
            <Button
              onClick={() => {
                navigate(`/studentList`);
              }}
              variant="outlined"
              sx={{
                maxWidth: "150px",
                fontSize: "15px",
                height: "auto",
                margin: "10px",
              }}
            >
              View Students
            </Button>
            <Button
              onClick={() => {
                navigate(`/subjectList`);
              }}
              variant="outlined"
              sx={{ maxWidth: "150px", fontSize: "15px", height: "auto" }}
            >
              View Subjects
            </Button>
          </div>
        </Stack>
      </Container>
    </>
  );
};

export default HomePage;
