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

/*
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
} from '@mui/material';

const CareTakerAVList = () => {
  const [careTakers, setCareTakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCareTakers = async () => {
      try {
        const response = await axios.get('/api/allcaretakers', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setCareTakers(response.data);
        setLoading(false);
      } catch (errors) {
        console.log(errors.message);
        setErrors(errors);
        setLoading(false);
      }
    };
    fetchCareTakers();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCareTakers = careTakers.filter(careTaker =>
    careTaker.careTakerBusinessName.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (errors) return <div>{errors}</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Verified Caretakers List
      </Typography>
      <TextField
        label="Search by Business Name"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      {filteredCareTakers.map(careTaker => (
        <Card key={careTaker._id} style={{ marginBottom: '20px' }}>
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
      ))}
    </Container>
  );
};

export default CareTakerAVList;
//working good without leaflet
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
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Function to create custom marker icons
const createIcon = (url) => {
  return new L.Icon({
    iconUrl: url,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
    className: 'leaflet-marker-icon'
  });
};

const CareTakerAVList = () => {
  const [careTakers, setCareTakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCareTakers = async () => {
      try {
        const response = await axios.get('/api/allcaretakers', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setCareTakers(response.data);
        setLoading(false);
      } catch (errors) {
        console.log(errors.message);
        setErrors(errors);
        setLoading(false);
      }
    };
    fetchCareTakers();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCareTakers = careTakers.filter(careTaker =>
    careTaker.careTakerBusinessName.toLowerCase().includes(search.toLowerCase()) ||
    careTaker.address.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (errors) return <div>{errors}</div>;

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
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', marginBottom: '20px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredCareTakers
          .filter(careTaker => careTaker.latitude && careTaker.longitude)
          .map(careTaker => (
            <Marker
              key={careTaker._id}
              position={[careTaker.latitude, careTaker.longitude]}
              icon={createIcon(careTaker.photo)}
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
      {filteredCareTakers.map(careTaker => (
        <Card key={careTaker._id} style={{ marginBottom: '20px', backgroundColor: '#f6be7e' }}>
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
      ))}
    </Container>
  );
};

export default CareTakerAVList;
