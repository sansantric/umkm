import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);

  const { isAlert, status, message } = store;

  const [state, setState] = React.useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = () => {
    dispatch({ type: "ALERT", value: true })
    // setAlert(dispatch, true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: "ALERT", value: false })
    // setAlert(dispatch, false);
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
  );
}
