import React, { createContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const NotificationContext = createContext({});

const NotificationProvider = ({ children }) => {
  const [snack, setSnack] = useState({
    message: "Test success",
    severity: "success",
    open: false,
  });

  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };

  const openSuccessSnack = (successMessage) => {
    setSnack({
      message: successMessage,
      severity: "success",
      open: true,
    });
  };

  const openErrorSnack = (
    errorMessage = "Sorry, there was an error! Please try again.",
  ) => {
    setSnack({
      message: errorMessage,
      severity: "error",
      open: true,
    });
  };

  return (
    <>
      <NotificationContext.Provider
        value={{ openSuccessSnack, openErrorSnack }}
      >
        {children}
        <Snackbar
          open={snack.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={snack.severity}
            sx={{ width: "100%" }}
          >
            {snack.message}
          </Alert>
        </Snackbar>
      </NotificationContext.Provider>
    </>
  );
};

export default NotificationProvider;
