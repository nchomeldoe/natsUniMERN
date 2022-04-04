import React, { useEffect, useContext } from "react";
import { Container, Typography, Stack } from "@mui/material";
import Loader from "react-loader-spinner";

import { ServiceContext } from "../../context/ServiceProvider";
import SubjectCard from "../SubjectCard/SubjectCard";
import AddSubjectModal from "../Modals/AddSubjectModal";

const SubjectsListView = () => {
  const { apiCalls, subjects } = useContext(ServiceContext);
  useEffect(() => {
    apiCalls.fetchSubjects();
  }, [apiCalls]);

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
            <AddSubjectModal />
          </div>
          <div>
            {subjects ? (
              subjects.map((subject) => (
                <SubjectCard key={`subject-${subject._id}`} subject={subject} />
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
