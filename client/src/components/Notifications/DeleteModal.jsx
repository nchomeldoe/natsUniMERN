import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";

import { NotificationContext } from "../../context/NotificationProvider";

const DeleteModal = ({ studentName, studentId, isSubmitting }) => {
  const { setSnack } = useContext(NotificationContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleShowModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `http://localhost:4000/api/students/${studentId}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        setSnack({
          // handle backend errors
          message: "Sorry, there was an error! Please try again.",
          severity: "error",
          open: true,
        });
        throw res;
      } else {
        setSnack({
          message: `${studentName} has been deleted!`,
          severity: "success",
          open: true,
        });
        navigate(`/`);
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

export default DeleteModal;
