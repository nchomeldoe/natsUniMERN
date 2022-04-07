import React, { useEffect, useContext, useState } from "react";
import { Container, Typography, Stack } from "@mui/material";
import Loader from "react-loader-spinner";

import { ServiceContext } from "../../context/ServiceProvider";
import SubjectCard from "../SubjectCard/SubjectCard";
import AddSubjectModal from "../Modals/AddSubjectModal";
import ErrorPage from "../ErrorPage/ErrorPage";

const SubjectsListView = () => {
  const {
    apiCalls: { fetchSubjects },
    subjects,
    error,
    setError,
  } = useContext(ServiceContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchSubjects();
    setIsLoading(false);
    return () => setError({});
  }, []);

  return (
    <>
      {error.fetchSubjectsError ? (
        <ErrorPage />
      ) : (
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
                  <SubjectCard
                    key={`subject-${subject._id}`}
                    subject={subject}
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

export default SubjectsListView;
