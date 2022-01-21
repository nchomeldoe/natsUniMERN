import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

import DeleteSubjectModal from "../Modals/DeleteSubjectModal";

const SubjectCard = ({ subject, fetchSubjects }) => {
  const { name, _id } = subject;
  return (
    <div>
      <Card sx={{ mb: "5px", minWidth: "250px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CardContent>
            <Typography variant="h5">{name}</Typography>
          </CardContent>

          <DeleteSubjectModal
            subjectName={name}
            subjectId={_id}
            fetchSubjects={fetchSubjects}
          />
        </Box>
      </Card>
    </div>
  );
};

export default SubjectCard;
