import {Link, Routes, Route} from "react-router-dom"
import { useEffect } from "react";
import axios from "./config/axios";
import { useAuth } from "./context/authContext";
//User-Registeration
import Home from "./components/userRegistration/home";
import Register from "./components/userRegistration/register";
import OtpVerification from "./components/userRegistration/otpVerify";
import Login from "./components/userRegistration/login";
import Account from "./components/userRegistration/account";
import ForgetPassword from "./components/userRegistration/forgetpassword";
import ResetPassword from "./components/userRegistration/resetpassword";
//Care-Taker Creation
import CreateCareTaker from "./components/careTaker-Component/create-careTaker";
import CreatePetParent from "./components/petParent-Component/petParent-Form";

function App() {
  const {user,dispatch} = useAuth()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      (async()=>{
        const response = await axios.get('/user/account',{
          headers:{
            Authorization: localStorage.getItem('token')
          }
        })
        dispatch({type:'LOGIN',payload:{account:response.data}})
      })()
    }
  },[])
  
  return (
    <div >
      <h1>PetBuddy</h1>
      <Link to='/'>Home</Link>
      {!user.isLoggedIn ?(
        <>
        |<Link to='/register'>Register</Link>|
        <Link to='/login'>Login</Link>
        </>
      ):(
        <>
        |<Link to='/account'>Account</Link>|
        |<Link to='/create-caretaker'>Create-Caretaker</Link>
        |<Link to='/create-petparent'>Create-PetParent</Link>
        <Link to='/' onClick={()=>{
          localStorage.removeItem('token')
          dispatch({type:'LOGOUT'})
        }}>Logout</Link>
        </>
      )}
      
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/verify-otp" element={<OtpVerification/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forget-password" element={<ForgetPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/account" element={<Account/>}/>

        <Route path="/create-caretaker" element={<CreateCareTaker/>}/>
        <Route path="/create-petparent" element={<CreatePetParent/>}/>
      </Routes>
    </div>
  );
}

export default App;
