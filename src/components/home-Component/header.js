import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import logo from "../../images/PetBuddy_LOGO.jpg";
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import Account from '../userRegistration/account';

function Header() {
  const { user, dispatch } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#f8f9fa' }}>
      <div>
        <img src={logo} alt="PetBuddy Logo" style={{ height: '100px' }} />
      </div>
      <nav>
      <Tooltip title="Home" arrow>
          <Link to='/'><HomeIcon color="primary" fontSize="large" /></Link>
        </Tooltip>
        {!user.isLoggedIn ? (
          <>
            | <Link to='/register'>Register</Link> |
            <Link to='/login'>Login</Link>
          </>
        ) : (
          <>
            <Tooltip title="CareTaker List" arrow>
              <Link to='/all-caretaker-v'><ListIcon color="primary" fontSize="large" /></Link>
            </Tooltip>
            <Tooltip title="Account" arrow>
                <PersonSharpIcon
                  color="primary"
                  fontSize="large"
                  onClick={toggleDrawer(true)}
                  style={{ cursor: 'pointer' }}
                />
              </Tooltip>
            {/* | <Link to='/admin-home'>Admin-Home</Link>
            | <Link to='/all-petparents'>All-PetParents</Link> */}
            
            {/* | <Link to='/single-caretaker'>Profile-C</Link>
            | <Link to='/single-petparent'>Profile-P</Link>
            | <Link to='/single-pet'>Pets-Profile</Link>
            | <Link to='/all-review'>All-Review</Link> 
            | <Link to='/' onClick={() => {
                localStorage.removeItem('token');
                dispatch({ type: 'LOGOUT' });
              }}>Logout</Link>*/}
          </>
        )}
      </nav>
    </header>
    {/* Drawer Component */}
    <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Account />
      </Drawer>
    </>
  );
}

export default Header;
