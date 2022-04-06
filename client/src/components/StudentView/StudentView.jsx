import React, { useEffect, useContext } from "react";
import { Container, Typography, Stack } from "@mui/material";
import { useMatch } from "@reach/router";
import Loader from "react-loader-spinner";

import StudentForm from "../StudentForm/StudentForm";
import { ServiceContext } from "../../context/ServiceProvider";

const StudentView = () => {
  const { studentId } = useMatch("/student/:studentId");

  const {
    apiCalls: { fetchStudentById, updateStudent },
    student,
    setStudent,
  } = useContext(ServiceContext);

  useEffect(() => {
    fetchStudentById(studentId);
    return () => setStudent(null);
  }, [studentId, setStudent]);

  const handleSubmit = async (values) => {
    updateStudent(studentId, values);
  };

  return (
    <>
      {student ? (
        <Container maxWidth="md">
          <Stack
            direction="column"
            spacing={2}
            sx={{ position: "relative", top: "100px", alignItems: "center" }}
          >
            <Typography variant="h5">Student view</Typography>
          </Stack>
          <StudentForm
            initialValues={student}
            handleSubmit={handleSubmit}
            isExistingStudent={true}
            studentId={studentId}
          />
        </Container>
      ) : (
        <Container maxWidth="md">
          <Stack
            sx={{ position: "relative", top: "100px", alignItems: "center" }}
          >
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              alignItems="center"
            />
          </Stack>
        </Container>
      )}
    </>
  );
};

export default StudentView;
