import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import validator from "validator";

export default function ResetPassword(){
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [otp,setOtp] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [serverErrors,setServerErrors] = useState(null)
    const [clientErrors,setClientErrors] = useState({})
    const errors = {}
    const runValidation = () =>{
        if(email.trim().length === 0) {
            errors.email = 'email is required'
        } else if(!validator.isEmail(email)) {
            errors.email = 'invalid email format'
        }
        if(otp.trim().length === 0) {
            errors.otp = 'OTP is required'
        } else if(otp.trim().length = 6) {
            errors.password = 'OTP length is of 6 characters'
        }
        if(newPassword.trim().length === 0) {
            errors.newPassword = 'password is required'
        } else if(newPassword.trim().length < 8 || newPassword.trim().length > 128) {
            errors.newPassword = 'password should be between 8 - 128 characters'
        }
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const formData = {
            email:email,
            otp:otp,
            newPassword:newPassword
        }
        runValidation()
        if(Object.keys(errors).length === 0){
            try{
                const response = await axios.post('/user/resetPassword',formData)
                navigate('/login')
                console.log(response.data)
            }catch(err){
                setServerErrors(err.response.data.errors)
            }
        }else{
            setClientErrors(errors)
        }
    }
    return(
        <div>
            <h2>Reset_Password</h2>
            { serverErrors && (
                <div>
                    <h3>Theses errors prohibitted the form from being saved: </h3>
                    <ul>
                        { serverErrors.map((ele, i) => {
                            return <li key={i}> { ele.msg } </li>
                        })}
                    </ul>
                </div> 
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter Email</label><br/>
                <input type="text" value={email} onChange={e=> setEmail(e.target.value)} id="email"/><br/>
                {clientErrors.email && <span>{clientErrors.email}</span>}
                <lable htmlFor="otp">Enter OTP</lable><br/>
                <input type="text" value={otp} onChange={e => setOtp(e.target.value)} id="otp"/><br/>
                {clientErrors.otp && <span>{clientErrors.otp}</span>}<br/>
                <label htmlFor="newPassword">Enter New Password</label><br/>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} id="newPassword"/><br/>
                {clientErrors.newPassword && <span>{clientErrors.newPassword}</span>}<br/>
                <input type="submit"/>
            </form>
        </div>
    )
}