import React, { useState } from 'react';
import { TextField, Button, Rating, Typography } from '@mui/material';
import axios from '../../config/axios';

const ReviewForm = ({ bookingId, onReviewSubmitted }) => {
  const [ratings, setRatings] = useState(0);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ratings || !description) {
      setError('Please provide both ratings and a description.');
      return;
    }

    const formData = new FormData();
    formData.append('ratings', ratings);
    formData.append('description', description);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
        const token = localStorage.getItem('token');
      await axios.post(`/review/${bookingId}`, formData, {
        headers: {
           'Authorization': ` ${token}`,
          'Content-Type': 'multipart/form-data',
          
         
        },
      });
      onReviewSubmitted(); // Callback to handle after review submission
    } catch (err) {
      setError('Failed to submit review. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>Submit Your Review</Typography>
      <Rating
        value={ratings}
        onChange={(e, newValue) => setRatings(newValue)}
        name="rating"
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <input type="file" onChange={handlePhotoChange} />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
