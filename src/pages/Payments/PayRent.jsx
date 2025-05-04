import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PayRent = () => {
  const { state } = useLocation();
  const totalPayment = state?.totalPayment || 0;
  const apartmentNos = state?.apartmentNos || []; // Extract apartmentNos from state

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Complete Your Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalPayment={totalPayment} apartmentNos={apartmentNos} />
      </Elements>
    </div>
  );
};

export default PayRent;