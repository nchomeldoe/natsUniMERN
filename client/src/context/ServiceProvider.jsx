import React, { createContext, useState, useContext } from "react";

import { navigate } from "@reach/router";

import { NotificationContext } from "./NotificationProvider";
import { parseStudentData } from "../utility/utilityFuncs";

export const ServiceContext = createContext({});

const ServiceProvider = ({ children }) => {
  const SUBJECTS_ENDPOINT = "/api/subjects/";
  const STUDENTS_ENDPOINT = "/api/students/";

  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);
  const [studentsBySubject, setStudentsBySubject] = useState([]);
  const [error, setError] = useState({});

  const { openSuccessSnack, openErrorSnack } = useContext(NotificationContext);

  const fetchSubjects = async () => {
    try {
      const res = await fetch(SUBJECTS_ENDPOINT);
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      setSubjects(data);
    } catch (err) {
      console.error(err);
      setError({ fetchSubjectsError: true });
    }
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
      setError({ fetchStudentsError: true });
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
      setError({ fetchStudentByIdError: true });
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
      setError({ fetchStudentsBySubjectError: true });
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
        openSuccessSnack(`${subjectName} has been created!`);
      } else {
        const error = await res.json();
        openErrorSnack(error.message);
      }
      return res.ok;
    } catch (err) {
      console.error(err);
      openErrorSnack();
    }
  };

  const addStudent = async (studentData) => {
    const parsedStudentData = parseStudentData(studentData);
    try {
      const res = await fetch(STUDENTS_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedStudentData),
      });
      if (res.ok) {
        const data = await res.json();
        const studentId = data._id;
        openSuccessSnack(
          `${parsedStudentData.firstName} ${parsedStudentData.lastName} has been created!`,
        );
        navigate(`/student/${studentId}`);
      } else {
        const error = await res.json();
        openErrorSnack(error.message);
      }
    } catch (err) {
      console.error(err);
      openErrorSnack();
    }
  };

  const updateStudent = async (studentId, studentData) => {
    const parsedStudentData = parseStudentData(studentData);
    try {
      const res = await fetch(`${STUDENTS_ENDPOINT}${studentId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedStudentData),
      });
      if (res.ok) {
        openSuccessSnack(
          `${parsedStudentData.firstName} ${parsedStudentData.lastName} has been updated!`,
        );
        navigate(`/studentList`);
      } else {
        const error = await res.json();
        openErrorSnack(error.message);
      }
    } catch (err) {
      openErrorSnack();
      console.error(err);
    }
  };

  const deleteSubject = async (subjectId, subjectName) => {
    try {
      const res = await fetch(`${SUBJECTS_ENDPOINT}${subjectId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        openSuccessSnack(`${subjectName} has been deleted!`);
      } else {
        openErrorSnack();
      }
      return res.ok;
    } catch (err) {
      openErrorSnack();
      console.error(err);
    }
  };

  const deleteStudent = async (studentId, studentName) => {
    try {
      const res = await fetch(`${STUDENTS_ENDPOINT}${studentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        openSuccessSnack(`${studentName} has been deleted!`);
        navigate(`/studentList`);
      } else {
        openErrorSnack();
      }
    } catch (err) {
      openErrorSnack();
      console.error(err);
    }
  };

  const apiCalls = {
    fetchSubjects,
    fetchStudents,
    fetchStudentById,
    fetchStudentsBySubject,
    addSubject,
    addStudent,
    updateStudent,
    deleteSubject,
    deleteStudent,
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
          error,
          setError,
        }}
      >
        {children}
      </ServiceContext.Provider>
    </>
  );
};

export default ServiceProvider;
