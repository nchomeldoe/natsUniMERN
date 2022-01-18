import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const SubjectCard = ({ subject }) => {
  console.log("sub", subject);
  const { name } = subject;
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
          <IconButton>
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      </Card>
    </div>
  );
};

export default SubjectCard;
