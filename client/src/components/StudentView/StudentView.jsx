import React, { useEffect, useState, useContext } from "react";
import { Container, Typography, Stack } from "@mui/material";
import { useMatch } from "@reach/router";
import Loader from "react-loader-spinner";

import StudentForm from "../StudentForm/StudentForm";
import { NotificationContext } from "../../context/NotificationProvider";

const StudentView = () => {
  const { studentId } = useMatch("/student/:studentId");
  const [student, setStudent] = useState(null);
  const { setSnack } = useContext(NotificationContext);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/students/${studentId}`
        );
        if (!res.ok) {
          throw res;
        }
        const data = await res.json();
        setStudent(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudentData();
  }, [studentId]);

  const handleSubmit = async (values) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/students/${studentId}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (res.ok) {
        setSnack({
          message: `${values.firstName} ${values.lastName} has been updated!`,
          severity: "success",
          open: true,
        });
        window.location.reload();
      } else {
        const error = await res.json();
        setSnack({
          message: error.message,
          severity: "error",
          open: true,
        });
      }
    } catch (err) {
      setSnack({
        message: "Sorry, there was an error! Please try again.",
        severity: "error",
        open: true,
      });
      console.error(err);
    }
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
