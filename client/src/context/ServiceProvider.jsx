import React, { createContext, useState, useContext } from "react";

import { NotificationContext } from "./NotificationProvider";

export const ServiceContext = createContext({});

const ServiceProvider = ({ children }) => {
  const SUBJECTS_ENDPOINT = "http://localhost:4000/api/subjects/";
  const STUDENTS_ENDPOINT = "http://localhost:4000/api/students/";

  const [subjects, setSubjects] = useState(null);
  const [students, setStudents] = useState(null);
  const [student, setStudent] = useState(null);
  const [studentsBySubject, setStudentsBySubject] = useState([]);

  const { setSnack } = useContext(NotificationContext);

  const fetchSubjects = async () => {
    // const [isLoading, setIsLoading] = useState(true)
    try {
      const res = await fetch(SUBJECTS_ENDPOINT);
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      setSubjects(data);
    } catch (err) {
      console.error(err);
    }
    // setIsLoading(false)
    // return [isLoading]
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch(STUDENTS_ENDPOINT);
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudentById = async (studentId) => {
    try {
      const res = await fetch(`${STUDENTS_ENDPOINT}${studentId}`);
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      setStudent(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudentsBySubject = async (subjectName) => {
    try {
      const res = await fetch(`${STUDENTS_ENDPOINT}subject/${subjectName}`);
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      setStudentsBySubject(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addSubject = async (subjectName) => {
    try {
      const res = await fetch(SUBJECTS_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: subjectName }),
      });
      if (res.ok) {
        setSnack({
          message: `${subjectName} has been created!`,
          severity: "success",
          open: true,
        });
      } else {
        const error = await res.json();
        setSnack({
          message: error.message,
          severity: "error",
          open: true,
        });
      }
      return res.ok;
    } catch (err) {
      console.error(err);
      setSnack({
        message: "Sorry, there was an error! Please try again.",
        severity: "error",
        open: true,
      });
    }
  };

  // const addStudent = async () => {
  //   await fetch(`http://localhost:4000/api/students/`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(values),
  //   });
  // };

  // const updateStudent = async () => {
  //   await fetch(`http://localhost:4000/api/students/${studentId}`, {
  //     method: "PATCH",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(values),
  //   });
  // };

  // const deleteSubject = async () => {
  //   await fetch(`http://localhost:4000/api/subjects/${subjectId}`, {
  //     method: "DELETE",
  //   });
  // };

  // const deleteStudent = async () => {
  //   await fetch(`http://localhost:4000/api/students/${studentId}`, {
  //     method: "DELETE",
  //   });
  // };

  const apiCalls = {
    fetchSubjects,
    fetchStudents,
    fetchStudentById,
    fetchStudentsBySubject,
    addSubject,
    // addStudent,
    // updateStudent,
    // deleteSubject,
    // deleteStudent,
  };

  return (
    <>
      <ServiceContext.Provider
        value={{
          apiCalls,
          subjects,
          students,
          student,
          setStudent,
          studentsBySubject,
        }}
      >
        {children}
      </ServiceContext.Provider>
    </>
  );
};

export default ServiceProvider;
