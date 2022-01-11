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
  return (
    <>
      <NotificationContext.Provider value={{ snack, setSnack }}>
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
