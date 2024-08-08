import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axios';
import { Button, Typography, CircularProgress, Container, Modal, Box } from '@mui/material';
import Swal from 'sweetalert2';

const CreatePayment = () => {
  const { bookingId } = useParams();
  const [loading, setLoading] = useState(false);
  const [sessionUrl, setSessionUrl] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const createPaymentSession = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`/api/new-payment/${bookingId}`, {}, {
          headers: { Authorization: localStorage.getItem('token') }
        });
        
        setSessionUrl(response.data.url);
        setOpen(true); // Open the modal when the session URL is set
      } catch (error) {
        console.error('Error creating payment session:', error);
        Swal.fire('Error', 'Error creating payment session. Please try again later.', 'error');
      } finally {
        setLoading(false);
      }
    };

    createPaymentSession();
  }, [bookingId]);

  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="payment-modal-title"
        aria-describedby="payment-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="payment-modal-title" variant="h4" gutterBottom>
            Payment
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : sessionUrl ? (
            <Button variant="contained" color="primary" href={sessionUrl} onClick={handleClose}>
              Proceed to Payment
            </Button>
          ) : (
            <Typography>Error creating payment session.</Typography>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default CreatePayment;
