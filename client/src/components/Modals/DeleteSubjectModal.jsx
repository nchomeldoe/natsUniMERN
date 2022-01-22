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

import { NotificationContext } from "../../context/NotificationProvider";

const DeleteSubjectModal = ({ subjectName, subjectId, fetchSubjects }) => {
  const { setSnack } = useContext(NotificationContext);

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
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudentDetails();
  }, [modalOpen, subjectName]);

  const handleShowModal = async () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `http://localhost:4000/api/subjects/${subjectId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setSnack({
          message: `${subjectName} has been deleted!`,
          severity: "success",
          open: true,
        });
        handleCloseModal();
        fetchSubjects();
      } else {
        setSnack({
          message: "Sorry, there was an error! Please try again.",
          severity: "error",
          open: true,
        });
      }
    } catch (err) {
      setSnack({
        message: "Sorry, there was an error! Please try again.",
        severity: "error",
        open: true,
      });
      console.error(err);
    }
    setIsDeleting(false);
  };
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
          {studentDetails.length === 0 ? (
            <>
              <DialogContentText>
                There are {studentDetails.length} students enrolled in{" "}
                {subjectName}.
              </DialogContentText>
              <List>
                {studentDetails.map((student, i) => (
                  <ListItem key={i}>
                    <ListItemText
                      primary={student.name}
                      secondary={student.email}
                    />
                  </ListItem>
                ))}
              </List>
              <DialogContentText>Delete {subjectName}?</DialogContentText>
            </>
          ) : studentDetails.length === 1 ? (
            <>
              <DialogContentText>
                There is {studentDetails.length} student enrolled in{" "}
                {subjectName}.
              </DialogContentText>
              <List>
                {studentDetails.map((student, i) => (
                  <ListItem key={i}>
                    <ListItemText
                      primary={student.name}
                      secondary={student.email}
                    />
                  </ListItem>
                ))}
              </List>
              <DialogContentText>
                You cannot delete {subjectName}.
              </DialogContentText>
            </>
          ) : (
            <>
              <DialogContentText>
                There are {studentDetails.length} students enrolled in{" "}
                {subjectName}.
              </DialogContentText>
              <List>
                {studentDetails.map((student, i) => (
                  <ListItem key={i}>
                    <ListItemText
                      primary={student.name}
                      secondary={student.email}
                    />
                  </ListItem>
                ))}
              </List>
              <DialogContentText>
                You cannot delete {subjectName}.
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            sx={{ mr: 1 }}
            onClick={handleDelete}
            disabled={studentDetails.length > 0 || isDeleting}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCloseModal}
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteSubjectModal;
