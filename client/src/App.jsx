import React from "react";
import { Router } from "@reach/router";

import NavBar from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import StudentsListView from "./components/StudentsListView/StudentsListView";
import StudentView from "./components/StudentView/StudentView";
import NewStudent from "./components/NewStudent/NewStudent";
import NotificationProvider from "./context/NotificationProvider";
import SubjectsListView from "./components/SubjectsListView/SubjectsListView";

const App = () => {
  return (
    <>
      <NotificationProvider>
        <NavBar />
        <Router>
          <HomePage path="/" />
          <StudentsListView path="/studentList" />
          <SubjectsListView path="/subjectList" />
          <StudentView path="/student/:studentId" />
          <NewStudent path="/newStudent" />
        </Router>
      </NotificationProvider>
    </>
  );
};

export default App;
