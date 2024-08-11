import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../config/axios'
import {Button} from  '@mui/material'

export default function AdminHome(){
    const navigate = useNavigate();
    const [counts,setCounts] = useState({
        caretakers:0,
        pets:0,
        petParents:0,
    })

    useEffect(()=>{
        const fetchCounts = async () =>{
            try{
                const response = await axios.get('/api/admin/counts')
                setCounts(response.data)
            }catch(errors){
                console.error('Error Fetching counts:',errors)
            }
        }
        fetchCounts();
    },[]);
    return (
        <div>
             <h2>Wel-Come to PetBuddy</h2>
             <p >Total-CareTakers : {counts.caretakers}</p>
             <Button onClick={() => navigate('/admin-care-nv-list')}>Not-Verified-List</Button>
             <Button onClick={() => navigate('/all-caretaker-v')}>Verified-List</Button>
             <p>Total-PetParents : {counts.petParents}</p>
             <p>Total-Pets : {counts.pets}</p>
        </div>
       
    )
}