/*
import { useAuth } from "../../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import {
 
    Button,
    
} from '@mui/material';

export default function Account() {
    const { user, dispatch } = useAuth();
    const navigate = useNavigate();
    
    // Add a check to ensure user and user.account exist
    const id = user?.account?._id;
    console.log('ididid',id)

    return (
        <div>
            <h2>Account Information...</h2>
            {user && user.account ? (
                <>
                    <p>User_Name -- {user.account.username}</p>
                    <p>Email -- {user.account.email}</p>
                    <p>Role -- {user.account.role}</p>
                    {user.account.role === 'careTaker' ? (
                        <>
                            <Button color="primary" onClick={() => navigate(`/single-caretaker`)}>CareTaker Details</Button><br/>
                            <Button color="primary" onClick={() => navigate(`/all-booking-caretaker`)}>My Bookings</Button><br/>
                        </>
                    ) : null}
                    {user.account.role === 'petParent' ? (
                        <>
                            <Button color="primary" onClick={() => navigate(`/single-petparent`)}>PetParent Details</Button><br/>
                            <Button color="primary" onClick={() => navigate(`/single-pet`)}>Pet Details</Button><br/>
                            <Button color="primary" onClick={() => navigate(`/booking-history`)}>Booking History</Button><br/>
                        </>
                    ) : null}
                    {user.account.role === 'admin' ? (
                        <>
                            <Button color="primary" onClick={() => navigate(`/create-booking/${id}`)}>Admin Home</Button><br/>
                        </>
                    ) : null}
                    <Link to='/' onClick={() => {
                        localStorage.removeItem('token');
                        dispatch({ type: 'LOGOUT' });
                    }}>Logout</Link>
                </>
            ) : (
                <p>No Account information available</p>
            )}
        </div>
    );
}
*/

import React from 'react';
import { useAuth } from "../../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import {
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    Typography,
    Box,
} from '@mui/material';

export default function Account() {
    const { user, dispatch } = useAuth();
    const navigate = useNavigate();
    
    // Add a check to ensure user and user.account exist
    const id = user?.account?._id;

    return (
        <div style={{ padding: '20px', width: '300px' }}>
            <Typography variant="h6" sx={{ padding: 2 }}>
                Account Information
            </Typography>
            <Box>
                {user && user.account ? (
                    <>
                        <List>
                            <ListItem>
                                <ListItemText primary={`User_Name: ${user.account.username}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Email: ${user.account.email}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Role: ${user.account.role}`} />
                            </ListItem>
                            <Divider />
                            {user.account.role === 'careTaker' && (
                                <>
                                    <ListItem>
                                        <Button color="primary" fullWidth onClick={() => navigate(`/single-caretaker`)}>CareTaker Details</Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button color="primary" fullWidth onClick={() => navigate(`/all-booking-caretaker`)}>My Bookings</Button>
                                    </ListItem>
                                </>
                            )}
                            {user.account.role === 'petParent' && (
                                <>
                                    <ListItem>
                                        <Button color="primary" fullWidth onClick={() => navigate(`/single-petparent`)}>PetParent Details</Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button color="primary" fullWidth onClick={() => navigate(`/single-pet`)}>Pet Details</Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button color="primary" fullWidth onClick={() => navigate(`/booking-history`)}>Booking History</Button>
                                    </ListItem>
                                </>
                            )}
                            {user.account.role === 'admin' && (
                                <ListItem>
                                    <Button color="primary" fullWidth onClick={() => navigate(`/create-booking/${id}`)}>Admin Home</Button>
                                </ListItem>
                            )}
                            <ListItem>
                                <Link to='/' style={{ textDecoration: 'none', color: 'secondary' }} onClick={() => {
                                    localStorage.removeItem('token');
                                    dispatch({ type: 'LOGOUT' });
                                }}>Logout</Link>
                            </ListItem>
                        </List>
                    </>
                ) : (
                    <Typography>No Account information available</Typography>
                )}
            </Box>
        </div>
    );
}
