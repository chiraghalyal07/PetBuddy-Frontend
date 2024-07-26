/*
import { useState } from 'react';
import axios from '../../config/axios';

export default function PetParentForm(){
    const [form,setForm] = useState({
        address:'',
        photo:'',
        proof:'',
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
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = _.pick(form, ['address']);

        runValidations();

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('/api/users/register', formData,{
                    headers:{
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
                <input type='file' value={form.photo} onChange={handleChange} name='photo' id='photo'/><br/>
                {errors.photo && <span>{errors.photo}</span>}<br/>

                <label htmlFor='proof'>Upload Government Proof(Aadhaar)</label><br/>
                <input type='file' value={form.proof} onChange={handleChange} name='proof' id='proof'/><br/>
                {errors.proof && <span>{errors.proof}</span>}<br/>

                <input type='submit'/>
            </form>
            {form.serverErrors && displayErrors()}
        </div>
    )
}*/
import React, { useState } from 'react';
import axios from 'axios';

const CreatePetParent = () => {
  const [formData, setFormData] = useState({
    address: ''
  });

  const [files, setFiles] = useState({
    photo: null,
    proof: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles({
      ...files,
      [name]: files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('address', formData.address);
    if (files.photo) data.append('photo', files.photo);
    if (files.proof) data.append('proof', files.proof);

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('/api/newparent', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('PetParent created successfully:', response.data);
    } catch (error) {
      console.error('Error creating PetParent:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Profile Photo:</label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>
      <div>
        <label>Proof Document:</label>
        <input
          type="file"
          name="proof"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          required
        />
      </div>
      <button type="submit">Create PetParent</button>
    </form>
  );
};

export default CreatePetParent;
