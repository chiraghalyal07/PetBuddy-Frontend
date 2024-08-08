import React, { useEffect } from 'react';
import { Modal, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../../config/axios';

const Failure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        const id = new URLSearchParams(window.location.search).get('session_id');
        if (id) {
          await axios.put(`/api/payment-failed/${id}`);
          Swal.fire('Failed', 'Your payment has failed. Please try again later.', 'error');
        } else {
          Swal.fire('Error', 'No session ID found in the URL.', 'error');
        }
      } catch (error) {
        console.error('Error updating payment status:', error);
        Swal.fire('Error', 'An error occurred while updating payment status. Please try again later.', 'error');
      }
    };

    updatePaymentStatus();
  }, []);

  const handleRetryPayment = () => {
    navigate('/booking-history');
  };

  return (
    <Modal open={true} onClose={handleRetryPayment}>
      <Box sx={{ ...modalStyle, width: 400 }}>
        <Typography variant="h4" gutterBottom>Payment Failed</Typography>
        <Typography variant="body1">We are sorry, but your payment has failed. Please try again later.</Typography>
        <Button variant="contained" color="primary" onClick={handleRetryPayment} sx={{ mt: 2 }}>
          Retry Payment
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

export default Failure;
