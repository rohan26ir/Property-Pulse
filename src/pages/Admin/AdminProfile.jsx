import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { motion } from "framer-motion";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AdminProfile = () => {
  const { user } = useAuth();
  const { displayName, email, photoURL } = user;
  const axiosSecure = useAxiosSecure();

  const [data, setData] = useState({
    totalRooms: 0,
    availablePercentage: 0,
    unavailablePercentage: 0,
    usersWithoutRole: 0,
    totalMembers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total number of rooms
        const apartmentsResponse = await axiosSecure.get('/apartment');
        const totalRooms = apartmentsResponse.data.total || 0;

        // Calculate room availability percentages
        const availableRooms = await axiosSecure.get('/agreementsAccep');
        const availableCount = availableRooms.data.apartments.length;
        const unavailableCount = totalRooms - availableCount;

        const availablePercentage = ((availableCount / totalRooms) * 100).toFixed(2);
        const unavailablePercentage = ((unavailableCount / totalRooms) * 100).toFixed(2);

        console.log("Available:", availableCount, "Unavailable:", unavailableCount);

        // Fetch all users
        const usersResponse = await axiosSecure.get('/users');
        const users = usersResponse.data;

        const usersWithoutRole = users.filter(user => !user.role).length;
        const totalMembers = users.filter(user => user.role === 'member').length;

        setData({
          totalRooms,
          availablePercentage,
          unavailablePercentage,
          usersWithoutRole,
          totalMembers,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <motion.div
        className="px-10 py-8 flex flex-row gap-6 items-center bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl rounded-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Profile Image */}
        <motion.div
          className="flex-shrink-0"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <img
            src={photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md object-cover border-4 border-white"
          />
        </motion.div>

        {/* User Details */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-3xl font-extrabold text-white">{displayName || "User Name"}</h2>
          <p className="text-gray-200 mt-2 text-lg">{email}</p>
        </motion.div>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        className="bg-gradient-to-r from-gray-800 to-gray-700 shadow-lg rounded-lg p-8 w-full max-w-4xl text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 border-b-2 border-gray-600 pb-2">Admin Dashboard Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-lg p-4 shadow-md">
            <h4 className="text-xl font-semibold text-blue-400">Total Rooms</h4>
            <p className="text-3xl font-bold mt-2 text-white">{data.totalRooms}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 shadow-md">
            <h4 className="text-xl font-semibold text-green-400">Available Rooms (%)</h4>
            <p className="text-3xl font-bold mt-2 text-white">{data.availablePercentage}%</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 shadow-md">
            <h4 className="text-xl font-semibold text-red-400">Unavailable Rooms (%)</h4>
            <p className="text-3xl font-bold mt-2 text-white">{data.unavailablePercentage}%</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 shadow-md">
            <h4 className="text-xl font-semibold text-yellow-400">Users Without Role</h4>
            <p className="text-3xl font-bold mt-2 text-white">{data.usersWithoutRole}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 shadow-md col-span-2">
            <h4 className="text-xl font-semibold text-purple-400">Total Members</h4>
            <p className="text-3xl font-bold mt-2 text-white">{data.totalMembers}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminProfile;
