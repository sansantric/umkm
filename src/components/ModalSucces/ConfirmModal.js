import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

export const ConfirmDialog = (props) => {
  const { status, handleApprove, id } = props;
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const { ModalConfirm } = store;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    dispatch({ type: "MODAL_CONFIRM", value: false });
  };

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={ModalConfirm && status!== undefined} onClose={()=> handleClose()}>
        <DialogTitle
          sx={{
            fontSize: "2rem",
            textAlign: "center",
            marginLeft: "2rem",
            marginTop: "2rem",
            marginRight: "2rem",
          }}
        >
          {status === 1 ? "Change The Status To Approved?" : "Change The Status To Reject?"}
        </DialogTitle>
        <DialogActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <Button
            variant="contained"
            onClick={handleApprove}
            sx={{
              fontSize: "1rem !important",
            }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            onClick={()=> handleClose()}
            sx={{
              backgroundColor: "red",
              fontSize: "1rem !important",
            }}
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfirmDialog.propTypes = {
  status: PropTypes.number,
  handleApprove: PropTypes.func,
  id: PropTypes.string,
};
