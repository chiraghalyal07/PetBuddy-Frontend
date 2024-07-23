import {useState} from "react"
import validator from "validator"
import axios from "../../config/axios"
import { useNavigate } from "react-router-dom"
import _ from  "lodash"

export default function OtpVerification(){
    const navigate = useNavigate();
    const [form,setForm] = useState({
        email:'',
        otp:'',
        serverErrors:null,
        clientErrors:{}
    });
    const [errors,setErrors] = useState({});
    const runValidation = () =>{
        const tempErrors ={}
        if (form.email.trim().length === 0) {
            tempErrors.email = 'Email is required';
        } else if (!validator.isEmail(form.email)) {
            tempErrors.email = 'Invalid email format';
        }
        if(form.otp.trim().length === 0){
            tempErrors.otp = 'OTP is required'
        }
        setErrors(tempErrors)
    };
    const handleChange =(e)=>{
        const{name,value}=e.target;
        setForm({...form,[name]:value});
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const formData = _.pick(form,['email','otp'])
        runValidation();
        if(Object.keys(errors).length === 0){
            try{
                const response = await axios.post('/user/verify',formData);
                console.log(response.data)
                navigate('/login');
            }catch(err){
                console.log(err.response.data)
                const serverErrors = err.response && err.response.data ? err.response.data : 'An unexpected error occered';
                setForm({...form,serverErrors})
            }
        }else{
            setForm({...form,clientErrors:errors})
        }
    }
    const displayErrors = () =>{
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
    }
    return(
        <div>
            <h1>OTP Verification</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Enter Email</label><br/>
                <input
                    type='text'
                    value={form.email}
                    onChange={handleChange}
                    name='email'
                    id='email'
                />
                {errors.email && <span>{errors.email}</span>}<br/>
                
                <label htmlFor="otp">Enter Otp</label><br/>
                <input type="text" value={form.otp} onChange={handleChange} name="otp" id="otp"/>
                {errors.otp && <span>{errors.otp}</span>}<br/>
                <input type="submit"/>
            </form>
            {form.serverErrors && displayErrors()}
        </div>
    )
}