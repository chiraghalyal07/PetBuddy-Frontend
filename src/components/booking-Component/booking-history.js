//all booking of particular petParent(booking history)

import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';
import './booking.css'; 

const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/booking-history-petparent', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Could not fetch booking data.');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="all-bookings">
      <h2>Booking History</h2>
      {error && <p className="error">{error}</p>}
      {bookings.length > 0 ? (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-item">
              <div>
                <strong>Service Name:</strong> {booking.serviceName}
              </div>
              <div>
                <strong>Total Amount:</strong> ₹ {booking.totalAmount.toFixed(2)}
              </div>
              <div>
                <strong>Booking Duration:</strong> {booking.bookingDurationInHours.toFixed(2)} hours
              </div>
              <div>
                <strong>Booking Status:</strong> {booking.status}
              </div>
              <div>
                <strong>Start Time:</strong> {new Date(booking.date.startTime).toLocaleString()}
              </div>
              <div>
                <strong>End Time:</strong> {new Date(booking.date.endTime).toLocaleString()}
              </div>
              <div>
                <strong>CareTaker Business Name:</strong> {booking.caretakerId.careTakerBusinessName}
              </div>
              <div>
                <strong>CareTaker Bio:</strong> {booking.caretakerId.bio}
              </div>
              <div>
                <strong>Pet Name:</strong> {booking.petId.petName}
              </div>
              <div>
                <strong>Pet Category:</strong> {booking.petId.category}
              </div>
              <div>
                <strong>Pet Breed:</strong> {booking.petId.breed}
              </div>
              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default AllBooking;
