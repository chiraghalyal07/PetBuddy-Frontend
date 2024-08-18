import React,{ useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Tabs, Tab, Grid} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Services from './services';
import Mission from './mission';
import TopCareTakers from './topCareTakers';
import HappyParents from './happyParents';

import slider1 from '../../images/img-home-5.jpg';
import slider2 from '../../images/img-home-1.jpg';
import slider3 from '../../images/img-home-3.jpeg';
import slider4 from '../../images/img-home-2.jpeg';

import adoptpet  from '../../images/Adopt-pet.jpg';
import jobcaretaker from '../../images/Job-caretaker2.jpg'

// Array of images for slider
const sliderImages = [slider1, slider2, slider3, slider4];

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
            }}
        />
    );
}

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
   
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,//this is not visiable 
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        customPaging: (i) => (
            <div
                style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: i === currentSlide ? '#e6e6e6' : '#000',
                    display: 'inline-block',
                }}
            ></div>
        ),
    };

    const handleAdClick = () => {
        window.location.href = "https://sarvoham.org/";
    };



    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    mt: 4,
                    mb: 4,
                    position: 'relative',
                    width: '100%',
                    '& .slick-slide img': {
                        width: '100%',
                        height: 'auto',
                    },
                    '& .slick-list': {
                        overflow: 'hidden',
                    },
                    '& .slick-track': {
                        display: 'flex',
                        alignItems: 'center',
                    },
                    '& .slick-dots': {//provide onFocus like feature to a particular dot on a respective slide
                        position: 'absolute',
                        bottom: '10px',
                        display: 'flex !important',
                        justifyContent: 'center',
                        width: '100%',
                        padding: 0,
                        margin: 0,
                        listStyle: 'none',
                    },
                    '& .slick-dots li': {
                        margin: '0 5px',
                    },
                    '& .slick-dots button': {
                        display: 'none',
                    },
                    '& .slick-dots li.slick-active div': {
                        backgroundColor: '#fff', // Highlight the active dot
                        width: '12px',
                        height: '12px',
                    }
                }}
            >
                <Slider {...settings}>
                    {sliderImages.map((image, index) => (
                        <Box key={index}>
                            <img src={image} alt={`Slide ${index + 1}`} />
                        </Box>
                    ))}
                </Slider>
            </Box>
            <Services/><br/><br/>
            <Mission/><br/><br/>
            <TopCareTakers/><br/><br/>
            <HappyParents/><br/><br/>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 4,
                }}
            >
                <Grid item xs={12} md={9}
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                        },
                        transition: 'transform 0.3s, box-shadow 0.3s',
                    }}
                    onClick={handleAdClick}
                >
                    <Typography>
                        <img src={adoptpet} alt="Adopt Pet" style={{ width: '100%', borderRadius: '8px' }} />
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                        },
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        p: 2,
                        textAlign: 'center',
                    }}
                    onClick={handleAdClick}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            color: 'primary.main',
                            mb: 1,
                        }}
                    >
                        HELP..
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '16px',
                            color: 'text.secondary',
                            lineHeight: 1.5,
                        }}
                    >
                        The Speechless Animals by Adopting, Donating, Sponsoring, Rescuing  <br/><br/><br/><br/>                                  
                          click here
                    </Typography>
                </Grid>
            </Box><br/><br/><br/><br/>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 4,
                }}
            >
                <Grid item xs={12} md={4}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                        },
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        p: 2,
                        textAlign: 'center',
                    }}
                    onClick={()=> navigate(`/register`)}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            color: 'primary.main',
                            mb: 1,
                        }}
                    >
                        Join Our Team..
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '16px',
                            color: 'text.secondary',
                            lineHeight: 1.5,
                        }}
                    >
                       PetBuddy Opportunities Await: Join Our Team as CareTaker      <br/><br/><br/><br/>                                  
                          click here
                    </Typography>
                </Grid>
                <Grid item xs={12} md={8}
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                        },
                        transition: 'transform 0.3s, box-shadow 0.3s',
                    }}
                    onClick={()=> navigate(`/register`)}
                >
                    <Typography>
                        <img src={jobcaretaker} alt="Job Caretaker" style={{ width: '100%', borderRadius: '8px' }} />
                    </Typography>
                </Grid>
                
            </Box><br/><br/><br/><br/>
        </Container>
    );
}
