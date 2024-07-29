import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCareTaker = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        careTakerBusinessName: '',
        address: '',
        bio: '',
        serviceCharges: [{ name: '', amount: '', time: '' }],
        photo: null,
        proof: null,
        serverErrors: null,
        clientErrors: {}
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCareTaker = async () => {
            try {
                const response = await axios.get(`/api/single-care-taker`, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                        
                    },
                });
                const careTaker = response.data;
                setForm({
                    careTakerBusinessName: careTaker.careTakerBusinessName,
                    address: careTaker.address,
                    bio: careTaker.bio,
                    serviceCharges: careTaker.serviceCharges,
                    photo: careTaker.photo,
                    proof: careTaker.proof,
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

        fetchCareTaker();
    }, [id]);

    const runValidation = () => {
        const tempErrors = {};
        if (form.careTakerBusinessName.trim().length === 0) {
            tempErrors.careTakerBusinessName = 'Care-Taker Business Name is required';
        }
        if (form.address.trim().length === 0) {
            tempErrors.address = 'Address is required';
        }
        if (form.bio.trim().length === 0) {
            tempErrors.bio = 'Bio is required';
        }
        setErrors(tempErrors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleServiceChargeChange = (index, e) => {
        const { name, value } = e.target;
        const updatedServiceCharges = form.serviceCharges.map((charge, i) =>
            i === index ? { ...charge, [name]: value } : charge);
        setForm(prevForm => ({ ...prevForm, serviceCharges: updatedServiceCharges }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: files[0] }));
    };

    const handleAddServiceCharge = () => {
        setForm(prevForm => ({
            ...prevForm,
            serviceCharges: [...prevForm.serviceCharges, { name: '', amount: '', time: '' }]
        }));
    };

    const handleRemoveServiceCharge = (index) => {
        const updatedServiceCharges = form.serviceCharges.filter((_, i) => i !== index);
        setForm(prevForm => ({ ...prevForm, serviceCharges: updatedServiceCharges }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        runValidation();
        if (Object.keys(errors).length === 0) {
            try {
                const formData = new FormData();
                formData.append('careTakerBusinessName', form.careTakerBusinessName);
                formData.append('address', form.address);
                formData.append('bio', form.bio);
                formData.append('photo', form.photo);
                formData.append('proof', form.proof);
                formData.append('serviceCharges', JSON.stringify(form.serviceCharges));

                const token = localStorage.getItem('token');
                const response = await axios.put(`/api/updatecaretaker/${id}`, formData, {
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });

                console.log(response.data);
                toast.success('CareTaker updated successfully!');
                navigate('/single-caretaker'); // Redirect to a different page

            } catch (err) {
                console.log(err);
                const serverErrors = err.response && err.response.data ? err.response.data.errors : 'An unexpected error occurred';
                setForm(prevForm => ({ ...prevForm, serverErrors }));
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

    if (loading) return <div>Loading...</div>;
    if (errors.fetch) return <div>{errors.fetch}</div>;

    return (
        <div>
            <h2>Update CareTaker Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='careTakerBusinessName'>Enter Care-Taker Business Name</label><br />
                <input type='text' value={form.careTakerBusinessName} onChange={handleChange} name='careTakerBusinessName' id='careTakerBusinessName' /><br />
                {errors.careTakerBusinessName && <span>{errors.careTakerBusinessName}</span>}<br />

                <label htmlFor='address'>Enter Address</label><br />
                <input type='text' value={form.address} onChange={handleChange} name='address' id='address' /><br />
                {errors.address && <span>{errors.address}</span>}<br />

                <label htmlFor='bio'>Enter Bio</label><br />
                <input type='text' value={form.bio} onChange={handleChange} name='bio' id='bio' /><br />
                {errors.bio && <span>{errors.bio}</span>}<br />

                <label htmlFor='serviceCharges'>Enter Service Charges</label><br />
                {form.serviceCharges.map((charge, index) => (
                    <div key={index}>
                        <input type='text' value={charge.name} onChange={(e) => handleServiceChargeChange(index, e)} name='name' placeholder='Service Name' /><br />
                        <input type='text' value={charge.amount} onChange={(e) => handleServiceChargeChange(index, e)} name='amount' placeholder='Amount' /><br />
                        <input type='text' value={charge.time} onChange={(e) => handleServiceChargeChange(index, e)} name='time' placeholder='Time' /><br />
                        {index > 0 && <button type='button' onClick={() => handleRemoveServiceCharge(index)}>Remove</button>}
                    </div>
                ))}
                <button type='button' onClick={handleAddServiceCharge}>Add Service Charge</button><br />

                <label htmlFor='photo'>Provide Profile Photo</label><br />
                <input type='file' onChange={handleFileChange} name='photo' id='photo' /><br />
                {errors.photo && <span>{errors.photo}</span>}<br />

                <label htmlFor='proof'>Provide Government Proof (Aadhaar)</label><br />
                <input type='file' onChange={handleFileChange} name='proof' id='proof' /><br />
                {errors.proof && <span>{errors.proof}</span>}<br />
                <input type="submit" />
            </form>
            {form.serverErrors && displayErrors()}
            <ToastContainer />
        </div>
    );
};

export default UpdateCareTaker;
