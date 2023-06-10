import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { useSoftUIController, setAlert } from "context";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const [controller, dispatch] = useSoftUIController();
  const { isAlert, status, message } = controller;

  const [state, setState] = React.useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = () => {
    setAlert(dispatch, true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(dispatch, false);
  };

  return (
    <div>
      <Snackbar
        open={isAlert}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
            {message}
        </Alert>
      </Snackbar>
    </div>
    // <Stack spacing={2} sx={{ width: '100%' }}>
    //   <Snackbar open={isAlert} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
    //     <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    //       This is a success message!
    //     </Alert>
    //   </Snackbar>
    //   <Alert severity="success">This is a success message!</Alert>
    // </Stack>
  );
}
