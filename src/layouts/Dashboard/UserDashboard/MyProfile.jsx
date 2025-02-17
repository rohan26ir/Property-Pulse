import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

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
        const response = await axiosSecure.get("/agreements");
        setAgreements(response.data);
      } catch (err) {
        console.error("Error fetching agreements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgreements();
  }, [axiosSecure]);

  // Filter agreements to only include those with "accepted" status
  const acceptedAgreements = agreements.filter(
    (agreement) => agreement.status === "accepted"
  );

  // Calculate total rent from accepted agreements
  const totalRent = acceptedAgreements.reduce(
    (total, agreement) => total + agreement.rent,
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center my-auto bg-gradient-to-br from-blue-50 to-blue-200 rounded-lg p-8 space-y-8">


      <Helmet>
        <title>My Profile - PropertyPulse</title>
      </Helmet>

      {/* Profile Section */}
      <motion.div
        className="px-10 py-6 w-full max-w-4xl bg-white shadow-xl rounded-xl flex items-center gap-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
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

        <motion.div
          className="flex flex-col flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800">
            {displayName || "User Name"}
          </h2>
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
          <p className="text-lg text-gray-700">
            <strong>Total Accepted Agreements:</strong>{" "}
            {acceptedAgreements.length}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Total Rent:</strong> ${totalRent}
          </p>
        </div>
      </motion.div>

      {/* Display All Accepted Agreements in Table */}
      {acceptedAgreements.length > 0 ? (
        <div className="w-full max-w-4xl bg-white p-6 shadow-xl rounded-xl overflow-x-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Accepted Agreements
          </h3>
          <table className="w-full border-collapse border border-gray-200 text-left">
            <thead className="bg-blue-100 text-gray-800">
              <tr>
                <th className="p-3 border border-gray-200">#</th>
                <th className="p-3 border border-gray-200">Block Name</th>
                <th className="p-3 border border-gray-200">Floor No</th>
                <th className="p-3 border border-gray-200">Apartment No</th>
                <th className="p-3 border border-gray-200">Rent</th>
                <th className="p-3 border border-gray-200">Status</th>
                <th className="p-3 border border-gray-200">Agreement Date</th>
              </tr>
            </thead>
            <tbody>
              {acceptedAgreements.map((agreement, index) => (
                <tr key={agreement._id} className="hover:bg-blue-50">
                  <td className="p-3 border border-gray-200">{index + 1}</td>
                  <td className="p-3 border border-gray-200">
                    {agreement.blockName}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {agreement.floorNo}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {agreement.apartmentNo}
                  </td>
                  <td className="p-3 border border-gray-200">
                    ${agreement.rent}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {agreement.status}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {new Date(
                      agreement.agreementRequestDate
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 text-lg text-gray-600">
          No accepted agreements found.
        </div>
      )}
    </div>
  );
};

export default MyProfile;
