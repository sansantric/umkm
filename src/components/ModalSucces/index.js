import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Modal from "@mui/material/Modal";
import success from "assets/images/success.png";
import checkoutSuccess from "assets/images/checkoutSuccess.png";

import { useSoftUIController, setModal } from "context";

export default function ModalSuccess() {
    const [controller, dispatch] = useSoftUIController();
    const { isModal, modalType } = controller;
    
    const handleModalSucces = () => setModal(dispatch, false);

    const renderImage = () => {
      if (modalType == 'checkout') {
        
        return <img src={checkoutSuccess} style={{height: '400px'}} />
      } else {        
        return <img src={success} style={{height: '400px'}} />
      }
    }
  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={isModal}
      onClose={handleModalSucces}
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {renderImage()}
    </Modal>
  );
}