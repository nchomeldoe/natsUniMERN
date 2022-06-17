import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import React from "react";
import { Router } from "@reach/router";
import { Box } from "@mui/material";

import NavBar from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import StudentsListView from "./components/StudentsListView/StudentsListView";
import StudentView from "./components/StudentView/StudentView";
import NewStudent from "./components/NewStudent/NewStudent";
import NotificationProvider from "./context/NotificationProvider";
import SubjectsListView from "./components/SubjectsListView/SubjectsListView";
import ServiceProvider from "./context/ServiceProvider";

Amplify.configure({
  region: "eu-west-2",
  userPoolId: "eu-west-2_tTOU6Scc7",
  userPoolWebClientId: "52s6fjmrntvjnf16013bkei8pa",
});

const App = () => {
  return (
    <Box sx={{ pt: 5 }}>
      <Authenticator hideSignUp={true}>
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
    </Box>
  );
};

export default App;
