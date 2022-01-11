import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { navigate } from "@reach/router";

const NavBar = () => {
  return (
    <AppBar sx={{ backgroundColor: "black" }}>
      <Toolbar>
        <div style={{ cursor: "pointer" }}>
          <Typography variant="h4" onClick={() => navigate(`/`)}>
            Nat's University
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
