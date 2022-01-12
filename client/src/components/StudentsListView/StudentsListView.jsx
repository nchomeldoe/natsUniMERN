import React, { useEffect, useState } from "react";
import { Button, Container, Typography, Stack } from "@mui/material";
import Loader from "react-loader-spinner";
import { navigate } from "@reach/router";

import StudentCard from "../StudentCard/StudentCard";

const StudentsListView = () => {
  const [students, setStudents] = useState(null);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/students/");
        if (!res.ok) {
          throw res;
        }
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
  }, []);

  const handleClick = () => navigate(`/newStudent`);

  return (
    <>
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
            {students ? (
              students.map((student) => (
                <StudentCard key={`student-${student.id}`} student={student} />
              ))
            ) : (
              <Loader type="Puff" color="#00BFFF" height={100} width={100} />
            )}
          </div>
        </Stack>
      </Container>
    </>
  );
};

export default StudentsListView;
