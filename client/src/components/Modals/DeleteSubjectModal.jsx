import React, { useState, useContext, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { navigate } from "@reach/router";

import { NotificationContext } from "../../context/NotificationProvider";

const DeleteSubjectModal = ({ subjectName }) => {
  //   const { setSnack } = useContext(NotificationContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [studentDetails, setStudentDetails] = useState([]);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/students/subject/${subjectName}`
        );
        if (!res.ok) {
          throw res;
        }
        const data = await res.json();
        setStudentDetails(data);
        console.log("data", data);
        console.log("studentDetails", studentDetails);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudentDetails();
  }, [modalOpen]);

  const handleShowModal = async () => {
    // await fetchStudentDetails();
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  //   const handleDelete = async () => {
  //     setIsDeleting(true);
  //     try {
  //       const res = await fetch(
  //         `http://localhost:4000/api/students/${studentId}`,
  //         { method: "DELETE" }
  //       );
  //       if (!res.ok) {
  //         setSnack({
  //           // handle backend errors
  //           message: "Sorry, there was an error! Please try again.",
  //           severity: "error",
  //           open: true,
  //         });
  //         throw res;
  //       } else {
  //         setSnack({
  //           message: `${studentName} has been deleted!`,
  //           severity: "success",
  //           open: true,
  //         });
  //         navigate(`/studentList`);
  //       }
  //     } catch (err) {
  //       setSnack({
  //         message: "Sorry, there was an error! Please try again.",
  //         severity: "error",
  //         open: true,
  //       });
  //       console.error(err);
  //     }
  //     setIsDeleting(false);
  //   };
  return (
    <>
      <IconButton
        onClick={handleShowModal}
        //    disabled={isSubmitting}
      >
        <DeleteForeverIcon />
      </IconButton>
      <Dialog
        open={modalOpen}
        onClose={() => {
          handleCloseModal();
        }}
      >
        <DialogContent>
          <DialogContentText>
            There are {studentDetails.length} students enrolled in {subjectName}
            .
            <List>
              {studentDetails.map((student) => (
                <ListItem>
                  <ListItemText
                    primary={student.name}
                    secondary={student.email}
                  />
                </ListItem>
              ))}
            </List>
            You cannot delete {subjectName}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            sx={{ mr: 1 }}
            // onClick={handleDelete}
            // disabled={isDeleting}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCloseModal}
            // disabled={isDeleting}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteSubjectModal;
