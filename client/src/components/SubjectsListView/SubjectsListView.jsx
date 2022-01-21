import React, { useState, useEffect } from "react";
import { Container, Typography, Stack } from "@mui/material";
import Loader from "react-loader-spinner";

import SubjectCard from "../SubjectCard/SubjectCard";
import AddSubjectModal from "../Modals/AddSubjectModal";

const SubjectsListView = () => {
  const [subjects, setSubjects] = useState(null);
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

  useEffect(() => {
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
            <AddSubjectModal fetchSubjects={fetchSubjects} />
          </div>
          <div>
            {subjects ? (
              subjects.map((subject) => (
                <SubjectCard
                  key={`subject-${subject._id}`}
                  subject={subject}
                  fetchSubjects={fetchSubjects}
                />
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
