import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const AdminProfile = () => {
  const { user } = useAuth();
  const { displayName, email, photoURL, metadata, phoneNumber, emailVerified } = user;
  const axiosSecure = useAxiosSecure();

  const [data, setData] = useState({
    totalRooms: 0,
    availablePercentage: 0,
    unavailablePercentage: 0,
    usersWithoutRole: 0,
    totalMembers: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(displayName || "");
  const [phone, setPhone] = useState(phoneNumber || "");
  const [photo, setPhoto] = useState(photoURL || "");
  const [location, setLocation] = useState("");

  // Fetch additional user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setPhone(userDoc.data().phone || "");
        setLocation(userDoc.data().location || "");
      }
    };
    fetchUserData();
  }, [user.uid]);

  // Fetch Admin Dashboard Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apartmentsResponse = await axiosSecure.get("/apartment");
        const totalRooms = apartmentsResponse.data.total || 0;

        const availableRooms = await axiosSecure.get("/agreementsAccep");
        const availableCount = availableRooms.data.apartments.length;
        const unavailableCount = totalRooms - availableCount;

        const availablePercentage = ((availableCount / totalRooms) * 100).toFixed(2);
        const unavailablePercentage = ((unavailableCount / totalRooms) * 100).toFixed(2);

        const usersResponse = await axiosSecure.get("/users");
        const users = usersResponse.data;

        const usersWithoutRole = users.filter(user => !user.role).length;
        const totalMembers = users.filter(user => user.role === "member").length;

        setData({
          totalRooms,
          availablePercentage,
          unavailablePercentage,
          usersWithoutRole,
          totalMembers,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  // Handle Profile Update
  const handleUpdate = async () => {
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      // Update Firestore with phone number and location
      await updateDoc(doc(db, "users", user.uid), {
        phone,
        location,
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <motion.div
        className="px-10 py-8 flex flex-row gap-6 items-center bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl rounded-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
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

        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-3xl font-extrabold text-white">{displayName || "User Name"}</h2>
          <p className="text-gray-200 mt-2 text-lg">{email}</p>
          <p className="text-gray-200 mt-1 text-lg">Phone: {phone || "N/A"}</p>
          <p className="text-gray-200 mt-1 text-lg">Location: {location || "N/A"}</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition"
          >
            Update Profile
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-4xl text-gray-300"
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full p-2 border rounded mb-3" />
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" className="w-full p-2 border rounded mb-3" />
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" className="w-full p-2 border rounded mb-3" />
            <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
