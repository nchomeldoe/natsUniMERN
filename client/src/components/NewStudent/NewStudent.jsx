import React, { useContext } from "react";
import { Container, Typography, Stack } from "@mui/material";

import StudentForm from "../StudentForm/StudentForm";
import { ServiceContext } from "../../context/ServiceProvider";

const NewStudent = () => {
  const {
    apiCalls: { addStudent },
  } = useContext(ServiceContext);

  const initialValues = {
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    subjects: [],
  };

  const handleSubmit = async (values) => {
    addStudent(values);
  };

  return (
    <>
      <Container maxWidth="md">
        <Stack
          direction="column"
          spacing={2}
          sx={{ position: "relative", top: "100px", alignItems: "center" }}
        >
          <Typography variant="h5">New student</Typography>
        </Stack>
        <StudentForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
        />
      </Container>
    </>
  );
};

export default NewStudent;
