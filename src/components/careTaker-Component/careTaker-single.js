import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CareTakerDetails = () => {
    const [careTaker, setCareTaker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCareTaker = async () => {
            try {
                const response = await axios.get('/api/single-care-taker', {
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

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your profile?")) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`/api/deletecaretaker/${careTaker._id}`, {
                    headers: {
                        Authorization: ` ${token}`
                    }
                });

                if (response.status === 200) {
                    toast.success("Profile deleted successfully.");
                    alert("Profile deleted successfully.");
                    setCareTaker('')
                    navigate('/single-caretaker'); // Redirect after successful deletion
                }
            } catch (error) {
                alert("Failed to delete profile. Please try again.");
                console.error(error.message);
            }
        }
    };


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
                    <button onClick={() => navigate(`/update-caretaker/${careTaker._id}`)}>Update your Profile</button>
                    <button onClick={handleDelete}>Delete your Profile</button>

                    <button onClick={()=> navigate(`/all-booking-caretaker`)}>View all My Booking</button>
                </div>
            ) : (
                <div>
                    <p>No CareTaker profile found.</p>
                    <button onClick={() => navigate(`/create-caretaker`)}>Create Care-Taker Profile</button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default CareTakerDetails;




