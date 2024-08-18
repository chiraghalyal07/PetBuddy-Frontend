/*
import React,{useEffect,useState} from 'react';
import axios from '../../config/axios';
import {Link} from 'react-router-dom'

const CareTakerAVList = () =>{
    const [careTakers,setCareTakers] = useState([]);
    const [loading,setLoading] = useState(true);
    const [errors,setErrors] = useState(null);
    useEffect(() =>{
        const fetchCareTakers = async () =>{
            try{
                const response = await axios.get('/api/allcaretakers',{
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                });
                setCareTakers(response.data);
                setLoading(false);
            }catch(errors){
                console.log(errors.message)
                setErrors(errors);
                setLoading(false);
            }
        };
        fetchCareTakers();
    },[]);

    if(loading)return<div>Loading...</div>;
    if(errors)return<div>{errors}</div>

    return(
        <div>
            <h2>Verified Caretakers List</h2>
            {careTakers.map(careTaker =>(
                <div key={careTaker._id} className='care-taker-card'>
                    {careTaker.userId ?(
                        <>
                        <h2>{careTaker.userId.username}</h2>
                        <p>Email:{careTaker.userId.email}</p>
                        <p>Phone:{careTaker.userId.phoneNumber}</p>
                        </>
                    ):(
                        <p>User Information not available</p>
                    )}
                    <p>Care-Taker Business Name:{careTaker.careTakerBusinessName}</p>
                    <p>Address:{careTaker.address}</p>
                    <p>Bio:{careTaker.bio}</p>
                    <div>
                        <h3>Services:</h3>
                        {careTaker.serviceCharges.map((charge, index) => (
                            <div key={index}>
                                <p>Service Name: {charge.name}</p>
                                <p>Service Amount: {charge.amount}</p>
                                <p>Service Time: {charge.time}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3>Profile Photo</h3>
                        <img src={careTaker.photo} alt='Profile' style={{maxWidth:'200px'}}/>
                    </div>
                    <div>
                        <h3>Proof Document</h3>
                        {careTaker.proof.endsWith('.pdf')?(
                            <a href={careTaker.proof} target='_blank' rel='noreferrer'>View PDF</a>
                        ):(
                            <img src={careTaker.proof} alt='Proof' style={{maxWidth:'200px'}}/>
                        )}
                    </div>
                    <Link to={`/caretaker-params-one/${careTaker._id}`}>View Details</Link>
                </div>
            ))}
        </div>
    )
}
export default CareTakerAVList
// const search = req.query.search||''
// const searchQuery = {adderss:{$regex:search,$options:'i'}}
// const searchedOne = await response.find(searchQuery)
*/

import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Link } from 'react-router-dom';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CircularProgress,
  Rating,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix the default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const CareTakerAVList = () => {
  const [careTakers, setCareTakers] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [search, setSearch] = useState('');
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [mapZoom, setMapZoom] = useState(13);
  const [ratings, setRatings] = useState({});


  useEffect(() => {
    const fetchCareTakers = async () => {
      try {
        const response = await axios.get(`/api/allcaretakers?search=${search}`);
        const careTakersData = response.data;
        setCareTakers(careTakersData);

        // Fetch ratings data for each caretaker
        const ratingsData = {};
        await Promise.all(careTakersData.map(async (careTaker) => {
          try {
            console.log('iiiddd:',careTaker._id)
            const ratingResponse = await axios.get(`/caretaker-ratings/${careTaker._id}`);
            ratingsData[careTaker._id] = ratingResponse.data;
          } catch (ratingError) {
            console.error(`Failed to fetch ratings for caretaker ${careTaker._id}:`, ratingError);
          }
        }));
        console.log('rate:',ratingsData)
        setRatings(ratingsData);

        
        // Handle multiple locations for search results
        if (response.data.length > 0) {
          const latitudes = response.data.map(careTaker => careTaker.location.coordinates[1]);
          const longitudes = response.data.map(careTaker => careTaker.location.coordinates[0]);

          // Update map center and zoom based on locations
          const avgLat = latitudes.reduce((a, b) => a + b) / latitudes.length;
          const avgLng = longitudes.reduce((a, b) => a + b) / longitudes.length;

          setMapCenter([avgLat, avgLng]);
          setMapZoom(13);
        }
        
        setLoading(false);
      } catch (errors) {
        console.log(errors.message);
        setErrors(errors);
        setLoading(false);
      }
    };
    const fetchCompletedBookings = async () => {
      try {
        const response = await axios.get('/api/caretaker-book-count');
        setCompletedBookings(response.data);
      } catch (errors) {
        console.log(errors.message);
        setErrors(errors);
      }
    };

    fetchCareTakers();
    fetchCompletedBookings();
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (errors) return <div>{errors}</div>;


  const hasSearchResults = search && careTakers.length > 0;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Verified Caretakers List
      </Typography>
      <TextField
        label="Search by Business Name or Address"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      {hasSearchResults && (
        <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '400px', marginBottom: '20px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {careTakers
            .filter(careTaker => careTaker.location && careTaker.location.coordinates.length === 2)
            .map(careTaker => (
              <Marker
                key={careTaker._id}
                position={[careTaker.location.coordinates[1], careTaker.location.coordinates[0]]}
                icon={defaultIcon} // Use default icon for debugging
                
              >
                <Popup>
                  <div>
                    <Typography variant="body1"><b>Business Name:</b> {careTaker.careTakerBusinessName}</Typography>
                    <Typography variant="body1"><b>Address:</b> {careTaker.address}</Typography>
                    {careTaker.serviceCharges.map((charge, index) => (
                      <Typography variant="body2" key={index}>
                        {charge.name}: {charge.amount}
                      </Typography>
                    ))}
                    <Link to={`/caretaker-params-one/${careTaker._id}`}>View Details</Link>
                  </div>
                </Popup>
              </Marker>
            ))
          }
        </MapContainer>
      )}
      {careTakers.map(careTaker => {
        const completedBooking = completedBookings.find(cb => cb.caretakerId === careTaker._id);
        const rating = ratings[careTaker._id] || { totalRating: 'N/A', numberOfRatings: 0 };
         return (
            <Card key={careTaker._id} style={{ marginBottom: '20px', backgroundColor: '#e6e6e6' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="body1"><b>Business Name:</b> {careTaker.careTakerBusinessName}</Typography>
                  <Typography variant="body1"><b>Address:</b> {careTaker.address}</Typography>
                  <Typography variant="body1"><b>Bio:</b> {careTaker.bio}</Typography>
                  <Typography variant="body1">
                    <strong>Verified Account:</strong> 
                    {careTaker.verifiedByAdmin ? 
                      <VerifiedRoundedIcon color="primary" style={{ marginLeft: 10 }} /> : 
                      <NewReleasesRoundedIcon color="error" style={{ marginLeft: 10 }} />}
                  </Typography> <Typography variant="body1"><b>Completed Bookings:</b> {completedBooking ? completedBooking.completedBookings : 'N/A'}</Typography>
                   <Typography variant="body1"><b>Rating:</b><Rating value={parseFloat(rating.totalRating)} readOnly precision={0.1} /> {rating.totalRating}</Typography>
                  
                  
                  <Typography variant="h6"><strong>Services:</strong></Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Service Name</TableCell>
                          <TableCell>Service Amount</TableCell>
                          <TableCell>Service Time</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {careTaker.serviceCharges.map((charge, index) => (
                          <TableRow key={index}>
                            <TableCell>{charge.name}</TableCell>
                            <TableCell>{charge.amount}</TableCell>
                            <TableCell>{charge.time}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box>
                  <CardMedia
                    component="img"
                    alt="Profile"
                    image={careTaker.photo}
                    style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                  <Typography variant="h6">Proof Document</Typography>
                  {careTaker.proof.endsWith('.pdf') ? (
                    <a href={careTaker.proof} target="_blank" rel="noreferrer">View PDF</a>
                  ) : (
                    <img src={careTaker.proof} alt="Proof" style={{ maxWidth: '200px' }} />
                  )}
                </Box>
              </Box>
              <Box mt={2}>
                <Link to={`/caretaker-params-one/${careTaker._id}`}>View Details</Link>
              </Box>
            </CardContent>
          </Card>
         );
         })}
    </Container>
  );
};

export default CareTakerAVList;

/*
//working all good
import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Link } from 'react-router-dom';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Rating,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix the default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const CareTakerAVList = () => {
  const [careTakers, setCareTakers] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [search, setSearch] = useState('');
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [mapZoom, setMapZoom] = useState(13);
  const [ratings, setRatings] = useState({});


  useEffect(() => {
    const fetchCareTakers = async () => {
      try {
        const response = await axios.get(`/api/allcaretakers?search=${search}`);
        const careTakersData = response.data;
        setCareTakers(careTakersData);

        // Fetch ratings data for each caretaker
        const ratingsData = {};
        await Promise.all(careTakersData.map(async (careTaker) => {
          try {
            console.log('iiiddd:', careTaker._id);
            const ratingResponse = await axios.get(`/caretaker-ratings/${careTaker._id}`);
            ratingsData[careTaker._id] = ratingResponse.data;
          } catch (ratingError) {
            console.error(`Failed to fetch ratings for caretaker ${careTaker._id}:`, ratingError);
          }
        }));
        console.log('rate:', ratingsData);
        setRatings(ratingsData);

        // Handle multiple locations for search results
        if (response.data.length > 0) {
          const latitudes = response.data.map(careTaker => careTaker.location.coordinates[1]);
          const longitudes = response.data.map(careTaker => careTaker.location.coordinates[0]);

          // Update map center and zoom based on locations
          const avgLat = latitudes.reduce((a, b) => a + b) / latitudes.length;
          const avgLng = longitudes.reduce((a, b) => a + b) / longitudes.length;

          setMapCenter([avgLat, avgLng]);
          setMapZoom(13);
        }

        setLoading(false);
      } catch (errors) {
        console.log(errors.message);
        setErrors(errors);
        setLoading(false);
      }
    };

    const fetchCompletedBookings = async () => {
      try {
        const response = await axios.get('/api/caretaker-book-count');
        setCompletedBookings(response.data);
      } catch (errors) {
        console.log(errors.message);
        setErrors(errors);
      }
    };

    fetchCareTakers();
    fetchCompletedBookings();
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (errors) return <div>{errors}</div>;

  const hasSearchResults = search && careTakers.length > 0;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Verified Caretakers List
      </Typography>
      <TextField
        label="Search by Business Name or Address or Service-Name"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      {hasSearchResults && (
        <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '400px', marginBottom: '20px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {careTakers
            .filter(careTaker => careTaker.location && careTaker.location.coordinates.length === 2)
            .map(careTaker => (
              <Marker
                key={careTaker._id}
                position={[careTaker.location.coordinates[1], careTaker.location.coordinates[0]]}
                icon={defaultIcon} // Use default icon for debugging
              >
                <Popup>
                  <div>
                    <Typography variant="body1"><b>Business Name:</b> {careTaker.careTakerBusinessName}</Typography>
                    <Typography variant="body1"><b>Address:</b> {careTaker.address}</Typography>
                    {careTaker.serviceCharges.map((charge, index) => (
                      <Typography variant="body2" key={index}>
                        {charge.name}: {charge.amount}
                      </Typography>
                    ))}
                    <Link to={`/caretaker-params-one/${careTaker._id}`}>View Details</Link>
                  </div>
                </Popup>
              </Marker>
            ))
          }
        </MapContainer>
      )}
      {careTakers.map(careTaker => {
        const completedBooking = completedBookings.find(cb => cb.caretakerId === careTaker._id);
        const rating = ratings[careTaker._id] || { totalRating: 'N/A', numberOfRatings: 0 };
        return (
          <Card key={careTaker._id} style={{ marginBottom: '20px', backgroundColor: '#e6e6e6' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="body1"><b>Business Name:</b> {careTaker.careTakerBusinessName}</Typography>
                  <Typography variant="body1"><b>Address:</b> {careTaker.address}</Typography>
                  <Typography variant="body1"><b>Bio:</b> {careTaker.bio}</Typography>
                  <Typography variant="body1">
                    <strong>Verified Account:</strong>
                    {careTaker.verifiedByAdmin ?
                      <VerifiedRoundedIcon color="primary" style={{ marginLeft: 10 }} /> :
                      <NewReleasesRoundedIcon color="error" style={{ marginLeft: 10 }} />}
                  </Typography>
                  <Typography variant="body1"><b>Completed Bookings:</b> {completedBooking ? completedBooking.completedBookings : 'N/A'}</Typography>
                  <Typography variant="body1"><b>Rating:</b><Rating value={parseFloat(rating.totalRating)} readOnly precision={0.1} /> {rating.totalRating}</Typography>

                  <Typography variant="h6"><strong>Services:</strong></Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Service Name</TableCell>
                          <TableCell>Service Amount</TableCell>
                          <TableCell>Service Time</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {careTaker.serviceCharges.map((charge, index) => (
                          <TableRow key={index}>
                            <TableCell>{charge.name}</TableCell>
                            <TableCell>{charge.amount}</TableCell>
                            <TableCell>{charge.time}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box>
                  <CardMedia
                    component="img"
                    style={{ maxWidth: '200px', borderRadius: '10px' }}
                    image={careTaker.photo}
                    alt="Caretaker Profile Picture"
                  />
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="20px">
                <Link to={`/caretaker-params-one/${careTaker._id}`}>More Details</Link>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Container>
  );
};

export default CareTakerAVList;
*/