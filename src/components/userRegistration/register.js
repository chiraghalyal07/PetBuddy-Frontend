/*
import { useState } from 'react';
import validator from "validator"
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

export default function Register(){
    const navigate = useNavigate();
    const [form,setForm] = useState({
        username:'',
        email:'',
        phoneNumber:'',
        password:'',
        role:'',
        serverErrors:null,
        clientErrors:{}
    })
    const [errors,setErrors] = useState({})
    const runValidation = () =>{
        const tempErrors = {}

        if (form.username.trim().length === 0) {
            tempErrors.username = 'Username is required';
        }
    
        if (form.email.trim().length === 0) {
            tempErrors.email = 'Email is required';
        } else if (!validator.isEmail(form.email)) {
            tempErrors.email = 'Invalid email format';
        }
        if (form.phoneNumber.trim().length === 0) {
            tempErrors.phoneNumber = 'Phone-Number is required';
        }
    
        if (form.password.trim().length === 0) {
            tempErrors.password = 'Password is required';
        } else if (form.password.trim().length < 8 || form.password.trim().length > 128) {
            tempErrors.password = 'Password should be between 8 - 128 characters';
        }
    
        if (form.role.trim().length === 0) {
            tempErrors.bio = 'Role is required';
        }

        setErrors(tempErrors)
    }

    const handleChange = (e) =>{
        const {name,value} = e.target
        setForm({...form,[name]:value})
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const formData = _.pick(form,['username','email','phoneNumber','password','role'])
        runValidation();
        if(Object.keys(errors).length === 0){
            try{
                const response = await axios.post('/user/register',formData);
                console.log(response.data);
                navigate('/verify-otp')
            }catch(err){
                console.log(err);
                const serverErrors = err.response && err.response.data ? err.response.data : 'An unexpected error occured'
                setForm({...form, serverErrors})
            }
        }else{
            setForm({...form,clientErrors:errors})
        }

    }
    const displayErrors = () =>{
        if(form.serverErrors){
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
    }
    return(
        <div>
            <h1>Register With Us...</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Enter User Name</label><br/>
                <input
                    type='text'
                    value={form.username}
                    onChange={handleChange}
                    name='username'
                    id='username'
                />
                {errors.username && <span>{errors.username}</span>}<br/>
                <label htmlFor='email'>Enter Email</label><br/>
                <input
                    type='text'
                    value={form.email}
                    onChange={handleChange}
                    name='email'
                    id='email'
                />
                {errors.email && <span>{errors.email}</span>}<br/>
                <label htmlFor='phoneNumber'>Enter Phone Number</label><br/>
                <input
                    type='text'
                    value={form.phoneNumber}
                    onChange={handleChange}
                    name='phoneNumber'
                    id='phoneNumber'
                />
                {errors.phoneNumber && <span>{errors.phoneNumber}</span>}<br/>
                <label htmlFor='password'>Enter Password</label><br/>
                <input
                    type='text'
                    value={form.password}
                    onChange={handleChange}
                    name='password'
                    id='password'
                />
                {errors.password && <span>{errors.password}</span>}<br/>
                <label>Select Role</label><br/>
                <input type='radio' value='admin' onChange={handleChange} name='role' id='role_admin' checked={form.role ==='admin'}/>
                <label htmlFor='role_admin'>Admin</label>
                <input type='radio' value='petParent' onChange={handleChange} name='role' id='role_petParent' checked={form.role === 'petParent'}/>
                <label htmlFor='role_petParent'>Pet Parent</label>
                <input type='radio' value='careTaker' onChange={handleChange} name='role' id='role_careTaker' checked={form.role === 'careTaker'}/>
                <label htmlFor='role_careTaker'>Care Taker</label>
                {errors.role && <span>{errors.role}</span>}<br/>
                <input type='submit'/>             
                
            </form>
            {form.serverErrors && displayErrors()}
        </div>
    )

}*/
import { useState } from 'react';
import validator from 'validator';
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, Typography, Card } from '@mui/material';
import backgroundimage from '../../images/Pets_Register2.jpg'

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        serverErrors: null,
        clientErrors: {}
    });
    const [errors, setErrors] = useState({});

    const runValidation = () => {
        const tempErrors = {};

        if (form.username.trim().length === 0) {
            tempErrors.username = 'Username is required';
        }

        if (form.email.trim().length === 0) {
            tempErrors.email = 'Email is required';
        } else if (!validator.isEmail(form.email)) {
            tempErrors.email = 'Invalid email format';
        }
        if (form.phoneNumber.trim().length === 0) {
            tempErrors.phoneNumber = 'Phone Number is required';
        }

        if (form.password.trim().length === 0) {
            tempErrors.password = 'Password is required';
        } else if (form.password.trim().length < 8 || form.password.trim().length > 128) {
            tempErrors.password = 'Password should be between 8 - 128 characters';
        }

        if (form.role.trim().length === 0) {
            tempErrors.role = 'Role is required';
        }

        setErrors(tempErrors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = _.pick(form, ['username', 'email', 'phoneNumber', 'password', 'role']);
        runValidation();
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('/user/register', formData);
                console.log(response.data);
                toast.success('Enter the OTP for Successfull Registeration..!', {
                    autoClose: 2000,
                    onClose: () => {
                        navigate('/verify-otp');
                    }
                })
                
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
                    <Box>
                        <Typography variant="h6">These errors prohibited the form from being saved:</Typography>
                        <ul>
                            {form.serverErrors.map((ele, i) => (
                                <li key={i}>{ele.msg}</li>
                            ))}
                        </ul>
                    </Box>
                );
            } else if (typeof form.serverErrors === 'string') {
                return <Typography color="error">{form.serverErrors}</Typography>;
            }
        }
        return null;
    };

    return (
        <Box
            sx={{
                backgroundImage: `url(${backgroundimage})`,
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <Card sx={{ padding: 4, width: '400px', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <Typography variant="h4" gutterBottom>Register With Us...</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Enter User Name"
                        value={form.username}
                        onChange={handleChange}
                        name="username"
                        margin="normal"
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                    <TextField
                        fullWidth
                        label="Enter Email"
                        value={form.email}
                        onChange={handleChange}
                        name="email"
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        fullWidth
                        label="Enter Phone Number"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        name="phoneNumber"
                        margin="normal"
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber}
                    />
                    <TextField
                        fullWidth
                        label="Enter Password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        name="password"
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <FormControl component="fieldset" margin="normal" error={!!errors.role}>
                        <FormLabel component="legend">Select Role</FormLabel>
                        <RadioGroup row name="role" value={form.role} onChange={handleChange}>
                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                            <FormControlLabel value="petParent" control={<Radio />} label="Pet Parent" />
                            <FormControlLabel value="careTaker" control={<Radio />} label="Care Taker" />
                        </RadioGroup>
                        {errors.role && <Typography color="error">{errors.role}</Typography>}
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">Register</Button>
                </form>
                {displayErrors()}
            </Card>
            <ToastContainer/>
        </Box>
    );
}
