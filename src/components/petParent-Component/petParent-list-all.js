import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import {Link} from 'react-router-dom'

const PetParentList = () => {
  const [petParents, setPetParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetParents = async () => {
      try {
        const response = await axios.get('/api/allparents', {
          headers: {
            Authorization:localStorage.getItem('token')
          }
        });
        setPetParents(response.data);
        setLoading(false);
      } catch (errors) {
        console.error(errors);  // Log the error for debugging
        // const errorMsg = errors.response && errors.response.data
        //   ? errors.response.data.message || 'Error fetching pet parents'
        //   : 'Error fetching pet parents';
        setError(errors);
        setLoading(false);
      }
    };

    fetchPetParents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Pet Parents</h1>
      {petParents.map(petParent => (
        <div key={petParent._id} className="pet-parent-card">
          {petParent.userId ? (
            <>
              <h2>{petParent.userId.username}</h2>
              <p>Email: {petParent.userId.email}</p>
              <p>Phone: {petParent.userId.phoneNumber}</p>
            </>
          ) : (
            <p>User information not available</p>
          )}
          <p>Address: {petParent.address}</p>
          <div>
            <h3>Profile Photo:</h3>
            <img src={petParent.photo} alt="Profile" style={{ maxWidth: '200px' }} />
          </div>
          <div>
            <h3>Proof Document:</h3>
            {petParent.proof.endsWith('.pdf') ? (
              <a href={petParent.proof} target="_blank" rel="noopener noreferrer">View PDF</a>
            ) : (
              <img src={petParent.proof} alt="Proof" style={{ maxWidth: '200px' }} />
            )}
          </div>
          <Link to={`/single-petparent`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default PetParentList;
