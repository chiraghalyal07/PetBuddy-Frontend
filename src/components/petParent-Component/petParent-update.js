import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../utility/spinner'; // Add this if you have a Spinner component

const UpdatePetParent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        address: '',
        photo: null,
        proof: null,
        serverErrors: null,
        clientErrors: {}
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPetParent = async () => {
            try {
                const response = await axios.get(`/api/single-parent`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    },
                });
                const petParent = response.data;
                setForm({
                    address: petParent.address,
                    photo: null, // You may need to handle URL or file upload differently
                    proof: null, // Same as above
                    serverErrors: null,
                    clientErrors: {}
                });
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setErrors({ fetch: 'Something went wrong' });
                setLoading(false);
            }
        };

        fetchPetParent();
    }, [id]);

    const runValidation = () => {
        const tempErrors = {};
        if (form.address.trim().length === 0) {
            tempErrors.address = 'Address is required';
        }
        setErrors(tempErrors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        runValidation();
        if (Object.keys(errors).length === 0) {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('address', form.address);
                if (form.photo) formData.append('photo', form.photo);
                if (form.proof) formData.append('proof', form.proof);

                const token = localStorage.getItem('token');
                const response = await axios.put(`/api/updateparent/${id}`, formData, {
                    headers: {
                        'Authorization': ` ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
                console.log(response.data);
                setLoading(false);
                toast.success("Profile Updated successfully.");
                navigate('/single-petparent'); // Redirect to a different page

            } catch (err) {
                const serverErrors = err.response && err.response.data ? err.response.data.errors : 'An unexpected error occurred';
                setForm(prevForm => ({ ...prevForm, serverErrors }));
                setLoading(false);
            }
        } else {
            setForm(prevForm => ({ ...prevForm, clientErrors: errors }));
        }
    };

    const displayErrors = () => {
        if (form.serverErrors) {
            if (Array.isArray(form.serverErrors)) {
                return (
                    <div>
                        <h3>These errors prohibited the form from being saved:</h3>
                        <ul>
                            {form.serverErrors.map((ele, i) => (
                                <li key={i}>{ele.msg}</li>
                            ))}
                        </ul>
                    </div>
                );
            } else if (typeof form.serverErrors === 'string') {
                return <p>{form.serverErrors}</p>;
            }
        }
        return null;
    };

    if (loading) return <Spinner />;
    if (errors.fetch) return <div>{errors.fetch}</div>;

    return (
        <div>
            <h2>Update PetParent Profile</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='address'>Enter Address</label><br />
                <input
                    type='text'
                    value={form.address}
                    onChange={handleChange}
                    name='address'
                    id='address'
                /><br />
                {errors.address && <span>{errors.address}</span>}<br />

                <label htmlFor='photo'>Provide Profile Photo</label><br />
                <input
                    type='file'
                    onChange={handleFileChange}
                    name='photo'
                    id='photo'
                /><br />
                {errors.photo && <span>{errors.photo}</span>}<br />

                <label htmlFor='proof'>Provide Government Proof (Aadhaar)</label><br />
                <input
                    type='file'
                    onChange={handleFileChange}
                    name='proof'
                    id='proof'
                /><br />
                {errors.proof && <span>{errors.proof}</span>}<br />

                <button type='submit'>Update PetParent</button>
            </form>

            {form.serverErrors && displayErrors()}
            <ToastContainer />
        </div>
    );
};

export default UpdatePetParent;
