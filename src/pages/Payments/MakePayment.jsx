import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MakePayment = () => {
  const [agreements, setAgreements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  // Fetch agreements data and filter by user email and unpaid status
  useEffect(() => {
    const fetchAgreements = async () => {
      if (!user?.email) return;
      setIsLoading(true);
      try {
        const { data } = await axiosSecure.get('/agreements');
        const filteredAgreements = data.filter(
          (agreement) =>
            agreement.userEmail === user.email &&
            agreement.rent > 0 &&
            agreement.status !== 'paid' // Exclude paid agreements
        );
        setAgreements(filteredAgreements);
      } catch (error) {
        console.error('Error fetching agreements:', error);
        Swal.fire('Error', 'Failed to load agreements. Please try again.', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgreements();
  }, [axiosSecure, user]);

  // Calculate total payment for all agreements
  const totalPayment = agreements.reduce((sum, agreement) => sum + (agreement.rent || 0), 0);

  // Extract all apartmentNo values from agreements
  const apartmentNos = agreements.map((agreement) => agreement.apartmentNo);

  if (!user) {
    return (
      <div className="text-center p-6">
        <h3 className="text-2xl font-semibold mb-4">Please Log In</h3>
        <p className="text-gray-600">You need to log in to view your agreements.</p>
        <Link to="/login" className="btn btn-primary mt-4">
          Log In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center p-6">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="text-gray-600 mt-2">Loading agreements...</p>
      </div>
    );
  }

  if (!agreements.length) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
        <h3 className="text-2xl font-semibold mb-4">No Payments Due</h3>
        <p className="text-gray-600 mb-6">
          You have no unpaid agreements at this time. Explore available apartments to find your next home!
        </p>
        <Link to="/apartment" className="btn btn-primary">
          Browse Apartments
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-evenly mb-8">
        <h2 className="text-4xl">Agreements: {agreements.length}</h2>
        <h2 className="text-4xl">Total Payment: ${totalPayment.toFixed(2)}</h2>
        {agreements.length ? (
          <Link to="/dashboard/pay-rent" state={{ totalPayment, apartmentNos }}>
            <button className="btn btn-primary">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary">
            Pay
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Block Name</th>
              <th>Apartment No</th>
              <th>Floor</th>
              <th>Member Email</th>
              <th>Rent</th>
            </tr>
          </thead>
          <tbody>
            {agreements.map((agreement, index) => (
              <tr key={agreement._id}>
                <th>{index + 1}</th>
                <td>{agreement.blockName}</td>
                <td>{agreement.apartmentNo}</td>
                <td>{agreement.floorNo}</td>
                <td className="text-red-600">{agreement.userEmail}</td>
                <td>${agreement.rent.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakePayment;