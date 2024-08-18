import React, { useEffect, useState, useRef } from 'react';
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  CircularProgress,
  Rating,
} from '@mui/material';

export default function HappyParents() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  function NextArrow({ onClick }) {
    return (
      <ArrowForwardIos
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          fontSize: '24px',
          color: 'black',
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: 'white',
          borderRadius: '50%',
          padding: '5px',
        }}
      />
    );
  }

  function PrevArrow({ onClick }) {
    return (
      <ArrowBackIos
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          fontSize: '24px',
          color: 'black',
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: 'white',
          borderRadius: '50%',
          padding: '5px',
        }}
      />
    );
  }

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get('/all/review');
        setReviews(reviewsResponse.data);
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
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleViewCaretakerDetails = (caretakerId) => {
    navigate(`/caretaker-params-one/${caretakerId}`);
  };

  return (
    <Container sx={{ position: 'relative', padding: '0 30px', overflow: 'hidden' }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: '#333', textTransform: 'uppercase' }}
      >
        Happy Parents
      </Typography>
      <Box
        ref={sliderRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          whiteSpace: 'nowrap',
          position: 'relative',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {reviews.map((review) => (
          <Box
            key={review._id}
            sx={{
              display: 'inline-block',
              width: '300px',
              padding: '10px',
              transform: 'scale(0.8)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1)',
              },
            }}
          >
            <Card>
              {review.photos && (
                <img
                  src={review.photos}
                  alt="Review"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                />
              )}
              <CardContent>
                <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                  {review.userId.username} - Parent of {review.petId.petName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', my: 1 }}>
                  {review.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', my: 1 }}>
                  Caretaker: 
                  <Button
                    onClick={() => handleViewCaretakerDetails(review.caretakerId._id)}
                    sx={{ textTransform: 'none', color: '#007BFF' }}
                  >
                    {review.caretakerId.careTakerBusinessName}
                  </Button>
                </Typography>
                <Rating value={parseFloat(review.ratings)} readOnly precision={0.1} sx={{ display: 'flex', justifyContent: 'center' }} />
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      >
        <PrevArrow onClick={scrollLeft} />
        <NextArrow onClick={scrollRight} />
      </Box>
    </Container>
  );
}

