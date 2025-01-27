import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Agreement = () => {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Fetch agreements from the API
  useEffect(() => {
    const fetchAgreements = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosSecure.get('/agreements');
        setAgreements(response.data);
      } catch (err) {
        console.error('Error fetching agreements:', err);
        setError('Failed to fetch agreements. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAgreements();
  }, [axiosSecure]);

  // Delete agreement function
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/agreements/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // Immediately update the state to remove the deleted agreement
              setAgreements(agreements.filter((agreement) => agreement._id !== id));

              // Show success toast
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Your agreement has been deleted.',
                timer: 1500, // Auto-close after 1.5 seconds
                showConfirmButton: false
              });
            }
          })
          .catch((err) => {
            console.error('Error deleting agreement:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to delete agreement.',
              timer: 1500,
              showConfirmButton: false
            });
          });
      }
    });
  };

  // Calculate the total rent
  const totalRent = agreements.reduce((sum, agreement) => sum + (agreement.rent || 0), 0);

  if (loading) {
    return <div className="flex justify-center items-center h-60">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-6">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Your Agreements</h2>
      {agreements.length === 0 ? (
        <div className="text-center text-gray-500">
          No agreements found. <Link to="/create-agreement" className="text-blue-500 underline">Create a new agreement</Link>.
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <h4>Total Agreements: {agreements.length}</h4>
            <h4 className="text-green-600 font-semibold">Total Rent: ${totalRent}</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300">#</th>
                  <th className="border border-gray-300">Apartment Image</th>
                  <th className="border border-gray-300">Block Name</th>
                  <th className="border border-gray-300">Floor No</th>
                  <th className="border border-gray-300">Apartment No</th>
                  <th className="border border-gray-300">Rent</th>
                  <th className="border border-gray-300">Status</th>
                  <th className="border border-gray-300">Agreement Date</th>
                  <th className="border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {agreements.map((agreement, index) => (
                  <tr key={agreement._id}>
                    <td className="border border-gray-300">{index + 1}</td>
                    <td className="border border-gray-300">
                      <img
                        src={agreement.apartmentImage || "https://via.placeholder.com/100"}
                        alt="Apartment"
                        className="w-20 h-20 object-cover"
                      />
                    </td>
                    <td className="border border-gray-300">{agreement.blockName}</td>
                    <td className="border border-gray-300">{agreement.floorNo}</td>
                    <td className="border border-gray-300">{agreement.apartmentNo}</td>
                    <td className="border border-gray-300">${agreement.rent}</td>
                    <td className="border border-gray-300">{agreement.status}</td>
                    <td className="border border-gray-300">{new Date(agreement.agreementRequestDate).toLocaleDateString()}</td>
                    <td className="border border-gray-300 text-center">
                      <button
                        onClick={() => handleDelete(agreement._id)}
                        className="btn btn-ghost btn-lg text-red-500">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Agreement;
