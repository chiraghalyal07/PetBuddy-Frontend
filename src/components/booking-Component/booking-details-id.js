/*
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axios';

const BookingDetails = () => {
  const { bookingId } = useParams(); // Get booking ID from URL parameters
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`/api/single-booking/${bookingId}`);
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setError('Error fetching booking details.');
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (error) return <p>{error}</p>;
  if (!booking) return <p>Loading...</p>;

  const { date, userId, caretakerId, petId, petparentId, totalAmount, serviceName, status, bookingDurationInHours } = booking;

  return (
    <div>
      <h2>Booking Details</h2>
      <div>
        <h3>Service Details</h3>
        <p><strong>Service Name:</strong> {serviceName}</p>
        <p><strong>Start Time:</strong> {new Date(date.startTime).toLocaleString()}</p>
        <p><strong>End Time:</strong> {new Date(date.endTime).toLocaleString()}</p>
        <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
        <p><strong>Booking Duration:</strong> {bookingDurationInHours} hours</p>
        <p><strong>Status:</strong> {status}</p>
      </div>
      <div>
        <h3>Pet Parent Details</h3>
        <p><strong>Username:</strong> {userId.username}</p>
        <p><strong>Email:</strong> {userId.email}</p>
        <p><strong>Phone Number:</strong> {userId.phoneNumber}</p>
        <p><strong>Address:</strong> {petparentId.address}</p>
        <img src={petparentId.photo} alt="Pet Parent" />
        <img src={petparentId.proof} alt="Pet Parent Proof" />
      </div>
      <div>
        <h3>CareTaker Details</h3>
        <p><strong>Business Name:</strong> {caretakerId.careTakerBusinessName}</p>
        <p><strong>Address:</strong> {caretakerId.address}</p>
        <p><strong>Bio:</strong> {caretakerId.bio}</p>
        <p><strong>Verified By Admin:</strong> {caretakerId.verifiedByAdmin ? 'Yes' : 'No'}</p>
        <img src={caretakerId.photo} alt="CareTaker" />
        <img src={caretakerId.proof} alt="CareTaker Proof" />
        <div>
          <h4>Service Charges</h4>
          <ul>
            {caretakerId.serviceCharges.map(charge => (
              <li key={charge._id}>
                {charge.name}: ₹{charge.amount} (for {charge.time} hours)
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h3>Pet Details</h3>
        <p><strong>Pet Name:</strong> {petId.petName}</p>
        <p><strong>Age:</strong> {petId.age}</p>
        <p><strong>Gender:</strong> {petId.gender}</p>
        <p><strong>Category:</strong> {petId.category}</p>
        <p><strong>Breed:</strong> {petId.breed}</p>
        <p><strong>Weight:</strong> {petId.weight}</p>
        <img src={petId.petPhoto} alt="Pet" />
      </div>
    </div>
  );
};

export default BookingDetails;
*/
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axios';
import { Container, Typography, Button, Paper, Avatar, List, ListItem, ListItemText } from '@mui/material';

const BookingDetails = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const [view, setView] = useState('details');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`/api/single-booking/${bookingId}`);
        setBooking(response.data);
      } catch (error) {
        setError('Error fetching booking details.');
      }
    };
    fetchBookingDetails();
  }, [bookingId]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!booking) return <Typography>Loading...</Typography>;

  const { date, userId, caretakerId, petId, petparentId, totalAmount, serviceName, status, bookingDurationInHours } = booking;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Booking Details</Typography>
      <Paper style={{ padding: 20, marginBottom: 20 }}>
        <Typography variant="h6" gutterBottom>Service Details</Typography>
        <Typography variant="body1"><strong>Service Name:</strong> {serviceName}</Typography>
        <Typography variant="body1"><strong>Start Time:</strong> {new Date(date.startTime).toLocaleString()}</Typography>
        <Typography variant="body1"><strong>End Time:</strong> {new Date(date.endTime).toLocaleString()}</Typography>
        <Typography variant="body1"><strong>Total Amount:</strong> ₹{totalAmount}</Typography>
        <Typography variant="body1"><strong>Booking Duration:</strong> {bookingDurationInHours} hours</Typography>
        <Typography variant="body1"><strong>Status:</strong> {status}</Typography>
      </Paper>
      <Button variant="contained" color="primary" onClick={() => alert('Payment functionality is not yet implemented.')} style={{ marginRight: 10 }}>Make Payment</Button>
      <Button variant="contained" color="secondary" onClick={() => setView('petDetails')} style={{ marginRight: 10 }}>View Pet Details</Button>
      <Button variant="contained" color="secondary" onClick={() => setView('careTakerDetails')}>View CareTaker Details</Button>
      {view === 'petDetails' && (
        <Paper style={{ padding: 20, marginTop: 20 }}>
          <Typography variant="h6" gutterBottom>Pet Details</Typography>
          <Typography variant="body1"><strong>Pet Name:</strong> {petId.petName}</Typography>
          <Typography variant="body1"><strong>Age:</strong> {petId.age}</Typography>
          <Typography variant="body1"><strong>Gender:</strong> {petId.gender}</Typography>
          <Typography variant="body1"><strong>Category:</strong> {petId.category}</Typography>
          <Typography variant="body1"><strong>Breed:</strong> {petId.breed}</Typography>
          <Typography variant="body1"><strong>Weight:</strong> {petId.weight}</Typography>
          <Avatar src={petId.petPhoto} alt="Pet" style={{ width: 100, height: 100 }} />
        </Paper>
      )}
      {view === 'careTakerDetails' && (
        <Paper style={{ padding: 20, marginTop: 20 }}>
          <Typography variant="h6" gutterBottom>CareTaker Details</Typography>
          <Typography variant="body1"><strong>Business Name:</strong> {caretakerId.careTakerBusinessName}</Typography>
          <Typography variant="body1"><strong>Address:</strong> {caretakerId.address}</Typography>
          <Typography variant="body1"><strong>Bio:</strong> {caretakerId.bio}</Typography>
          <Typography variant="body1"><strong>Verified By Admin:</strong> {caretakerId.verifiedByAdmin ? 'Yes' : 'No'}</Typography>
          <Avatar src={caretakerId.photo} alt="CareTaker" style={{ width: 100, height: 100 }} />
          <Avatar src={caretakerId.proof} alt="CareTaker Proof" style={{ width: 100, height: 100, marginTop: 10 }} />
          <Typography variant="h6" gutterBottom>Service Charges</Typography>
          <List>
            {caretakerId.serviceCharges.map(charge => (
              <ListItem key={charge._id}>
                <ListItemText primary={`${charge.name}: ₹${charge.amount} (for ${charge.time} hours)`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default BookingDetails;
