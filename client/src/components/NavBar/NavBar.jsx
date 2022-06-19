import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { navigate } from "@reach/router";

const NavBar = ({ signOut }) => {
  const handleSignOut = () => {
    navigate(`/`);
    signOut();
  };

  return (
    <AppBar sx={{ backgroundColor: "black" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "80px",
        }}
      >
        <div style={{ cursor: "pointer" }}>
          <Typography variant="h4" onClick={() => navigate(`/`)}>
            Nat's University
          </Typography>
        </div>
        <div>
          <Button
            variant="outlined"
            color="error"
            sx={{ color: "white", mr: 1 }}
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
