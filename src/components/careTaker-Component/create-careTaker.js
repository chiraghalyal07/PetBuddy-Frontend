import { useState } from 'react';
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateCareTaker() {
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
        if (!form.photo) {
            tempErrors.photo = 'Profile Photo is required';
        }
        if (!form.proof) {
            tempErrors.proof = 'Government Proof is required';
        }
        setErrors(tempErrors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleServiceChargeChange = (index, e) => {
        const { name, value } = e.target;
        const updatedServiceCharges = [...form.serviceCharges];
        updatedServiceCharges[index][name] = value;
        setForm({ ...form, serviceCharges: updatedServiceCharges });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setForm({ ...form, [name]: files[0] });
    };

    const handleAddServiceCharge = () => {
        setForm({
            ...form,
            serviceCharges: [...form.serviceCharges, { name: '', amount: '', time: '' }]
        });
    };

    const handleRemoveServiceCharge = (index) => {
        const updatedServiceCharges = form.serviceCharges.filter((_, i) => i !== index);
        setForm({ ...form, serviceCharges: updatedServiceCharges });
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
                formData.append('serviceCharges', JSON.stringify(form.serviceCharges));
                formData.append('photo', form.photo);
                formData.append('proof', form.proof);

                const token = localStorage.getItem('token'); // Adjust as per your token storage method

                const response = await axios.post('/api/newcaretaker', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
                console.log(response.data);
                toast.success('CareTaker created successfully!');
                navigate('/'); // Redirect to a different page after successful creation

            } catch (err) {
                console.log(err);
                const serverErrors = err.response && err.response.data ? err.response.data.errors : 'An unexpected error occurred';
                setForm({ ...form, serverErrors });
            }
        } else {
            setForm({ ...form, clientErrors: errors });
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

    return (
        <div>
            <h2>New CareTaker Form..!</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='careTakerBusinessName'>Enter Care-Taker Business Name</label><br/>
                <input type='text' value={form.careTakerBusinessName} onChange={handleChange} name='careTakerBusinessName' id='careTakerBusinessName'/><br/>
                {errors.careTakerBusinessName && <span>{errors.careTakerBusinessName}</span>}<br/>

                <label htmlFor='address'>Enter Address</label><br/>
                <input type='text' value={form.address} onChange={handleChange} name='address' id='address'/><br/>
                {errors.address && <span>{errors.address}</span>}<br/>

                <label htmlFor='bio'>Enter Bio</label><br/>
                <input type='text' value={form.bio} onChange={handleChange} name='bio' id='bio'/><br/>
                {errors.bio && <span>{errors.bio}</span>}<br/>

                <label htmlFor='serviceCharges'>Enter Service Charges</label><br/>
                {form.serviceCharges.map((charge, index) => (
                    <div key={index}>
                        <input type='text' value={charge.name} onChange={(e) => handleServiceChargeChange(index, e)} name='name' placeholder='Service Name'/><br/>
                        <input type='text' value={charge.amount} onChange={(e) => handleServiceChargeChange(index, e)} name='amount' placeholder='Amount'/><br/>
                        <input type='text' value={charge.time} onChange={(e) => handleServiceChargeChange(index, e)} name='time' placeholder='Time'/><br/>
                        {index > 0 && <button type='button' onClick={() => handleRemoveServiceCharge(index)}>Remove</button>}
                    </div>
                ))}
                <button type='button' onClick={handleAddServiceCharge}>Add Service Charge</button><br/>

                <label htmlFor='photo'>Provide Profile Photo</label><br/>
                <input type='file' onChange={handleFileChange} name='photo' id='photo'/><br/>
                {errors.photo && <span>{errors.photo}</span>}<br/>

                <label htmlFor='proof'>Provide Government Proof (Aadhaar)</label><br/>
                <input type='file' onChange={handleFileChange} name='proof' id='proof'/><br/>
                {errors.proof && <span>{errors.proof}</span>}<br/>
                <input type="submit"/>           
            </form>
            {form.serverErrors && displayErrors()}
            <ToastContainer />
        </div>
    );
}