/*
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from '@mui/material';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded';

const PetParentDetailParamsId = () => {
  const { id } = useParams();
  const [petParent, setPetParent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetParent = async () => {
      try {
        const response = await axios.get(`/api/singleparent/${id}`);
        setPetParent(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setError('Something went wrong');
        setLoading(false);
      }
    };

    fetchPetParent();
  }, [id]);
 


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom><strong>Pet Parent Details</strong></Typography>
      {petParent ? (
        <Card style={{ marginBottom: '20px', backgroundColor: '#e6e6e6' }}>
          <CardContent>
            <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Typography variant="h6"><strong>Profile Photo</strong></Typography>
                <img
                  src={petParent.photo}
                  alt="Profile"
                  style={{ maxWidth: '200px'}}
                />
                <Typography variant="h6"><strong>Proof Document</strong></Typography>
                {petParent.proof.endsWith('.pdf') ? (
                  <a href={petParent.proof} target="_blank" rel="noopener noreferrer">
                    View PDF
                  </a>
                ) : (
                  <img
                    src={petParent.proof}
                    alt="Proof"
                    style={{ maxWidth: '200px' }}
                   
                  />
                )}
              </Grid>

              <Grid item xs={12} md={8}>
                <div>
                  <Typography variant="h6"><strong>Username</strong></Typography>
                  <Typography variant="body1">{petParent.userId.username}</Typography>
                </div>
                <div>
                  <Typography variant="h6"><strong>Email</strong></Typography>
                  <Typography variant="body1">{petParent.userId.email}</Typography>
                </div>
                <div>
                  <Typography variant="h6"><strong>Phone</strong></Typography>
                  <Typography variant="body1">{petParent.userId.phoneNumber}</Typography>
                </div>
                <div>
                  <Typography variant="h6"><strong>Verified Account</strong></Typography>
                  {petParent.userId.isVerified ? (
                    <VerifiedRoundedIcon color="primary" style={{ marginLeft: 10 }} />
                  ) : (
                    <NewReleasesRoundedIcon color="error" style={{ marginLeft: 10 }} />
                  )}
                </div>
                <div>
                <Typography variant="h6"><strong>Address</strong></Typography>
                <Typography variant="body1">{petParent.address}</Typography>
                </div>
               
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <div>
          <Typography variant="body1">No Pet Parent profile found.</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/all-petparents')}
          >
            Select Another Pet Parent
          </Button>
        </div>
      )}
      <ToastContainer />
    </Container>
  );
};

export default PetParentDetailParamsId;
*/

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from '@mui/material';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded';

const PetParentDetailParamsId = () => {
  const { id } = useParams();
  const [petParent, setPetParent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetParent = async () => {
      try {
        const response = await axios.get(`/api/singleparent/${id}`);
        setPetParent(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setError('Something went wrong');
        setLoading(false);
      }
    };

    fetchPetParent();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`/api/deleteparent/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          toast.success("Profile deleted successfully.");
          navigate('/all-petparents'); // Redirect after successful deletion
        }
      } catch (error) {
        toast.error("Failed to delete profile. Please try again.");
        console.error(error.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  return (
    <Container>
      <Typography variant="h4" gutterBottom><strong>Pet Parent Details</strong></Typography>
      {petParent ? (
        <Card style={{ marginBottom: '20px', backgroundColor: '#e6e6e6' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6"><strong>Profile Photo</strong></Typography>
                <img
                  src={petParent.photo}
                  alt="Profile"
                  style={{ maxWidth: '200px' }}
                />
                <Typography variant="h6"><strong>Proof Document</strong></Typography>
                {petParent.proof.endsWith('.pdf') ? (
                  <a href={petParent.proof} target="_blank" rel="noopener noreferrer">
                    View PDF
                  </a>
                ) : (
                  <img
                    src={petParent.proof}
                    alt="Proof"
                    style={{ maxWidth: '200px' }}
                  />
                )}
              </Grid>

              <Grid item xs={12} md={8}>
                <div>
                  <Typography variant="h6"><strong>Username</strong></Typography>
                  <Typography variant="body1">{petParent.userId.username}</Typography>
                </div>
                <div>
                  <Typography variant="h6"><strong>Email</strong></Typography>
                  <Typography variant="body1">{petParent.userId.email}</Typography>
                </div>
                <div>
                  <Typography variant="h6"><strong>Phone</strong></Typography>
                  <Typography variant="body1">{petParent.userId.phoneNumber}</Typography>
                </div>
                <div>
                  <Typography variant="h6"><strong>Verified Account</strong></Typography>
                  {petParent.userId.isVerified ? (
                    <VerifiedRoundedIcon color="primary" style={{ marginLeft: 10 }} />
                  ) : (
                    <NewReleasesRoundedIcon color="error" style={{ marginLeft: 10 }} />
                  )}
                </div>
                <div>
                  <Typography variant="h6"><strong>Address</strong></Typography>
                  <Typography variant="body1">{petParent.address}</Typography>
                </div>
                {userRole === 'admin' && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDelete}
                    style={{ marginTop: '20px' }}
                  >
                    Delete Profile
                  </Button>
                )}
                <Button onClick={()=>navigate(`/pet-single-parent/${id}`)}>View-Pet-Details</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <div>
          <Typography variant="body1">No Pet Parent profile found.</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/all-petparents')}
          >
            Select Another Pet Parent
          </Button>
        </div>
      )}
      <ToastContainer />
    </Container>
  );
};

export default PetParentDetailParamsId;
