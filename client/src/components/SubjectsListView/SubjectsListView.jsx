import React, { useState, useEffect } from "react";
import { Container, Typography, Stack } from "@mui/material";
import Loader from "react-loader-spinner";

const SubjectsListView = () => {
  const [subjects, setSubjects] = useState(null);
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/subjects/");
        if (!res.ok) {
          throw res;
        }
        const data = await res.json();
        setSubjects(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <>
      <Container maxWidth="md">
        <Stack
          direction="column"
          spacing={2}
          sx={{ position: "relative", top: "100px", alignItems: "center" }}
        >
          <Typography variant="h5">Subjects</Typography>
          <div>
            {subjects ? (
              subjects.map((subject, i) => (
                <Typography key={`subject-${i}`}>{subject.name}</Typography>
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

export default SubjectsListView;
