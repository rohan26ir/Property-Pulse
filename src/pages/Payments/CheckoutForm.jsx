import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get state from navigation
  const { totalPayment, apartmentNos } = location.state || { totalPayment: 0, apartmentNos: [] }; // Extract totalPayment and apartmentNos
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    if (totalPayment > 0) {
      axiosSecure
        .post('/create-payment-intent', { price: totalPayment })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error('Error creating payment intent:', err);
          setError('Failed to initialize payment');
        });
    }
  }, [axiosSecure, totalPayment]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      setError('Payment initialization failed');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Card details not found');
      return;
    }

    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (methodError) {
      setError(methodError.message);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
    } else if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);
      const payment = {
        email: user.email,
        price: totalPayment,
        transactionId: paymentIntent.id,
        status: 'completed', // Set status to 'completed'
        date: new Date(),
        apartmentNos: apartmentNos || [], // Use apartmentNos as an array
      };
      try {
        const response = await axiosSecure.post('/payments', payment);
        if (response.data.status === 'success') {
          Swal.fire('Success', 'Payment completed successfully!', 'success');
          navigate('/dashboard/payment-history');
        } else {
          setError('Payment processing failed');
        }
      } catch (error) {
        setError('Failed to save payment');
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Pay for Apartments: {apartmentNos.join(', ')}</h2>
      <form onSubmit={handleSubmit} className="max-w-md p-4 border rounded-md shadow-md">
        <CardElement
          options={{
            style: {
              base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } },
              invalid: { color: '#9e2146' },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-sm btn-primary my-4"
          disabled={!stripe || !clientSecret || totalPayment <= 0}
        >
          Pay ${totalPayment.toFixed(2)}
        </button>
        {error && <p className="text-red-600">{error}</p>}
        {transactionId && <p className="text-green-600">Transaction successful! ID: {transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;