import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";

import { ServiceContext } from "../../context/ServiceProvider";

import { formatNamesForDb } from "../../utility/utilityFuncs";

const AddSubjectModal = () => {
  const {
    apiCalls: { fetchSubjects, addSubject },
  } = useContext(ServiceContext);

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
    const formattedSubjectName = formatNamesForDb(subjectName);
    const subjIsAddedStatus = await addSubject(formattedSubjectName);
    if (subjIsAddedStatus) {
      handleCloseModal();
      fetchSubjects();
    }
    setIsAdding(false);
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
