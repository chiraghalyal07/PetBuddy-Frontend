/*
//Working all good without particular service
import React, { useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import boarding from '../../images/home-pet-boarding.jpg';
import sitting from '../../images/home-pet-sitting.jpg';
import walking from '../../images/home-pet-walking.jpg';
import grooming from '../../images/home-pet-grooming.jpg';
import taxi from '../../images/home-pet-taxi.jpg';
import training from '../../images/home-pet-training.jpg';
import vetconsult from '../../images/home-pet-vet-consult.jpg';

// Array of services
const services = [
  { image: boarding, name: 'Pet Boarding' },
  { image: sitting, name: 'Pet Sitting' },
  { image: walking, name: 'Pet-Walking' },
  { image: grooming, name: 'Pet Grooming' },
  { image: taxi, name: 'Pet Taxi' },
  { image: training, name: 'Pet Training' },
  { image: vetconsult, name: 'Vet-consult' },
];

function Services() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const handleServiceClick = (serviceName) => {
    navigate('/all-caretaker-v', { state: { search: serviceName } });
  };

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

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, position: 'relative' }}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#333',
            textTransform: 'uppercase',
          }}
        >
          Explore our Services.
        </Typography>
        <Box
          ref={sliderRef}
          id="service-slider"
          sx={{
            display: 'flex',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            whiteSpace: 'nowrap',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {services.map((service, index) => (
            <Box
              key={index}
              sx={{
                textAlign: 'center',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                mx: 1,
                minWidth: '160px',
                cursor: 'pointer',
                flex: '0 0 auto', // Ensures the items don’t shrink in size
              }}
              onClick={() => handleServiceClick(service.name)}
            >
              <img
                src={service.image}
                alt={service.name}
                style={{
                  width: '160px',
                  height: '110px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <Typography variant="body1" sx={{ mt: 1 }}>
                {service.name}
              </Typography>
            </Box>
          ))}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              mx: 1,
              minWidth: '160px',
              cursor: 'pointer',
              flex: '0 0 auto',
            }}
            onClick={() => handleServiceClick('Others...')}
          >
            <Typography variant="h6">Others...</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
          }}
        >
          <ArrowBackIos
            onClick={scrollLeft}
            sx={{
              cursor: 'pointer',
              fontSize: '24px',
              color: 'black',
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '5px',
            }}
          />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
          }}
        >
          <ArrowForwardIos
            onClick={scrollRight}
            sx={{
              cursor: 'pointer',
              fontSize: '24px',
              color: 'black',
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '5px',
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default Services;
*/
import React, { useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import axios from '../../config/axios';

import boarding from '../../images/home-pet-boarding.jpg';
import sitting from '../../images/home-pet-sitting.jpg';
import walking from '../../images/home-pet-walking.jpg';
import grooming from '../../images/home-pet-grooming.jpg';
import taxi from '../../images/home-pet-taxi.jpg';
import training from '../../images/home-pet-training.jpg';
import vetconsult from '../../images/home-pet-vet-consult.jpg';

// Array of services
const service = [
  { image: boarding, name: 'Pet-Boarding' },
  { image: sitting, name: 'Pet-Sitting' },
  { image: walking, name: 'Pet-Walking' },
  { image: grooming, name: 'Pet-Grooming' },
  { image: taxi, name: 'Pet-Taxi' },
  { image: training, name: 'Pet-Training' },
  { image: vetconsult, name: 'Vet-consult' },
];

function Services() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [careTakers, setCareTakers] = useState([]);

  const fetchCareTakers = async (serviceName) => {
    try {
      const response = await axios.get('/api/show-service', { params: { search: serviceName } });
      setCareTakers(response.data);
    } catch (error) {
      console.error('Error fetching caretakers:', error);
    }
  };

  const handleServiceClick = (serviceName) => {
    fetchCareTakers(serviceName);
    navigate(`/caretaker-service?service=${serviceName}`); 
  };

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

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, position: 'relative' }}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#333',
            textTransform: 'uppercase',
          }}
        >
          Explore our Services
        </Typography>
        <Box
          ref={sliderRef}
          id="service-slider"
          sx={{
            display: 'flex',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            whiteSpace: 'nowrap',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {service.map((service, index) => (
            <Box
              key={index}
              sx={{
                textAlign: 'center',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                mx: 1,
                minWidth: '160px',
                cursor: 'pointer',
                flex: '0 0 auto',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
                },
              }}
              onClick={() => handleServiceClick(service.name)}
            >
              <img
                src={service.image}
                alt={service.name}
                style={{
                  width: '160px',
                  height: '110px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <Typography variant="body1" sx={{ mt: 1 }}>
                {service.name}
              </Typography>
            </Box>
          ))}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              mx: 1,
              minWidth: '160px',
              cursor: 'pointer',
              flex: '0 0 auto',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
              },
            }}
            onClick={() => handleServiceClick('Others...')}
          >
            <Typography variant="h6">Others...</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
          }}
        >
          <ArrowBackIos
            onClick={scrollLeft}
            sx={{
              cursor: 'pointer',
              fontSize: '24px',
              color: 'black',
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '5px',
            }}
          />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
          }}
        >
          <ArrowForwardIos
            onClick={scrollRight}
            sx={{
              cursor: 'pointer',
              fontSize: '24px',
              color: 'black',
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '5px',
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default Services;

