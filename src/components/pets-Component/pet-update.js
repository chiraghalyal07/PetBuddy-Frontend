import React, { useEffect, useState } from 'react';
import axios from '../../config/axios'; // Adjust the path as needed
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../utility/spinner';

export default function PetUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    petName: '',
    age: '',
    gender: '',
    category: '',
    breed: '',
    petPhoto: null,
    weight: '',
    vaccinated: false,
    medication: [{ medicationName: '', description: '', dueDate: '', dose: '' }],
    reminders: [{ date: '', title: '', note: '' }],
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMedicationDetails, setShowMedicationDetails] = useState(false);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await axios.get(`/api/single-pet`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        console.log(response.data)
        const petData = response.data;
        setFormData({
          petName: petData.petName,
          age: petData.age,
          gender: petData.gender,
          category: petData.category,
          breed: petData.breed,
          petPhoto: null, // You might need to handle URL or file upload differently
          weight: petData.weight,
          vaccinated: petData.vaccinated,
          medication: petData.medication || [{ medicationName: '', description: '', dueDate: '', dose: '' }],
          reminders: petData.reminders || [{ date: '', title: '', note: '' }],
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch pet data');
        setLoading(false);
      }
    };

    fetchPetData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name.includes('.')) {
      const [arrayName, index, fieldName] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [arrayName]: prev[arrayName].map((item, idx) =>
          idx === parseInt(index) ? { ...item, [fieldName]: value } : item
        ),
      }));
    } else if (name === 'vaccinated') {
      setFormData((prev) => ({ ...prev, [name]: value === 'Yes' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleToggleMedicationDetails = () => {
    setShowMedicationDetails((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          for (const subKey in item) {
            formDataToSend.append(`${key}[${index}][${subKey}]`, item[subKey]);
          }
        });
      } else if (typeof formData[key] === 'object' && formData[key] !== null && key !== 'petPhoto') {
        // Handle objects if necessary, but not the petPhoto
        for (const subKey in formData[key]) {
          formDataToSend.append(`${key}[${subKey}]`, formData[key][subKey]);
        }
      } else {
        if (key === 'petPhoto' && formData[key]) {
          // Append the file directly for petPhoto
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
    }
    console.log('FormData:', formDataToSend);
  
    try {
      const response = await axios.put(`/api/updatepet/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token'),
        },
      });
      console.log(response.data);
      toast.success('Pet details updated successfully!');
      navigate('/single-pet');
    } catch (err) {
      console.error(err);
      setError({ fetch: 'Something went wrong' });
    }
  };
  
  

  if (loading) return <Spinner />;
  if (error) return <div>{error.fetch || error}</div>;

  return (
    <div>
      <h1>Update Pet Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pet Name:</label>
          <input
            type="text"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label>Age:</label>
          <input
            type="date"
            name="age"
            value={formData.age ? formData.age.split('T')[0] : ''}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label>Gender:</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleChange}
            id='male'
          />
          <label htmlFor='male'>Male</label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleChange}
            id='female'
          />
          <label htmlFor='female'>Female</label>
        </div>
        <br />
        <div>
          <label>Category:</label>
          <input
            type="radio"
            name="category"
            value="Cat"
            checked={formData.category === 'Cat'}
            onChange={handleChange}
            id='cat'
          />
          <label htmlFor='cat'>Cat</label>
          <input
            type="radio"
            name="category"
            value="Dog"
            checked={formData.category === 'Dog'}
            onChange={handleChange}
            id='dog'
          />
          <label htmlFor='dog'>Dog</label>
        </div>
        <br />
        <div>
          <label>Breed:</label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label>Pet Photo:</label>
          <input
            type="file"
            id='petPhoto'
            name="petPhoto"
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label>Weight:</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label>Vaccinated:</label>
          <input
            type="radio"
            name="vaccinated"
            value="Yes"
            checked={formData.vaccinated === true}
            onChange={handleChange}
          />
          <label>Yes</label>
          <input
            type="radio"
            name="vaccinated"
            value="No"
            checked={formData.vaccinated === false}
            onChange={handleChange}
          />
          <label>No</label>
        </div>
        <br />
        <div>
          <input
            type="checkbox"
            checked={showMedicationDetails}
            onChange={handleToggleMedicationDetails}
            id='show'
          />
          <label htmlFor='show'>Show Medication Details</label>
        </div>
        {showMedicationDetails && (
          <div>
            <h3>Medication Details</h3>
            <div>
              <label>Medication Name:</label>
              <input
                type="text"
                name="medication.0.medicationName"
                value={formData.medication[0]?.medicationName}
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="medication.0.description"
                value={formData.medication[0]?.description}
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <label>Due Date:</label>
              <input
                type="date"
                name="medication.0.dueDate"
                value={formData.medication[0]?.dueDate ? formData.medication[0].dueDate.split('T')[0] : ''}
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <label>Dose:</label>
              <input
                type="text"
                name="medication.0.dose"
                value={formData.medication[0]?.dose}
                onChange={handleChange}
              />
            </div>
            <br />
          </div>
        )}
        <div>
          <h4>Reminders</h4>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="reminders.0.date"
              value={formData.reminders[0]?.date ? formData.reminders[0].date.split('T')[0] : ''}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="reminders.0.title"
              value={formData.reminders[0]?.title}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label>Note:</label>
            <textarea
              name="reminders.0.note"
              value={formData.reminders[0]?.note}
              onChange={handleChange}
            />
          </div>
          <br />
        </div>
        <button type="submit">Update</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error.fetch}</div>}
      <ToastContainer />
    </div>
  );
}