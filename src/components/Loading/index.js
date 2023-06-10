import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Modal from "@mui/material/Modal";

import { useSoftUIController, setLoading } from "context";

export default function Loading() {
    const [controller, dispatch] = useSoftUIController();
    const { isLoading } = controller;
    
    const handleLoading = () => setLoading(dispatch, false);
  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={isLoading}
      onClose={handleLoading}
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
    <Box>
      <CircularProgress style={{color: 'white'}} size={100} />
    </Box>
    </Modal>
  );
}