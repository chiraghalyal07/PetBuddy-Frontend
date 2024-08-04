import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceName, setServiceName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [services, setServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingDurationInHours, setBookingDurationInHours] = useState(0);
  const [caretakerBusinessName, setCaretakerBusinessName] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCaretakerDetails = async () => {
      try {
        const response = await axios.get(`/api/singlecaretaker/${id}`);
        setServices(response.data.serviceCharges || []);
        setCaretakerBusinessName(response.data.careTakerBusinessName || '');
      } catch (error) {
        console.error('Error fetching caretaker details:', error);
      }
    };

    fetchCaretakerDetails();
  }, [id]);

  const calculateTotalAmount = () => {
    if (!startTime || !endTime || !serviceName) return;

    try {
      const start = new Date(startTime);
      const end = new Date(endTime);
      
      const durationInMinutes = (end - start) / (1000 * 60); // duration in minutes
      const durationInHours = durationInMinutes / 60; // convert minutes to hours
      console.log('hr:',durationInHours,'min:',durationInMinutes)

      if (durationInMinutes <= 0) {
        throw new Error('start time cannot be equal or less than end time.');
      }

      const serviceCharge = services.find(charge => charge.name === serviceName);
      if (serviceCharge) {
        const hourlyRate = serviceCharge.amount / serviceCharge.time;
        setTotalAmount(hourlyRate * durationInHours);
        setBookingDurationInHours(parseFloat((durationInMinutes / 60).toFixed(2))); // limit to two decimal places
      }
    } catch (error) {
      console.error('Error calculating total amount:', error);
      setTotalAmount(0);
      setBookingDurationInHours(0);
    }
  };

  useEffect(() => {
    if (startTime && endTime) {
      calculateTotalAmount();
    }
  }, [startTime, endTime, serviceName]);

  const runValidation = () => {
    let validationErrors = {};

    // Validate Service Name
    if (!serviceName) validationErrors.serviceName = 'Please select a service.';

    // Validate Start and End Time
    if (!startTime) validationErrors.startTime = 'Please select a start time.';
    if (!endTime) validationErrors.endTime = 'Please select an end time.';
    if (startTime && endTime && new Date(endTime) <= new Date(startTime)) {
      validationErrors.timeRange = 'End time must be after start time.';
    }

    // Validate Amount and Duration
    if (isNaN(totalAmount) || totalAmount <= 0) validationErrors.totalAmount = 'Total amount is invalid.';
    if (isNaN(bookingDurationInHours) || bookingDurationInHours <= 0) validationErrors.bookingDurationInHours = 'Booking duration is invalid.';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return false;
    }
    return true;
  };

  const handleServiceNameChange = (e) => {
    setServiceName(e.target.value);
    runValidation();
  };
  const handleServiceNameBlur = () => {
    runValidation();
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    runValidation();
    // calculateTotalAmount();
  };
  const handleStartTimeBlur = () => {
    runValidation();
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    runValidation();
    calculateTotalAmount();
  };
  const handleEndTimeBlur = () => {
    runValidation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!runValidation()) return;

    const bookingData = {
      serviceName,
      date: {
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
      },
      totalAmount,
      bookingDurationInHours,
    };

    try {
      const response = await axios.post(`/api/new-booking/${id}`, bookingData, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      console.log('Booking created:', response.data);
      toast.success("Booking Created successfully.");
      alert("Please wait untill the Care-Taker accepts your booking");
      // Extract the booking ID from the response
      const bookingId = response.data._id;

      // Navigate to the next page with the booking ID
      navigate(`/booking-details/${bookingId}`);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <><h2>Booking Care-Taker</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Service Name:</label>
        <select value={serviceName} onChange={handleServiceNameChange} onBlur={handleServiceNameBlur}>
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.name} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
        {errors.serviceName && <p className="error">{errors.serviceName}</p>}
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={handleStartTimeChange}
          onBlur={handleStartTimeBlur}
        />
        {errors.startTime && <p className="error">{errors.startTime}</p>}
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={handleEndTimeChange}
          onBlur={handleEndTimeBlur}
        />
        {errors.endTime && <p className="error">{errors.endTime}</p>}
        {errors.timeRange && <p className="error">{errors.timeRange}</p>}
      </div>
      <div>
        <p>Total Amount: ₹ {totalAmount.toFixed(2)}</p>
        <p>Booking Duration: {bookingDurationInHours.toFixed(2)} hours</p>
        <p>CareTaker: {caretakerBusinessName}</p>
      </div>
      <button type="submit">Book Now</button>
    </form>
    <ToastContainer />
    </>
  );
};

export default BookingForm;
