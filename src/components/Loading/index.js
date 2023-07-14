import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Modal from "@mui/material/Modal";

import { useSelector, useDispatch } from "react-redux";

export default function Loading() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
    const { isLoading } = store;
    
    const handleLoading = () => dispatch({ type: "LOADING", value: false });
  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={isLoading}
      onClose={handleLoading}
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      disableAutoFocus
    >
    <Box>
      <CircularProgress style={{color: 'white'}} size={100} />
    </Box>
    </Modal>
  );
}