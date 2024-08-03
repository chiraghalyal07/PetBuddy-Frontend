import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../utility/spinner';

export default function PetAccount() {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({}); // Initialize with an empty object
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`/api/single-pet`, {
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
  }, []);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      try {
        await axios.delete(`/api/deletepet/${pet._id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        toast.success("Pet deleted successfully.");
        navigate('/single-pet'); // Redirect after successful deletion
      } catch (err) {
        toast.error("Failed to delete pet. Please try again.");
      }
    }
  };

  if (error.fetch) return <div>{error.fetch}</div>;
  return (
    <div>
      {loading && <Spinner />}
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
          <button onClick={() => navigate(`/update-pet/${pet._id}`)}>Update your Pet</button>
          <button onClick={handleDelete}>Delete your Pet</button>
        </div>
      ) : (
        <div>No Pet profile found.</div>
      )}
        {error && <div style={{ color: 'red' }}>{error.fetch}</div>}
      <ToastContainer />
    </div>
  );
}