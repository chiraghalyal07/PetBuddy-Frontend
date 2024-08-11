import React, { useEffect, useState } from 'react';
import axios from '../../config/axios'; // Adjust path as needed
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CircularProgress, Rating, Grid, Box } from '@mui/material';

export default function SingleReviews() {
  const { caretakerId } = useParams(); // Retrieve bookingId from URL parameters
  const [ratingsData, setRatingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ratings data using bookingId
        const ratingsResponse = await axios.get(`/caretaker-ratings/${caretakerId}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        setRatingsData(ratingsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('No Review Found for this caretaker..!');
      } finally {
        setLoading(false);
      }
    };

    if (caretakerId) {
      fetchData();
    } else {
      setError('Booking ID is missing or invalid');
      setLoading(false);
    }
  }, [caretakerId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Caretaker Rating Details
      </Typography>

      {ratingsData && (
        <>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{ratingsData.careTakerBusinessName} Ratings</Typography>
              <Typography variant="body1">Total Ratings: {ratingsData.totalRating}</Typography>
              <Rating value={parseFloat(ratingsData.totalRating)} readOnly precision={0.1} />
              <Typography variant="body2">Number of Reviews: {ratingsData.numberOfRatings}</Typography>
            </CardContent>
          </Card>

          <Typography variant="h5" component="h2" gutterBottom>
            Reviews
          </Typography>

          <Grid container spacing={3}>
            {ratingsData.reviews.map((review, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="body1" component="div">
                      PetParent: {review.petParentUsername}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Pet: {review.petName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description: {review.description}
                    </Typography>
                    <Rating value={parseFloat(review.rating)} readOnly precision={0.1} />
                    {review.photo && (
                      <Box mt={1}>
                        <img
                          src={review.photo}
                          alt="Review"
                          style={{ width: '100%', borderRadius: '4px' }}
                        />
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}

