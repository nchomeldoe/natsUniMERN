import React from "react";
import { Card, CardContent, CardActionArea, Typography } from "@mui/material";
import { navigate } from "@reach/router";

const StudentCard = ({ student }) => {
  const { email, id, name } = student;

  const handleClick = () => navigate(`/student/${id}`);
  return (
    <div>
      <Card sx={{ mb: "5px", minWidth: "250px" }}>
        <CardActionArea
          sx={{ color: "black", textDecoration: "none" }}
          onClick={handleClick}
        >
          <CardContent>
            <Typography variant="h5">{name}</Typography>
            <Typography>{email}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default StudentCard;
