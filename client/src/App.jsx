import { Amplify } from "aws-amplify";
import { Authenticator, Flex } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import React from "react";
import { Router } from "@reach/router";
import { Box, Typography } from "@mui/material";

import NavBar from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import StudentsListView from "./components/StudentsListView/StudentsListView";
import StudentView from "./components/StudentView/StudentView";
import NewStudent from "./components/NewStudent/NewStudent";
import NotificationProvider from "./context/NotificationProvider";
import SubjectsListView from "./components/SubjectsListView/SubjectsListView";
import ServiceProvider from "./context/ServiceProvider";
import { color } from "@mui/system";

const {
  REACT_APP_REGION,
  REACT_APP_USER_POOL_ID,
  REACT_APP_USER_POOL_WEB_CLIENT_ID,
} = process.env;

Amplify.configure({
  region: REACT_APP_REGION,
  userPoolId: REACT_APP_USER_POOL_ID,
  userPoolWebClientId: REACT_APP_USER_POOL_WEB_CLIENT_ID,
});

const App = () => {
  return (
    <Authenticator hideSignUp={true} components={{ Header }}>
      {({ signOut, user }) => (
        <NotificationProvider>
          <ServiceProvider>
            <NavBar signOut={signOut} />
            <Router>
              <HomePage user={user} path="/" />
              <StudentsListView path="/studentList" />
              <SubjectsListView path="/subjectList" />
              <StudentView path="/student/:studentId" />
              <NewStudent path="/newStudent" />
            </Router>
          </ServiceProvider>
        </NotificationProvider>
      )}
    </Authenticator>
  );
};

export default App;

const Header = () => (
  <Box
    sx={{
      mt: 10,
      backgroundColor: "black",
      color: "white",
    }}
  >
    <Typography align="center" sx={{ fontSize: 40 }}>
      Nat's University
    </Typography>
  </Box>
);

// const Footer = () => (
//   <Box
//     sx={{
//       mt: 10,
//       backgroundColor: "white",
//       color: "black",
//     }}
//   >
//     <Typography align="center" sx={{ fontSize: 40 }}>
//       The username is admin. Please email nchomeldoe@gmail.com for the password.
//     </Typography>
//   </Box>
// );
