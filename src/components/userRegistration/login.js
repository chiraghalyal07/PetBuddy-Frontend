import axios from "../../config/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import {Link,Routes,Route} from "react-router-dom"

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
               
                console.log(response.data);
                
                const userResponse = await axios.get('/user/account', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                
                console.log('userResponse', userResponse.data);
                dispatch({ type: "LOGIN", payload: { account: userResponse.data } });
                navigate("/");
            } catch (err) {
                console.log(err);
                setServerErrors(err.response.data.errors);
            }
        }
    });
    
    return (
        <div>
            <h1>Login Here..</h1>
            {serverErrors && <b>{serverErrors}</b>}
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Enter Email</label>
                <input
                    type="text"
                    value={formik.values.email}
                    name="email"
                    onChange={formik.handleChange}
                    id="email"
                />
                {formik.errors.email && <div>{formik.errors.email}</div>}
                <br />
                
                <label htmlFor="password">Enter Password</label>
                <input
                    type="password"
                    value={formik.values.password}
                    name="password" 
                    onChange={formik.handleChange}
                    id="password"
                />
                {formik.errors.password && <div>{formik.errors.password}</div>}
                <br />
                
                <input type="submit" />
            </form>
        </div>
    );
}
