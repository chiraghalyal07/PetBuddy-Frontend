import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom'; 
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../utility/spinner';

export default function PetSingleId() {
  const { id } = useParams(); 
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({}); 
  
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`/api/singlepet/${id}`, { 
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setPet(response.data);
        setLoading(false);
      } catch (err) {
        setError({ fetch: 'Something went wrong' });
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  if (loading) return <Spinner />; 
  if (error.fetch) return <div>{error.fetch}</div>;

  return (
    <div>
      <h2>Pet Details</h2>
      {pet ? (
        <div className='pet-card'>
          <h3>Pet Name: {pet.petName}</h3>
          <p>Age: {pet.age}</p>
          <p>Gender: {pet.gender}</p>
          <p>Category: {pet.category}</p>
          <p>Breed: {pet.breed}</p>
          <div>
            <h3>Pet Photo</h3>
            {pet.petPhoto ? (
              <img src={pet.petPhoto} alt="Pet" style={{ maxWidth: '200px' }} />
            ) : (
              <p>No photo available</p>
            )}
          </div>
          <p>Weight: {pet.weight}</p>
          {pet.medication && (
            <div>
              <h3>Medications:</h3>
              <ul>
                {pet.medication.map((med, index) => (
                  <li key={index}>
                    <p>Medication Name: {med.medicationName}</p>
                    <p>Description: {med.description}</p>
                    <p>Due Date: {med.dueDate}</p>
                    <p>Dose: {med.dose}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {pet.reminders && pet.reminders.length > 0 && (
            <div>
              <h3>Reminders:</h3>
              <ul>
                {pet.reminders.map((reminder, index) => (
                  <li key={index}>
                    <p>Date: {reminder.date}</p>
                    <p>Title: {reminder.title}</p>
                    <p>Note: {reminder.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div>No Pet profile found.</div>
      )}
      <ToastContainer />
    </div>
  );
}
