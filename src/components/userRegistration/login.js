/*
import axios from "../../config/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Box, Button, TextField, Typography, Alert, Card } from "@mui/material";
import backlogin from '../../images/login.jpg'

const loginValidationSchema = yup.object({
    email: yup.string().required("Email is required").email("Invalid email format"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters").max(128, "Password cannot exceed 128 characters")
});

export default function Login() {
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = useState('');

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validateOnChange: false,
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('/user/login', values);
                localStorage.setItem('token', response.data.token);

                const userResponse = await axios.get('/user/account', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });

                dispatch({ type: "LOGIN", payload: { account: userResponse.data } });
                navigate("/");
            } catch (err) {
                setServerErrors(err.response?.data?.errors || 'Something went wrong');
            }
        }
    });

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f0f2f5"

            sx={{
                backgroundImage: `url(${backlogin})`,
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}
        >
            <Card
                sx={{
                    padding: 4,
                    width: '100%',
                    maxWidth: '400px',
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: 'white',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Login Here
                </Typography>

                {serverErrors && <Alert severity="error" sx={{ marginBottom: 2 }}>{serverErrors}</Alert>}

                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Enter Email"
                        variant="outlined"
                        fullWidth
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        margin="normal"
                    />

                    <TextField
                        label="Enter Password"
                        variant="outlined"
                        fullWidth
                        id="password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        margin="normal"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 3, paddingY: 1.5 }}
                    >
                        Login
                    </Button>
                </form>

                <Box mt={2}>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <Button color="secondary">Create Account</Button>
                    </Link>
                    <Link to="/forget-password" style={{ textDecoration: 'none', marginLeft: '10px' }}>
                        <Button color="secondary">Forget Password</Button>
                    </Link>
                </Box>
            </Card>
        </Box>
    );
}
*/


import axios from "../../config/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import pugImage from '../../images/login.jpg'; // Adjust the path as necessary

const loginValidationSchema = yup.object({
    email: yup.string().required("Email is required").email("Invalid email format"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters").max(128, "Password cannot exceed 128 characters")
});

export default function Login() {
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = useState('');

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validateOnChange: false,
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('/user/login', values);
                localStorage.setItem('token', response.data.token);

                const userResponse = await axios.get('/user/account', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });

                dispatch({ type: "LOGIN", payload: { account: userResponse.data } });
                navigate("/");
            } catch (err) {
                setServerErrors(err.response?.data?.errors || 'Something went wrong');
            }
        }
    });

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f0f2f5"
            sx={{
                backgroundSize: 'cover',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '800px',
                    maxHeight: 'auto', 
                }}
            >
                <img src={pugImage} alt="Pug holding a marker" style={{ width: '100%', height: 'auto' }} />

                <Box
                    sx={{
                        position: 'absolute',
                        top: '43%',
                        left: '17%',
                        width: '65%',
                        height: '32%',
                        padding: '18px',
                        boxSizing: 'border-box',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '12px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        maxWidth: '500px',
                        maxHeight: 'auto',
                    }}
                >
                    {serverErrors && <Alert severity="error" sx={{ marginBottom: 2 }}>{serverErrors}</Alert>}
                    

                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="Enter Email"
                            variant="outlined"
                            fullWidth
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            margin="normal"
                            InputProps={{ style: { padding: '10px', borderRadius: '8px' } }}
                        />

                        <TextField
                            label="Enter Password"
                            variant="outlined"
                            fullWidth
                            id="password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            margin="normal"
                            InputProps={{ style: { padding: '10px', borderRadius: '8px' } }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 3, paddingY: 1.5, fontSize: '16px', borderRadius: '8px' }}
                        >
                            Login
                        </Button>
                    </form>

                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <Button color="secondary" sx={{ fontSize: '14px' }}>Create Account</Button>
                        </Link>
                        <Link to="/forget-password" style={{ textDecoration: 'none' }}>
                            <Button color="secondary" sx={{ fontSize: '14px' }}>Forget Password</Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
