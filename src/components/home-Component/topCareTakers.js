/*
import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Link } from 'react-router-dom';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Box,
    CircularProgress,
    Rating,
  } from '@mui/material';

const TopCareTakers = () => {
    const [careTakers, setCareTakers] = useState([]);
    const [completedBookings, setCompletedBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [ratings, setRatings] = useState({});

    function NextArrow({ onClick }) {
        return (
            <ArrowForwardIos
                onClick={onClick}
                sx={{
                    cursor: 'pointer',
                    fontSize: '24px',
                    color: 'black',
                    position: 'absolute',
                    right: '0px',
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
                    left: '0px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                }}
            />
        );
    }

    useEffect(() => {
        const fetchCareTakers = async () => {
            try {
                const response = await axios.get(`/api/allcaretakers`);
                const careTakersData = response.data;
                setCareTakers(careTakersData);

                const ratingsData = {};
                await Promise.all(careTakersData.map(async (careTaker) => {
                    try {
                        const ratingResponse = await axios.get(`/caretaker-ratings/${careTaker._id}`);
                        ratingsData[careTaker._id] = ratingResponse.data;
                    } catch (ratingError) {
                        console.error(`Failed to fetch ratings for caretaker ${careTaker._id}:`, ratingError);
                    }
                }));

                setRatings(ratingsData);
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
    }, []);

    if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
    if (errors) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography color="error">An error occurred. Please try again later.</Typography></Box>;

    const scrollRight = () => {
        document.getElementById('service-slider').scrollBy({ left: 200, behavior: 'smooth' });
    };

    const scrollLeft = () => {
        document.getElementById('service-slider').scrollBy({ left: -200, behavior: 'smooth' });
    };

    return (
        <Container sx={{ position: 'relative', padding: 0 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: '#333', textTransform: 'uppercase' }}>
                Our Professionals
            </Typography>
            <Box
                id="service-slider"
                sx={{
                    textAlign: 'justify',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '10px',
                    mx: 1,
                    minWidth: '160px',
                    cursor: 'pointer',
                    display: 'flex',
                    width: '100%',
                    overflowX: 'auto',
                    scrollBehavior: 'smooth',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            ><Grid container spacing={3}>
                {careTakers.map(careTaker => {
                    const completedBooking = completedBookings.find(cb => cb.caretakerId === careTaker._id);
                    const rating = ratings[careTaker._id] || { totalRating: 'N/A', numberOfRatings: 0 };

                    return (
                        <Card key={careTaker._id} sx={{ mb: 2, mx: 1, backgroundColor: '#e6e6e6', minWidth: '300px' }}>
                            <CardContent>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <CardMedia
                                        component="img"
                                        alt="Profile"
                                        image={careTaker.photo}
                                        sx={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                    <Typography variant="body1" mt={2}>
                                        {careTaker.careTakerBusinessName}
                                        {careTaker.verifiedByAdmin ?
                                            <VerifiedRoundedIcon color="primary" sx={{ ml: 1 }} /> :
                                            <NewReleasesRoundedIcon color="error" sx={{ ml: 1 }} />}
                                    </Typography>
                                    <Typography variant="body1">Services: {careTaker.serviceCharges.map((charge) => charge.name).join(', ')}</Typography>
                                    <Typography variant="body1">{careTaker.bio}</Typography>
                                    <Typography variant="body1">
                                        <Rating value={parseFloat(rating.totalRating)} readOnly precision={0.1} /> {rating.totalRating}
                                    </Typography>
                                    <Typography variant="body1"><b>Completed Bookings:</b> {completedBooking ? completedBooking.completedBookings : 'N/A'}</Typography>
                                </Box>
                                <Box mt={2} textAlign="center">
                                    <Link to={`/caretaker-params-one/${careTaker._id}`}>View Details</Link>
                                </Box>
                            </CardContent>
                        </Card>
                    );
                })}
                </Grid>
            </Box>
            <PrevArrow onClick={scrollLeft} />
            <NextArrow onClick={scrollRight} />
        </Container>
    );
}

export default TopCareTakers;


*/
/*
import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Link } from 'react-router-dom';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Box,
    CircularProgress,
    Rating,
} from '@mui/material';

const TopCareTakers = () => {
    const [careTakers, setCareTakers] = useState([]);
    const [completedBookings, setCompletedBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [ratings, setRatings] = useState({});

    function NextArrow({ onClick }) {
        return (
            <ArrowForwardIos
                onClick={onClick}
                sx={{
                    cursor: 'pointer',
                    fontSize: '24px',
                    color: 'black',
                    position: 'absolute',
                    right: '0px',
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
                    left: '0px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                }}
            />
        );
    }

    useEffect(() => {
        const fetchCareTakers = async () => {
            try {
                const response = await axios.get(`/api/allcaretakers`);
                const careTakersData = response.data;
                setCareTakers(careTakersData);

                const ratingsData = {};
                await Promise.all(careTakersData.map(async (careTaker) => {
                    try {
                        const ratingResponse = await axios.get(`/caretaker-ratings/${careTaker._id}`);
                        ratingsData[careTaker._id] = ratingResponse.data;
                    } catch (ratingError) {
                        console.error(`Failed to fetch ratings for caretaker ${careTaker._id}:`, ratingError);
                    }
                }));

                setRatings(ratingsData);
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
    }, []);

    if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
    if (errors) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography color="error">An error occurred. Please try again later.</Typography></Box>;

    const scrollRight = () => {
        console.log('right')
        document.getElementById('service-slider').scrollBy({ left: 200, behavior: 'smooth' });
    };

    const scrollLeft = () => {
        console.log('left')
        document.getElementById('service-slider').scrollBy({ left: -200, behavior: 'smooth' });
    };

    return (
        <Container sx={{ position: 'relative', padding: 0 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: '#333', textTransform: 'uppercase' }}>
                Our Professionals
            </Typography>
            <Box
                id="service-slider"
                sx={{
                    textAlign: 'justify',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '10px',
                    mx: 1,
                    minWidth: '160px',
                    cursor: 'pointer',
                    display: 'flex',
                    width: '100%',
                    overflowX: 'auto',
                    scrollBehavior: 'smooth',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                <Grid container spacing={3}>
                    {careTakers.map(careTaker => {
                        const completedBooking = completedBookings.find(cb => cb.caretakerId === careTaker._id);
                        const rating = ratings[careTaker._id] || { totalRating: 'N/A', numberOfRatings: 0 };

                        return (
                            <Link to={`/caretaker-params-one/${careTaker._id}`} key={careTaker._id} style={{ textDecoration: 'none' }}>
                                <Card sx={{ mb: 2, mx: 1,  minWidth: '300px', cursor: 'pointer' }}>
                                    <CardContent>
                                        <Box display="flex" flexDirection="column" alignItems="center">
                                            <CardMedia
                                                component="img"
                                                alt="Profile"
                                                image={careTaker.photo}
                                                sx={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }}
                                            />
                                            <Typography variant="body1" mt={2} color="textPrimary">
                                                {careTaker.careTakerBusinessName}
                                                {careTaker.verifiedByAdmin ?
                                                    <VerifiedRoundedIcon color="primary" sx={{ ml: 1 }} /> :
                                                    <NewReleasesRoundedIcon color="error" sx={{ ml: 1 }} />}
                                            </Typography>
                                            <Typography variant="body1" color="textSecondary">Services: {careTaker.serviceCharges.map((charge) => charge.name).join(', ')}</Typography>
                                            <Typography variant="body1" color="textSecondary">{careTaker.bio}</Typography>
                                            <Typography variant="body1">
                                                <Rating value={parseFloat(rating.totalRating)} readOnly precision={0.1} /> {rating.totalRating}
                                            </Typography>
                                            <Typography variant="body1" color="textSecondary"><b>Completed Bookings:</b> {completedBooking ? completedBooking.completedBookings : 'N/A'}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </Grid>
            </Box>
            <PrevArrow onClick={scrollLeft} />
            <NextArrow onClick={scrollRight} />
        </Container>
    );
}

export default TopCareTakers;
*/
import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Link } from 'react-router-dom';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Box,
    CircularProgress,
    Rating,
} from '@mui/material';

const TopCareTakers = () => {
    const [careTakers, setCareTakers] = useState([]);
    const [completedBookings, setCompletedBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [ratings, setRatings] = useState({});

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
        const fetchCareTakers = async () => {
            try {
                const response = await axios.get(`/api/allcaretakers`);
                const careTakersData = response.data;
                setCareTakers(careTakersData);

                const ratingsData = {};
                await Promise.all(careTakersData.map(async (careTaker) => {
                    try {
                        const ratingResponse = await axios.get(`/caretaker-ratings/${careTaker._id}`);
                        ratingsData[careTaker._id] = ratingResponse.data;
                    } catch (ratingError) {
                        console.error(`Failed to fetch ratings for caretaker ${careTaker._id}:`, ratingError);
                    }
                }));

                setRatings(ratingsData);
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
    }, []);

    if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
    if (errors) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography color="error">An error occurred. Please try again later.</Typography></Box>;

    const scrollRight = () => {
        document.getElementById('service-slider').scrollBy({ left: 300, behavior: 'smooth' });
    };

    const scrollLeft = () => {
        document.getElementById('service-slider').scrollBy({ left: -300, behavior: 'smooth' });
    };

    return (
        <Container sx={{ position: 'relative', padding: 0 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: '#333', textTransform: 'uppercase' }}>
                Our Professionals
            </Typography>
            <Box
                id="service-slider"
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
                <Grid container spacing={3}>
                    {careTakers.map(careTaker => {
                        const completedBooking = completedBookings.find(cb => cb.caretakerId === careTaker._id);
                        const rating = ratings[careTaker._id] || { totalRating: 'N/A', numberOfRatings: 0 };

                        return (
                            <Link to={`/caretaker-params-one/${careTaker._id}`} key={careTaker._id} style={{ textDecoration: 'none' }}>
                                <Card sx={{
                                    mb: 2,
                                    mx: 1,
                                    minWidth: '300px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                                    }
                                }}>
                                    <CardContent>
                                        <Box display="flex" flexDirection="column" alignItems="center">
                                            <CardMedia
                                                component="img"
                                                alt="Profile"
                                                image={careTaker.photo}
                                                sx={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }}
                                            />
                                            <Typography variant="body1" mt={2} color="textPrimary">
                                                {careTaker.careTakerBusinessName}
                                                {careTaker.verifiedByAdmin ?
                                                    <VerifiedRoundedIcon color="primary" sx={{ ml: 1 }} /> :
                                                    <NewReleasesRoundedIcon color="error" sx={{ ml: 1 }} />}
                                            </Typography>
                                            <Typography variant="body1" color="textSecondary">Services: {careTaker.serviceCharges.map((charge) => charge.name).join(', ')}</Typography>
                                            <Typography variant="body1" color="textSecondary">{careTaker.bio}</Typography>
                                            <Typography variant="body1">
                                                <Rating value={parseFloat(rating.totalRating)} readOnly precision={0.1} /> {rating.totalRating}
                                            </Typography>
                                            <Typography variant="body1" color="textSecondary"><b>Completed Bookings:</b> {completedBooking ? completedBooking.completedBookings : 'N/A'}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </Grid>
            </Box>
            <PrevArrow onClick={scrollLeft} />
            <NextArrow onClick={scrollRight} />
        </Container>
    );
};

export default TopCareTakers;
