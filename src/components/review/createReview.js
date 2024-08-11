import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../actions/reviewAction';
import { Container, Typography, TextField, Button, Card, CardContent, CircularProgress } from '@mui/material';
import { Rating } from '@mui/material'; // Material UI Rating component
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

export default function CreateReview() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    ratings: 0,
    description: '',
    photos: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const reviewState = useSelector((state) => state.review);

  const handleChange = (e) => {
    if (e.target.name === 'photos') {
      const file = e.target.files[0];
      setFormData({ ...formData, photos: file });
      setPhotoPreview(URL.createObjectURL(file)); // Set the photo preview URL
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({ ...formData, ratings: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      const data = new FormData();
      data.append('ratings', formData.ratings);
      data.append('description', formData.description);
      if (formData.photos) {
        data.append('photos', formData.photos);
      }
      dispatch(createReview(id, data));
    } else {
      console.error('Booking ID is undefined');
    }
  };

  // Watch for reviewState.review to navigate upon successful review creation
  React.useEffect(() => {
    if (reviewState.review._id) {
      navigate(`/booking-details/${id}`);
    }
  }, [reviewState.review, navigate]);

  return (
    <Container>
      <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Review
          </Typography>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" component="div" sx={{ mt: 2 }}>
              Rating:
            </Typography>
            <Rating
              name="ratings"
              value={formData.ratings}
              onChange={handleRatingChange}
              precision={0.5}
            />
            <TextField
              fullWidth
              name="description"
              label="Description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              sx={{ mt: 2 }}
              required
            />
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2 }}
            >
              Upload Photos
              <input
                type="file"
                name="photos"
                onChange={handleChange}
                hidden
              />
            </Button>
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Photo Preview"
                style={{ marginTop: '20px', maxWidth: '100%' }}
              />
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit Review
            </Button>
            {reviewState.loading && <CircularProgress sx={{ mt: 2 }} />}
            {reviewState.error && (
              <Typography color="error" sx={{ mt: 2 }}>
                Error: {reviewState.error}
              </Typography>
            )}
            {reviewState.review._id && (
              <Typography color="success" sx={{ mt: 2 }}>
                Review created successfully!
              </Typography>
            )}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}