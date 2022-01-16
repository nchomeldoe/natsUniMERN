import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { navigate } from "@reach/router";

import { NotificationContext } from "../../context/NotificationProvider";

const AddSubjectModal = () => {
  const { setSnack } = useContext(NotificationContext);

  const [subjectName, setSubjectName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleShowModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setSubjectName("");
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setSubjectName(e.target.value);
  };
  const handleAdd = async () => {
    setIsAdding(true);
    const formattedSubjectName =
      subjectName.charAt(0).toUpperCase() + subjectName.slice(1).toLowerCase();
    try {
      const res = await fetch(`http://localhost:4000/api/subjects/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: formattedSubjectName }),
      });
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
          message: `${subjectName} has been created!`,
          severity: "success",
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
    setIsAdding(false);
    handleCloseModal();
    window.location.reload();
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{ maxWidth: "150px", fontSize: "10px", height: "auto" }}
        onClick={handleShowModal}
      >
        Create New
      </Button>
      <Dialog
        open={modalOpen}
        onClose={() => {
          handleCloseModal();
        }}
      >
        <Stack direction="column" sx={{ alignItems: "center" }}>
          <DialogTitle>Name of new subject:</DialogTitle>
          <DialogActions>
            <Stack direction="column" spacing={2} sx={{ alignItems: "center" }}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={subjectName}
                onChange={handleChange}
              />
              <div>
                <Button
                  variant="outlined"
                  sx={{ mr: 1, minWidth: "90px" }}
                  onClick={handleAdd}
                  disabled={isAdding || subjectName === ""}
                >
                  Add
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCloseModal}
                  disabled={isAdding}
                >
                  Cancel
                </Button>
              </div>
            </Stack>
          </DialogActions>
        </Stack>
      </Dialog>
    </>
  );
};

export default AddSubjectModal;
