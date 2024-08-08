/*
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CareTakerSingleDetails = () => {
    const { id } = useParams();
    const [careTaker, setCareTaker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCareTaker = async () => {
            try {
                const response = await axios.get(`/api/singlecaretaker/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                setCareTaker(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setError('Something went wrong');
                setLoading(false);
            }
        };

        fetchCareTaker();
    }, []);

    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>CareTaker Details</h2>
            {careTaker.careTakerBusinessName ? (
                <div className='care-taker-card'>
                    {careTaker.userId ? (
                        <>
                            <p>Username: <b>{careTaker.userId.username}</b></p>
                            <p>Email: {careTaker.userId.email}</p>
                            <p>Phone: {careTaker.userId.phoneNumber}</p>
                        </>
                    ) : (
                        <p>User Information not available</p>
                    )}
                    <p>Care-Taker Business Name: {careTaker.careTakerBusinessName}</p>
                    <p>Address: {careTaker.address}</p>
                    <p>Bio: {careTaker.bio}</p>
                    <div>
                        <h3>Services:</h3>
                        {careTaker.serviceCharges && careTaker.serviceCharges.length > 0 ? (
                            careTaker.serviceCharges.map((charge, index) => (
                                <div key={index}>
                                    <p>Service Name: {charge.name}</p>
                                    <p>Service Amount: {charge.amount}</p>
                                    <p>Service Time: {charge.time}</p>
                                </div>
                            ))
                        ) : (
                            <p>No services available</p>
                        )}
                    </div>
                    <div>
                        <h3>Profile Photo</h3>
                        <img src={careTaker.photo} alt='Profile' style={{ maxWidth: '200px' }} />
                    </div>
                    <div>
                        <h3>Proof Document</h3>
                        {careTaker.proof ? (
                            careTaker.proof.endsWith('.pdf') ? (
                                <a href={careTaker.proof} target='_blank' rel='noreferrer'>View PDF</a>
                            ) : (
                                <img src={careTaker.proof} alt='Proof' style={{ maxWidth: '200px' }} />
                            )
                        ) : (
                            <p>No proof document available</p>
                        )}
                    </div>
                    <button onClick={() => navigate(`/create-booking/${id}`)}>Book Now</button>
                    
                </div>
            ) : (
                <div>
                    <p>No CareTaker profile found.</p>
                    <button onClick={() => navigate(`/create-caretaker`)}>Select Another CareTaker</button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default CareTakerSingleDetails;
*/

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';

// Fix the default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CareTakerSingleDetails = () => {
  const { id } = useParams();
  const [careTaker, setCareTaker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [isMapMaximized, setIsMapMaximized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCareTaker = async () => {
      try {
        const response = await axios.get(`/api/singlecaretaker/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setCareTaker(response.data);

        const address = response.data.address;
        const geocodeResponse = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            address
          )}&format=json&limit=1`
        );
        if (geocodeResponse.data.length > 0) {
          const { lat, lon } = geocodeResponse.data[0];
          setCoordinates([parseFloat(lat), parseFloat(lon)]);
        }

        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setError('Something went wrong');
        setLoading(false);
      }
    };

    fetchCareTaker();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Create a custom icon for the marker
  const customIcon = L.divIcon({
    className: 'custom-icon',
    html: `<img src="${careTaker.photo}" style="width: 40px; height: 40px; border-radius: 50%;" />`,
    iconSize: [40, 40], // Adjust size to fit your image
  });

  const handleMapToggle = () => {
    setIsMapMaximized(!isMapMaximized);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom><strong> CareTaker Details</strong></Typography>
      {careTaker.careTakerBusinessName ? (
        <Card style={{ marginBottom: '20px', backgroundColor: '#e6e6e6' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <div>
                  <Typography variant="h6"><strong>Profile Photo</strong></Typography>
                  <img
                    src={careTaker.photo}
                    alt="Profile"
                    style={{ maxWidth: '200px' }}
                  />
                </div>
                <div>
                  <Typography variant="h6"><strong>Proof Document</strong></Typography>
                  {careTaker.proof ? (
                    careTaker.proof.endsWith('.pdf') ? (
                      <a href={careTaker.proof} target="_blank" rel="noreferrer">
                        View PDF
                      </a>
                    ) : (
                      <img
                        src={careTaker.proof}
                        alt="Proof"
                        style={{ maxWidth: '200px' }}
                      />
                    )
                  ) : (
                    <Typography variant="body1">No proof document available</Typography>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>                 
                <Typography variant="body1"><b>Business Name:</b> {careTaker.careTakerBusinessName}</Typography>
                <Typography variant="body1"><b>Username:</b> {careTaker.userId.username}</Typography>
                <Typography variant="body1"><b>Email:</b> {careTaker.userId.email}</Typography>
                <Typography variant="body1"><b>Phone:</b> {careTaker.userId.phoneNumber}</Typography>
                <Typography variant="body1"><b>Address:</b> {careTaker.address}</Typography>
                <Typography variant="body1"><b>Bio:</b> {careTaker.bio}</Typography>
                <Typography variant="body1">
                      <strong>Verified Account:</strong> 
                      {careTaker.verifiedByAdmin ? 
                        <VerifiedRoundedIcon color="primary" style={{ marginLeft: 10 }} /> : 
                        <NewReleasesRoundedIcon color="error" style={{ marginLeft: 10 }} />}
                    </Typography>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Typography variant="h6"><strong>Services</strong></Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Service Name</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {careTaker.serviceCharges && careTaker.serviceCharges.length > 0 ? (
                      careTaker.serviceCharges.map((charge, index) => (
                        <TableRow key={index}>
                          <TableCell>{charge.name}</TableCell>
                          <TableCell>{charge.amount}</TableCell>
                          <TableCell>{charge.time}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3}>No services available</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/create-booking/${id}`)}
              >
                Book Now
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <div>
          <Typography variant="body1">No CareTaker profile found.</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate(`/create-caretaker`)}
          >
            Select Another CareTaker
          </Button>
        </div>
      )}
      <Box mt={4} display="flex" justifyContent="center">
        <Typography variant="h6"><strong>Location</strong></Typography>
      </Box>
      <Box
        position="relative"
        style={{
          height: isMapMaximized ? '400px' : '200px',
          width: isMapMaximized ? '100%' : '300px',
          margin: '0 auto', // Center the map horizontally
        }}
      >
        <MapContainer center={coordinates} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coordinates} icon={customIcon}>
            <Popup>
              <div>
                <Typography variant="body2">Address: {careTaker.address}</Typography>
                <Typography variant="body2">
                  Business Name: {careTaker.careTakerBusinessName}
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: careTaker.serviceCharges.map(charge => `<p>${charge.name}: ${charge.amount}</p>`).join('') }} />
              </div>
            </Popup>
          </Marker>
        </MapContainer>
        <IconButton
          style={{ position: 'absolute', top: 8, right: 8, color: 'black' }}
          onClick={handleMapToggle}
        >
          {isMapMaximized ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default CareTakerSingleDetails;
