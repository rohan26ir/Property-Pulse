import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user } = useAuth();
  const { displayName, email, photoURL } = user;
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Fetch all agreements to check the status
  useEffect(() => {
    const fetchAgreements = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get('/agreements');
        setAgreements(response.data);
      } catch (err) {
        console.error('Error fetching agreements:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgreements();
  }, [axiosSecure]);

  // Filter agreements to only include those with "accepted" status
  const acceptedAgreements = agreements.filter((agreement) => agreement.status === "accepted");

  // Calculate total rent from accepted agreements
  const totalRent = acceptedAgreements.reduce((total, agreement) => total + agreement.rent, 0);

  if (loading) {
    return <div className="flex justify-center items-center h-60 text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center my-auto bg-gradient-to-br from-blue-50 to-blue-200 rounded-lg p-8 space-y-8">
      {/* Profile Section */}
      <motion.div
        className="px-10 py-6 w-full max-w-4xl bg-white shadow-xl rounded-xl flex items-center gap-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Profile Image */}
        <motion.div
          className="flex-shrink-0"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <img
            src={photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-40 h-40 rounded-full shadow-lg object-cover border-4 border-blue-400"
          />
        </motion.div>

        {/* User Details */}
        <motion.div
          className="flex flex-col flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800">{displayName || "User Name"}</h2>
          <p className="text-lg text-gray-600 mt-2">{email}</p>
        </motion.div>
      </motion.div>

      {/* Total Rent and Total Accepted Agreements */}
      <motion.div
        className="w-full max-w-4xl bg-white p-6 shadow-xl rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-semibold text-gray-800">Summary</h3>
        <div className="mt-6 space-y-4">
          <p className="text-lg text-gray-700"><strong>Total Accepted Agreements:</strong> {acceptedAgreements.length}</p>
          <p className="text-lg text-gray-700"><strong>Total Rent:</strong> ${totalRent}</p>
        </div>
      </motion.div>

      {/* Display All Accepted Agreements */}
      {acceptedAgreements.length > 0 ? (
        <div className="w-full max-w-4xl bg-white p-6 shadow-xl rounded-xl">
          <h3 className="text-2xl font-semibold text-gray-800">Accepted Agreements</h3>
          <div className="mt-6 space-y-6">
            {acceptedAgreements.map((agreement) => (
              <motion.div
                key={agreement._id}
                className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h4 className="text-xl font-semibold text-gray-700">Agreement Details</h4>
                <div className="mt-4 space-y-4">
                  <div className="flex gap-4 items-center">
                    <strong className="text-gray-600">Apartment Image:</strong>
                    <img
                      src={agreement.apartmentImage}
                      alt="Apartment"
                      className="w-32 h-32 object-cover rounded-md shadow-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <p><strong className="text-gray-600">Block Name:</strong> {agreement.blockName}</p>
                    <p><strong className="text-gray-600">Floor No:</strong> {agreement.floorNo}</p>
                    <p><strong className="text-gray-600">Apartment No:</strong> {agreement.apartmentNo}</p>
                    <p><strong className="text-gray-600">Rent:</strong> ${agreement.rent}</p>
                    <p><strong className="text-gray-600">Status:</strong> {agreement.status}</p>
                    <p><strong className="text-gray-600">Agreement Request Date:</strong> {new Date(agreement.agreementRequestDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 text-lg text-gray-600">No accepted agreements found.</div>
      )}
    </div>
  );
};

export default MyProfile;
