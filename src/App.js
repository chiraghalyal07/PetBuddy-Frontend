import {Link, Routes, Route} from "react-router-dom"
// import { useAuth } from "./context/authContext";
import Home from "./components/userRegistration/home";
import Register from "./components/userRegistration/register";
import OtpVerification from "./components/userRegistration/otpVerify";
import Login from "./components/userRegistration/login";
function App() {
  return (
    <div >
      <h1>PetBuddy</h1>
      <Link to='/'>Home</Link>|
      <Link to='/register'>Register</Link>|
      <Link to='/login'>Login</Link>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/verify-otp" element={<OtpVerification/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
