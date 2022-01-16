import React from "react";
import { Card, CardContent, CardActionArea, Typography } from "@mui/material";

const SubjectCard = ({ subject }) => {
  const { name } = subject;
  return (
    <div>
      <Card sx={{ mb: "5px", minWidth: "250px" }}>
        <CardActionArea
          sx={{ color: "black", textDecoration: "none" }}
          //   onClick={handleClick}
        >
          <CardContent>
            <Typography variant="h5">{name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default SubjectCard;
