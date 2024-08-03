import React, { useState } from 'react';
import axios from '../../config/axios'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function PetForm() {
  const [formData, setFormData] = useState({
    petName: '',
    age: '',
    gender: '',
    category: '',
    breed: '',
    petPhoto: null, // Use null initially
    weight: '',
    vaccinated: false,
    medication: [{ medicationName: '', description: '', dueDate: '', dose: '' }],
    reminders: [{ date: '', title: '', note: '' }],
  });

  const [error, setError] = useState(null);
  const [showMedicationDetails, setShowMedicationDetails] = useState(false);

  const navigate = useNavigate();

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
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('/api/newpet', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token'),
        },
      });
      console.log(response.data);
      toast.success('Pet Account created successfully!');
      navigate('/single-pet');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h1>Enter Pet Details</h1>
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
            id='yes'
          />
          <label htmlFor='yes'>Yes</label>
          <input
            type="radio"
            name="vaccinated"
            value="No"
            checked={formData.vaccinated === false}
            onChange={handleChange}
            id='no'
          />
          <label htmlFor='no'>No</label>
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
        <button type="submit">Submit</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
