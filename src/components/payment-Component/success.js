import React, { useEffect } from 'react';
import {  Modal, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../../config/axios';
const Success = () => {
  const navigate = useNavigate();

useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const clientSecret = queryParams.get('clientSecret');
        console.log('Full Query String:', window.location.search);
        console.log('Client Secret:', clientSecret); // Check if clientSecret is retrieved

        if (clientSecret) {
          await axios.put(`/api/payment-success/${clientSecret}`);
          Swal.fire('Success', 'Your payment has been successfully processed.', 'success');
        } else {
          Swal.fire('Error', 'No client secret found in the URL.', 'error');
        }
      } catch (error) {
        console.error('Error updating payment status:', error);
        Swal.fire('Error', 'An error occurred while updating payment status. Please try again later.', 'error');
      }
    };

    updatePaymentStatus();
  }, []);
  const handleBackToBookings = () => {
    navigate('/booking-history');
  };

  return (
    <Modal open={true} onClose={handleBackToBookings}>
    <Box sx={{ ...modalStyle, width: 400 }}>
      <Typography variant="h4" gutterBottom>Payment Successful</Typography>
      <Typography variant="body1">Your payment has been successfully processed. Thank you for using PetBuddy.</Typography>
      <Button variant="contained" color="primary" onClick={handleBackToBookings} sx={{ mt: 2 }}>Back to Bookings</Button>
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

export default Success;
