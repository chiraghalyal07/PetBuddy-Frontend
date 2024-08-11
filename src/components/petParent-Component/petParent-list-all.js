/*
import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import {Link} from 'react-router-dom'
import {Box} from '@mui/material';

const PetParentList = () => {
  const [petParents, setPetParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetParents = async () => {
      try {
        const response = await axios.get('/api/allparents', {
          headers: {
            Authorization:localStorage.getItem('token')
          }
        });
        setPetParents(response.data);
       
        setLoading(false);
      } catch (errors) {
        console.error(errors);  // Log the error for debugging
        // const errorMsg = errors.response && errors.response.data
        //   ? errors.response.data.message || 'Error fetching pet parents'
        //   : 'Error fetching pet parents';
        setError(errors);
        setLoading(false);
      }
    };

    fetchPetParents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Pet Parents</h1>
      {petParents.map(petParent => (
        <div key={petParent._id} className="pet-parent-card">
          {petParent.userId ? (
            <>
              <h2>UserName: {petParent.userId.username}</h2>
              <p>Email: {petParent.userId.email}</p>
              <p>Phone: {petParent.userId.phoneNumber}</p>
            </>
          ) : (
            <p>User information not available</p>
          )}
          <p>Address: {petParent.address}</p>
          <div>
            <h3>Profile Photo:</h3>
            <img src={petParent.photo} alt="Profile" style={{ maxWidth: '200px' }} />
          </div>
          <div>
            <h3>Proof Document:</h3>
            {petParent.proof.endsWith('.pdf') ? (
              <a href={petParent.proof} target="_blank" rel="noopener noreferrer">View PDF</a>
            ) : (
              <img src={petParent.proof} alt="Proof" style={{ maxWidth: '200px' }} />
            )}
          </div>
          <Box mt={2}>
          <Link to={`/petparent-params-one/${petParent._id}`}>View Details</Link>
          </Box>
          
        </div>
      ))}
    </div>
  );
};

export default PetParentList;
*/
import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Link } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, Card, CardContent, CardMedia, Button } from '@mui/material';

const PetParentList = () => {
  const [petParents, setPetParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetParents = async () => {
      try {
        const response = await axios.get('/api/allparents', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        setPetParents(response.data);
        setLoading(false);
      } catch (errors) {
        console.error(errors);
        setError(errors.message || 'Error fetching pet parents');
        setLoading(false);
      }
    };

    fetchPetParents();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Pet Parents</Typography>
      {petParents.map(petParent => (
        <Card key={petParent._id} sx={{ mb: 3 }}>
          <CardContent>
            {petParent.userId ? (
              <>
                <Typography variant="h6">Username: {petParent.userId.username}</Typography>
                <Typography variant="body1">Email: {petParent.userId.email}</Typography>
                <Typography variant="body1">Phone: {petParent.userId.phoneNumber}</Typography>
              </>
            ) : (
              <Typography variant="body1">User information not available</Typography>
            )}
            <Typography variant="body1">Address: {petParent.address}</Typography>
            <Box mt={2}>
              <Typography variant="subtitle1">Profile Photo:</Typography>
              <CardMedia
                component="img"
                image={petParent.photo}
                alt="Profile"
                sx={{ maxWidth: '200px' }}
              />
            </Box>
            <Box mt={2}>
              <Typography variant="subtitle1">Proof Document:</Typography>
              {petParent.proof.endsWith('.pdf') ? (
                <Button
                  component="a"
                  href={petParent.proof}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  color="primary"
                >
                  View PDF
                </Button>
              ) : (
                <CardMedia
                  component="img"
                  image={petParent.proof}
                  alt="Proof"
                  sx={{ maxWidth: '200px' }}
                />
              )}
            </Box>
            <Box mt={2}>
              <Button
                component={Link}
                to={`/petparent-params-one/${petParent._id}`}
                variant="contained"
                color="secondary"
              >
                View Details
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PetParentList;
