/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axios';

const PetParentDetail = () => {
    const { id } = useParams();
    const [petParent, setPetParent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPetParent = async () => {
            try {
                const response = await axios.get(`/api/singleparent/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                setPetParent(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchPetParent();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Pet Parent Details</h2>
            {petParent ? (
                <div>
                    {petParent.userId ? (
                        <>
                            <h3>UserName: {petParent.userId.username}</h3>
                            <p>Email: {petParent.userId.email}</p>
                            <p>Phone: {petParent.userId.phoneNumber}</p>
                        </>
                    ) : (
                        <p>User Information not available</p>
                    )}
                    <p>Address: {petParent.address}</p>
                    <div>
                        <h3>Profile Photo</h3>
                        <img src={petParent.photo} alt='Profile' style={{ maxWidth: '200px' }} />
                    </div>
                    <div>
                        <h3>Proof Document</h3>
                        {petParent.proof.endsWith('.pdf') ? (
                            <a href={petParent.proof} target='_blank' rel='noreferrer'>View PDF</a>
                        ) : (
                            <img src={petParent.proof} alt='Proof' style={{ maxWidth: '200px' }} />
                        )}
                    </div>
                </div>
            ) : (
                <div>Pet Parent not found</div>
            )}
        </div>
    );
};

export default PetParentDetail;
*/
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PetParentDetails = () => {
    const [petParent, setPetParent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPetParent = async () => {
            try {
                const response = await axios.get('/api/single-parent', {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                setPetParent(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setError('Something went wrong');
                setLoading(false);
            }
        };

        fetchPetParent();
    }, []);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your profile?")) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`/api/deleteparent/${petParent._id}`, {
                    headers: {
                        Authorization: ` ${token}`
                    }
                });

                if (response.status === 200) {
                    toast.success("Profile deleted successfully.");
                    alert("Profile deleted successfully.");
                    setPetParent('');
                    navigate('/single-petparent'); // Redirect after successful deletion
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
            <h2>PetParent Details</h2>
            {petParent.address ? (
                <div className='pet-parent-card'>
                    {petParent.userId ? (
                        <>
                            <p>Username: <b>{petParent.userId.username}</b></p>
                            <p>Email: {petParent.userId.email}</p>
                            <p>Phone: {petParent.userId.phoneNumber}</p>
                        </>
                    ) : (
                        <p>User Information not available</p>
                    )}
                    <p>Address: {petParent.address}</p>
                    <div>
                        <h3>Profile Photo</h3>
                        <img src={petParent.photo} alt='Profile' style={{ maxWidth: '200px' }} />
                    </div>
                    <div>
                        <h3>Proof Document</h3>
                        {petParent.proof ? (
                            petParent.proof.endsWith('.pdf') ? (
                                <a href={petParent.proof} target='_blank' rel='noreferrer'>View PDF</a>
                            ) : (
                                <img src={petParent.proof} alt='Proof' style={{ maxWidth: '200px' }} />
                            )
                        ) : (
                            <p>No proof document available</p>
                        )}
                    </div>
                    <button onClick={() => navigate(`/update-petparent/${petParent._id}`)}>Update your Profile</button>
                    <button onClick={handleDelete}>Delete your Profile</button>
                </div>
            ) : (
                <div>
                    <p>No PetParent profile found.</p>
                    <button onClick={() => navigate(`/create-petparent`)}>Create PetParent Profile</button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default PetParentDetails;

