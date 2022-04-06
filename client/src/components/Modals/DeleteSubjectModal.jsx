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

import { ServiceContext } from "../../context/ServiceProvider";

const DeleteSubjectModal = ({ subjectName, subjectId }) => {
  const {
    apiCalls: { fetchStudentsBySubject, fetchSubjects, deleteSubject },
    studentsBySubject,
  } = useContext(ServiceContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchStudentsBySubject(subjectName);
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
          {studentsBySubject.length === 0 ? (
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
            disabled={studentsBySubject.length > 0 || isDeleting}
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
