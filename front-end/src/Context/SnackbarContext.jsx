import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackbarContext = createContext();
export const useSnackbar = () => useContext(SnackbarContext);

export function SnackbarProvider({ children }) {
  const [snackbars, setSnackbars] = useState([]);

  const showSnackbar = (message, severity = "info") => {
    const id = Date.now() + Math.random();
    setSnackbars((prev) => [...prev, { id, message, severity, open: true }]);
    setTimeout(() => {
      setSnackbars((prev) => prev.filter((snack) => snack.id !== id));
    }, 3000);
  };

  const handleClose = (id) => {
    setSnackbars((prev) =>
      prev.map((snack) => (snack.id === id ? { ...snack, open: false } : snack))
    );
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      {snackbars.map((snack, index) => (
        <Snackbar
          key={snack.id}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snack.open}
          onClose={() => handleClose(snack.id)}
          sx={{ zIndex: 9999 }}
          style={{
            top: `${100 + index * 70}px`,
            right: "20px",
            position: "fixed",
          }}
        >
          <Alert
            onClose={() => handleClose(snack.id)}
            severity={snack.severity}
            sx={{
              width: "300px",
              display: "flex",
              alignItems: "center",
              backgroundColor:
                snack.severity === "error" ? "#FF8282" : undefined,
              color: snack.severity === "error" ? "#fff" : undefined,
            }}
          >
            {snack.message}
          </Alert>
        </Snackbar>
      ))}
    </SnackbarContext.Provider>
  );
}
