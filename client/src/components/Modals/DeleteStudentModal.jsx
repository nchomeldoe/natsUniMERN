import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";

import { ServiceContext } from "../../context/ServiceProvider";

const DeleteStudentModal = ({ studentName, studentId, isSubmitting }) => {
  const {
    apiCalls: { deleteStudent },
  } = useContext(ServiceContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleShowModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    deleteStudent(studentId, studentName);
    setIsDeleting(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        sx={{ mr: 1 }}
        onClick={handleShowModal}
        disabled={isSubmitting}
      >
        Delete
      </Button>
      <Dialog
        open={modalOpen}
        onClose={() => {
          handleCloseModal();
        }}
      >
        <DialogTitle>Delete {studentName}?</DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            sx={{ mr: 1 }}
            onClick={handleDelete}
            disabled={isDeleting}
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

export default DeleteStudentModal;
