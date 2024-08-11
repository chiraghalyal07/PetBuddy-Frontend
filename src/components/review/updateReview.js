import React, { useState, useEffect } from 'react';
import axios from '../../config/axios'; // Adjust path as needed
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Rating,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { toast } from 'react-toastify';

export default function UpdateReview() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [caretakerId, setCaretakerId] = useState(''); // Initialize state for caretakerId
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatedRatings, setUpdatedRatings] = useState(0);
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    const fetchReview = async () => {
        try {
            if (reviewId) {
                const response = await axios.get(`/review/${reviewId}`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });
                setReview(response.data);
                setUpdatedRatings(response.data.ratings);
                setUpdatedDescription(response.data.description);

                if (response.data.caretakerId) {
                    setCaretakerId(response.data.caretakerId.toString()); // Convert to string if necessary
                } else {
                    setError('Caretaker ID is missing in the review data');
                }
            } else {
                setError('Review ID is missing');
            }
        } catch (error) {
            setError('Error fetching review');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    fetchReview();
}, [reviewId]);


    const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('ratings', updatedRatings);
      formData.append('description', updatedDescription);
      formData.append('caretakerId', caretakerId);
  
      const response = await axios.put(`/update/${reviewId}`, formData, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Review updated successfully');
  
      // Ensure caretakerId is a valid string
      if (caretakerId) {
        console.log('Navigating to:', `/review/${reviewId}`); // Debug log
        navigate(`/review/${reviewId}`, {
          state: { updatedReview: response.data },
        });
      } else {
        setError('Caretaker ID is missing or invalid');
      }
    } catch (error) {
      console.error('Error updating review:', error);
      setError('Failed to update review');
    }
  };
  
  

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Update Review
      </Typography>
      {review && (
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Review for {review.caretakerId.businessName}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Rating
                  value={updatedRatings}
                  onChange={(event, newValue) => setUpdatedRatings(newValue)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                  Update Review
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}