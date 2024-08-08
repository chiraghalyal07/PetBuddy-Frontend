// src/components/CheckoutForm.js
import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from '../../config/axios';

const CheckoutForm = ({ clientSecret,bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error('Payment error:', error);
      alert('Payment failed');
    } else if (paymentIntent.status === 'succeeded') {
      try {
        await axios.put(`/api/payment-success/${paymentIntent.id}`);
        alert('Payment successful');
      } catch (error) {
        console.error('Error updating payment status:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
