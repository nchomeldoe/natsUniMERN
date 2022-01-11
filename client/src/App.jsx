import React from "react";
import { Router } from "@reach/router";

import NavBar from "./components/NavBar/NavBar";
import ListView from "./components/ListView/ListView";
import StudentView from "./components/StudentView/StudentView";
import NewStudent from "./components/NewStudent/NewStudent";
import NotificationProvider from "./context/NotificationProvider";

const App = () => {
  return (
    <>
      <NotificationProvider>
        <NavBar />
        <Router>
          <ListView path="/" />
          <StudentView path="/student/:studentId" />
          <NewStudent path="/newStudent" />
        </Router>
      </NotificationProvider>
    </>
  );
};

export default App;
