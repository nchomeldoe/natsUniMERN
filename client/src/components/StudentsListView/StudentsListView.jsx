import React, { useEffect, useContext, useState } from "react";
import { Button, Container, Typography, Stack } from "@mui/material";
import Loader from "react-loader-spinner";
import { navigate } from "@reach/router";

import { ServiceContext } from "../../context/ServiceProvider";
import StudentCard from "../StudentCard/StudentCard";
import ErrorPage from "../ErrorPage/ErrorPage";

const StudentsListView = () => {
  const {
    apiCalls: { fetchStudents },
    students,
    error,
    setError,
  } = useContext(ServiceContext);

  useEffect(() => {
    setIsLoading(true);
    fetchStudents();
    setIsLoading(false);
    return () => setError({});
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => navigate(`/newStudent`);

  return (
    <>
      {error.fetchStudentsError ? (
        <ErrorPage />
      ) : (
        <Container maxWidth="md">
          <Stack
            direction="column"
            spacing={2}
            sx={{ position: "relative", top: "100px", alignItems: "center" }}
          >
            <Typography variant="h5">Students</Typography>
            <Button
              onClick={handleClick}
              variant="outlined"
              sx={{ maxWidth: "150px", fontSize: "10px", height: "auto" }}
            >
              Create New
            </Button>
            <div>
              {isLoading ? (
                <Loader type="Puff" color="#00BFFF" height={100} width={100} />
              ) : (
                students.map((student) => (
                  <StudentCard
                    key={`student-${student.id}`}
                    student={student}
                  />
                ))
              )}
            </div>
          </Stack>
        </Container>
      )}
    </>
  );
};

export default StudentsListView;
