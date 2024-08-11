/*
import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Container, Typography, Card, CardContent, CircularProgress, Grid, Button, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';

export default function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ratingsData, setRatingsData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get('/all/review');
        setReviews(reviewsResponse.data);
        console.log(reviewsResponse.data);

        // Fetch ratings data for the first caretaker in the list or handle accordingly
        //if (reviewsResponse.data.length > 0) {
          const caretakerId = reviewsResponse.data[0].caretakerId._id;
          const ratingsResponse = await axios.get(`/caretaker-ratings/${caretakerId}`);
          setRatingsData(ratingsResponse.data);
        //}
      } catch (error) {
        setError('Error fetching data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const handleViewDetails = (caretakerId) => {
    navigate(`/singleReview/${caretakerId}`);
  };

  const handleViewCaretakerDetails = (caretakerId) => {
    navigate(`/caretaker-account/${caretakerId}`);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Reviews
      </Typography>

      {ratingsData && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Total Rating: {ratingsData.totalRating.toFixed(1)}</Typography>
            <Typography variant="h6">Average Rating: {ratingsData.averageRating}</Typography>
            <Rating value={ratingsData.averageRating * 5} readOnly precision={0.1} />
            <Typography variant="body2">Number of Reviews: {ratingsData.numberOfReviews}</Typography>
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
                <Rating value={review.ratings} readOnly />
                {review.photos && (
                  <img
                    src={review.photos}
                    alt="Review"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                )}
                {review.caretakerId && (
                  <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                      Caretaker:
                    </Typography>
                    <Button
                      onClick={() => handleViewCaretakerDetails(review.caretakerId._id)}
                      sx={{ textTransform: 'none' }}
                    >
                      {review.caretakerId.businessName}
                    </Button>
                  </Box>
                )}
                <Typography variant="body2" color="text.secondary">
                  {/* Pet: {review.petId.petName} /}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {review.ratings}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
*/

import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Container, Typography, Card, CardContent, CircularProgress, Grid, Button, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';

export default function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [careBusName,setCareBusName] = useState([]);
  const [error, setError] = useState('');
  const [ratingsData, setRatingsData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get('/all/review');
        setReviews(reviewsResponse.data);
        const careBusName = reviewsResponse.data[0].caretakerId.careTakerBusinessName
        setCareBusName(careBusName)

        if (reviewsResponse.data.length > 0) {
          const caretakerId = reviewsResponse.data[0].caretakerId._id;
          const ratingsResponse = await axios.get(`/caretaker-ratings/${caretakerId}`);
          setRatingsData(ratingsResponse.data);
        }
      } catch (error) {
        setError('Error fetching data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const handleViewCaretakerDetails = (caretakerId) => {
    navigate(`/caretaker-account/${caretakerId}`);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Reviews
      </Typography>

      {ratingsData && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="body1"><b>Business Name:</b> {ratingsData.careTakerBusinessName}</Typography>
            <Typography variant="h6">Total Rating: {ratingsData.totalRating}</Typography>
            <Rating value={ratingsData.totalRating} readOnly precision={0.1} />
            <Typography variant="body2">Number of Reviews: {ratingsData.numberOfRatings}</Typography>
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
                <Rating value={parseFloat(review.ratings)} readOnly  precision={0.1}/>
                {review.photos && (
                  <img
                    src={review.photos}
                    alt="Review"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                )}
                {review.caretakerId && (
                  <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                      Caretaker:{careBusName}
                    </Typography>
                    <Button
                      onClick={() => handleViewCaretakerDetails(review.caretakerId._id)}
                      sx={{ textTransform: 'none' }}
                    >
                      {review.caretakerId.businessName}
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
