import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';

export default function SingleCaretakerReviews() {
  const { caretakerId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [ratingsData, setRatingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [updatedRatings, setUpdatedRatings] = useState(0);
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [updatedPetName, setUpdatedPetName] = useState('');
  const [updatedCaretakerName, setUpdatedCaretakerName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsResponse = await axios.get(`/singleReview/${caretakerId}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setReviews(reviewsResponse.data.reviews);

        const ratingsResponse = await axios.get(`/caretaker-ratings/${caretakerId}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setRatingsData(ratingsResponse.data);
      } catch (error) {
        setError('Error fetching data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [caretakerId]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('ratings', updatedRatings);
      formData.append('description', updatedDescription);
  
      const response = await axios.put(`/update/${selectedReview._id}`, formData, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const updatedReview = response.data;
  
      // Fetch the updated review with populated fields
      const populatedReviewResponse = await axios.get(`/review/${updatedReview._id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
  
      const populatedReview = populatedReviewResponse.data;
  
      setReviews(reviews.map((review) => (review._id === populatedReview._id ? populatedReview : review)));
      setUpdatedPetName(populatedReview.petId.petName);
      setUpdatedCaretakerName(populatedReview.caretakerId.businessName);
  
      setOpen(false);
      toast.success('Review updated successfully');
    } catch (error) {
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
        toast.error('Failed to update review');
      } else if (error.request) {
        console.log('Request:', error.request);
        toast.error('No response received from the server');
      } else {
        console.log('Error', error.message);
        toast.error('Error updating review');
      }
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
        Reviews for Caretaker
      </Typography>
      {ratingsData && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Total Ratings: {ratingsData.totalRating}</Typography>
            <Typography variant="h6">Average Rating: {ratingsData.averageRating}</Typography>
            <Rating value={ratingsData.averageRating} readOnly precision={0.5} />
            <Typography variant="body2">Number of Reviews: {ratingsData.numberOfReviews}</Typography>
            <Typography variant="body2">Number of Pet Parents: {ratingsData.numberOfParents}</Typography>
          </CardContent>
        </Card>
      )}
      <Grid container spacing={3}>
        {reviews.map((review) => (
          <Grid item xs={12} sm={6} md={4} key={review._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {review.userId.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.description}
                </Typography>
                <Typography variant="body2">Number of Reviews: {ratingsData.numberOfReviews}</Typography>
                <Rating value={review.ratings} readOnly precision={0.5} />
                {review.photos && (
                  <img
                    src={review.photos}
                    alt="Review"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                )}
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Caretaker: {review.caretakerId.businessName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pet: {review.petId.petName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {review.ratings}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSelectedReview(review);
                    setUpdatedRatings(review.ratings);
                    setUpdatedDescription(review.description);
                    setOpen(true);
                  }}
                >
                  Update
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Review</DialogTitle>
        <DialogContent>
          <Rating
            value={updatedRatings}
            onChange={(event, newValue) => setUpdatedRatings(newValue)}
            precision={0.5}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      {updatedPetName && updatedCaretakerName && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Updated Review
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pet: {updatedPetName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Caretaker: {updatedCaretakerName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {updatedRatings}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: {updatedDescription}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}