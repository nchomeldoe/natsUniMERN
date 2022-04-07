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
import Loader from "react-loader-spinner";

import { ServiceContext } from "../../context/ServiceProvider";

const DeleteSubjectModal = ({ subjectName, subjectId }) => {
  const {
    apiCalls: { fetchStudentsBySubject, fetchSubjects, deleteSubject },
    studentsBySubject,
    error,
    setError,
  } = useContext(ServiceContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchStudentsBySubject(subjectName);
    setIsLoading(false);
    return () => setError({});
  }, [modalOpen, subjectName]);

  const handleShowModal = async () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const subjIsDeletedStatus = await deleteSubject(subjectId, subjectName);
    if (subjIsDeletedStatus) {
      handleCloseModal();
      fetchSubjects();
    }
    setIsDeleting(false);
  };
  return (
    <>
      <IconButton onClick={handleShowModal}>
        <DeleteForeverIcon />
      </IconButton>
      <Dialog
        open={modalOpen}
        onClose={() => {
          handleCloseModal();
        }}
      >
        <DialogContent>
          {error.fetchStudentsBySubjectError ? (
            <>
              <DialogContentText>
                Sorry, something has gone wrong...
              </DialogContentText>
            </>
          ) : isLoading ? (
            <>
              <DialogContentText
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Loader type="Puff" color="#00BFFF" height={50} width={50} />
              </DialogContentText>
            </>
          ) : studentsBySubject.length === 0 ? (
            <>
              <DialogContentText>
                There are {studentsBySubject.length} students enrolled in{" "}
                {subjectName}. Delete {subjectName}?
              </DialogContentText>
            </>
          ) : studentsBySubject.length === 1 ? (
            <>
              <DialogContentText>
                There is {studentsBySubject.length} student enrolled in{" "}
                {subjectName}.
              </DialogContentText>
              <List>
                {studentsBySubject.map((student, i) => (
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
                There are {studentsBySubject.length} students enrolled in{" "}
                {subjectName}.
              </DialogContentText>
              <List>
                {studentsBySubject.map((student, i) => (
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
            disabled={
              studentsBySubject.length > 0 ||
              isDeleting ||
              error.fetchStudentsBySubjectError ||
              isLoading
            }
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
