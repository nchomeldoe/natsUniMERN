import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { navigate } from "@reach/router";

const NavBar = ({ signOut, user }) => {
  const { username } = user;
  return (
    <AppBar sx={{ backgroundColor: "black" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ cursor: "pointer" }}>
          <Typography variant="h4" onClick={() => navigate(`/`)}>
            Nat's University
          </Typography>
          <Typography>{username}</Typography>
        </div>
        <div>
          <Button
            variant="outlined"
            color="error"
            sx={{ color: "white", mr: 1 }}
            onClick={signOut}
          >
            Sign out
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
