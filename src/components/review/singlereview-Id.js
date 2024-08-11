import React, { useEffect, useState } from 'react';
import axios from '../../config/axios'; // Adjust the import path as needed
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CircularProgress, Grid, Rating } from '@mui/material';

export default function SingleCaretakerReviews() {
  const { reviewId, caretakerId } = useParams(); // Get both reviewId and caretakerId from the URL parameters
  const [reviews, setReviews] = useState([]); // Initialize as an empty array
  const [caretaker, setCaretaker] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch reviews
        const reviewsResponse = await axios.get(`/review/${reviewId}`, {
          headers: {
            Authorization: localStorage.getItem('token'), // Include token for authorization
          },
        });
        setReviews(reviewsResponse.data.reviews || []); // Set reviews data

        // Fetch caretaker details
        if (caretakerId) {
          const caretakerResponse = await axios.get(`/caretaker/${caretakerId}`, {
            headers: {
              Authorization: localStorage.getItem('token'), // Include token for authorization
            },
          });
          setCaretaker(caretakerResponse.data); // Set caretaker data
        }

      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (reviewId) {
      fetchData();
    } else {
      setError('Invalid review ID');
      setLoading(false);
    }
  }, [reviewId, caretakerId]); // Add caretakerId to the dependency array

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {caretaker ? `Reviews for ${caretaker.businessName}` : 'Reviews'}
      </Typography>
      {reviews.length > 0 ? (
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
                  <Rating value={review.ratings} readOnly precision={0.5} />
                  {review.photos && (
                    <img
                      src={review.photos}
                      alt="Review"
                      style={{ width: '100%', marginTop: '10px' }}
                    />
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Pet: {review.petId.petName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2">No reviews available</Typography>
      )}
    </Container>
  );
}