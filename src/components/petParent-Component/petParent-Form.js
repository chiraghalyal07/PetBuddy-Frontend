import { useState } from 'react';
import axios from '../../config/axios';
import _ from 'lodash';
import {Link} from "react-router-dom"

export default function PetParentForm(){
    const [form,setForm] = useState({
        address:'',
        photo:null,
        proof:null,
        serverErrors:null,
        clientErrors:{}
    });
    const [errors,setErrors] = useState({});
    const runValidations = () =>{
        const tempErrors = {};
        if(form.address.trim().length === 0){
            tempErrors.address = 'Address is required';
        }
        setErrors(tempErrors);
    }
    const handleChange = (e) => {
        const { name, value,files } = e.target;
        if (files) {
            setForm({ ...form, [name]: files[0] });  
        } else {
            setForm({ ...form, [name]: value });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = _.pick(form, ['address','photo','proof']);

        runValidations();

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('/api/newparent',formData,{
                    headers:{
                        'Content-Type':'multipart/form-data',
                        Authorization:localStorage.getItem('token')
                    }
                });
                console.log(response.data);
                
            } catch (err) {
               
                console.log(err);
                const serverErrors = err.response && err.response.data ? err.response.data : 'An unexpected error occurred';
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
    return(
        <div>
            <h2>Pet-Parent Form...</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='address'>Enter Address</label><br/>
                <input type='text' value={form.address} onChange={handleChange} name='address' id='address'/><br/>
                {errors.address && <span>{errors.address}</span>}<br/>

                <label htmlFor='photo'>Upload Profile Picture</label><br/>
                <input type='file' onChange={handleChange} name='photo' id='photo'/><br/>
                {errors.photo && <span>{errors.photo}</span>}<br/>

                <label htmlFor='proof'>Upload Government Proof(Aadhaar)</label><br/>
                <input type='file'  onChange={handleChange} name='proof' id='proof'/><br/>
                {errors.proof && <span>{errors.proof}</span>}<br/>

                <input type='submit'/>
            </form>
            {form.serverErrors && displayErrors()}
        </div>
    )
}

/*
import { useState, useEffect } from 'react';
import axios from '../../config/axios';
import _ from 'lodash';

export default function PetParentForm({ petParentId }) {
    const [form, setForm] = useState({
        address: '',
        photo: null,
        proof: null,
        serverErrors: null,
        clientErrors: {}
    });
    const [errors, setErrors] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (petParentId) {
            // Fetch existing pet parent details if petParentId is provided
            const fetchPetParentDetails = async () => {
                try {
                    const response = await axios.get(`/api/singleparent/${petParentId}`, {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    });
                    setForm({
                        address: response.data.address || '',
                        photo: null, // You might want to handle existing photo URLs differently
                        proof: null, // You might want to handle existing proof URLs differently
                        serverErrors: null,
                        clientErrors: {}
                    });
                    setIsUpdating(true);
                } catch (err) {
                    console.error(err);
                    setErrors({ fetch: 'Error fetching pet parent details' });
                }
            };

            fetchPetParentDetails();
        } else {
            setIsUpdating(false);
        }
    }, [petParentId]);

    const runValidations = () => {
        const tempErrors = {};
        if (form.address.trim().length === 0) {
            tempErrors.address = 'Address is required';
        }
        setErrors(tempErrors);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setForm({ ...form, [name]: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        runValidations();

        if (Object.keys(errors).length === 0) {
            try {
                const formData = new FormData();
                formData.append('address', form.address);
                if (form.photo) formData.append('photo', form.photo);
                if (form.proof) formData.append('proof', form.proof);

                const url = isUpdating ? `/api/updateparent/${petParentId}` : '/api/newparent';
                const method = isUpdating ? 'put' : 'post';

                const response = await axios[method](url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: localStorage.getItem('token')
                    }
                });

                console.log(response.data);
                // Handle success (e.g., redirect or show a success message)
            } catch (err) {
                console.error(err);
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
            <h2>{isUpdating ? 'Update Pet Parent' : 'Create Pet Parent'}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='address'>Enter Address</label><br />
                <input type='text' value={form.address} onChange={handleChange} name='address' id='address' /><br />
                {errors.address && <span>{errors.address}</span>}<br />

                <label htmlFor='photo'>Upload Profile Picture</label><br />
                <input type='file' onChange={handleChange} name='photo' id='photo' /><br />
                {errors.photo && <span>{errors.photo}</span>}<br />

                <label htmlFor='proof'>Upload Government Proof (Aadhaar)</label><br />
                <input type='file' onChange={handleChange} name='proof' id='proof' /><br />
                {errors.proof && <span>{errors.proof}</span>}<br />

                <input type='submit' value={isUpdating ? 'Update' : 'Submit'} />
            </form>
            {form.serverErrors && displayErrors()}
        </div>
    );
}

/*
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axios';
import {Link} from 'react-router-dom'

export default function PetParentForm() {
    const { petParentId } = useParams();
    const [form, setForm] = useState({
        address: '',
        photo: null,
        proof: null,
        serverErrors: null,
        clientErrors: {}
    });
    const [errors, setErrors] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchPetParentDetails = async () => {
            if (petParentId) {
                try {
                    const response = await axios.get(`/api/singleparent/${petParentId}`, {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    });
                    setForm({
                        address: response.data.address || '',
                        photo: null,
                        proof: null,
                        serverErrors: null,
                        clientErrors: {}
                    });
                    setIsUpdating(true);
                } catch (err) {
                    console.error(err);
                    setErrors({ fetch: 'Error fetching pet parent details' });
                }
            } else {
                setIsUpdating(false);
            }
        };

        fetchPetParentDetails();
    }, [petParentId]);

    const runValidations = () => {
        const tempErrors = {};
        if (form.address.trim().length === 0) {
            tempErrors.address = 'Address is required';
        }
        setErrors(tempErrors);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setForm({ ...form, [name]: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        runValidations();

        if (Object.keys(errors).length === 0) {
            try {
                const formData = new FormData();
                formData.append('address', form.address);
                if (form.photo) formData.append('photo', form.photo);
                if (form.proof) formData.append('proof', form.proof);

                const url = isUpdating ? `/api/updateparent/${petParentId}` : '/api/newparent';
                const method = isUpdating ? 'put' : 'post';

                const response = await axios[method](url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: localStorage.getItem('token')
                    }
                });

                console.log(response.data);
                // Handle success (e.g., redirect or show a success message)
            } catch (err) {
                console.error(err);
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
            <h2>{isUpdating ? 'Update Pet Parent' : 'Create Pet Parent'}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='address'>Enter Address</label><br />
                <input type='text' value={form.address} onChange={handleChange} name='address' id='address' /><br />
                {errors.address && <span>{errors.address}</span>}<br />

                <label htmlFor='photo'>Upload Profile Picture</label><br />
                <input type='file' onChange={handleChange} name='photo' id='photo' /><br />
                {errors.photo && <span>{errors.photo}</span>}<br />

                <label htmlFor='proof'>Upload Government Proof (Aadhaar)</label><br />
                <input type='file' onChange={handleChange} name='proof' id='proof' /><br />
                {errors.proof && <span>{errors.proof}</span>}<br />

                <input type='submit' value={isUpdating ? 'Update' : 'Submit'} />
            </form>
            {form.serverErrors && displayErrors()}
            <Link to={`/single-petparent/${petParentId}`}>View Details</Link>
        </div>
    );
}
*/
