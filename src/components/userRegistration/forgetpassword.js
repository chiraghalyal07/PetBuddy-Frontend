import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../config/axios'
import validator from 'validator'

export default function ForgetPassword(){
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [serverErrors,setServerErrors] = useState(null)
    const [clientErrors,setClientErrors] = useState({})
    const errors = {}
    const runValidation = () =>{
        if(email.trim().length == 0){
            errors.email = 'email is required'
        }else if(!validator.isEmail(email)){
            errors.email = 'invalid email format'
        }
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const formData = {
            email:email
        }
        runValidation()
        if(Object.keys(errors).length == 0){
            try{
                const response = await axios.post('/user/forgotPassword',formData)
                navigate('/reset-password')
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
            <h2>Forget Password</h2>
            {serverErrors && (
                <div>
                    <h3>Theses errors prohibitted the form from being saved:</h3>
                    <ul>
                        {serverErrors.map((ele,i)=>{
                            return <li key={i}>{ele.msg}</li>
                        })}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Enter Email</label><br/>
                <input type='text' value={email} onChange={e=> setEmail(e.target.value)} id="email"/>
                {clientErrors.email && <span>{clientErrors.email}</span>}<br/>
                <input type='submit'/>
            </form>
        </div>
    )

}