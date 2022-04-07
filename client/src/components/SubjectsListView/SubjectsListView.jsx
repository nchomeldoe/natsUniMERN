import React, { useEffect, useContext, useState } from "react";
import { Container, Typography, Stack } from "@mui/material";
import Loader from "react-loader-spinner";

import { ServiceContext } from "../../context/ServiceProvider";
import SubjectCard from "../SubjectCard/SubjectCard";
import AddSubjectModal from "../Modals/AddSubjectModal";

const SubjectsListView = () => {
  const {
    apiCalls: { fetchSubjects },
    subjects,
  } = useContext(ServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      fetchSubjects();
    } catch (err) {
      setIsError(true);
    }
    setIsLoading(false);
  }, [fetchSubjects]);

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
            {isLoading ? (
              <Loader type="Puff" color="#00BFFF" height={100} width={100} />
            ) : (
              subjects.map((subject) => (
                <SubjectCard key={`subject-${subject._id}`} subject={subject} />
              ))
            )}
          </div>
        </Stack>
      </Container>
    </>
  );
};

export default SubjectsListView;
