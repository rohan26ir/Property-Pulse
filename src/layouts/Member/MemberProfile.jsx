import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { updateProfile } from "firebase/auth";

const MemberProfile = () => {
  const { user } = useAuth();
  const { displayName, email, photoURL, metadata, phoneNumber, emailVerified } = user;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(displayName || "");
  const [phone, setPhone] = useState(phoneNumber || "");
  const [photo, setPhoto] = useState(photoURL || "");

  // Update user info in Firebase
  const handleUpdate = async () => {
    try {
      await updateProfile(user, {
        displayName: name,
        phoneNumber: phone,
        photoURL: photo,
      });

      // Close modal on success
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-10 bg-gray-100 h-screen">
      <motion.div
        className="py-10 px-6 flex flex-row justify-center gap-20 items-center bg-white shadow-lg rounded-lg w-full max-w-4xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Profile Image */}
        <motion.div
          className="flex-shrink-0  "
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <img
            src={photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-lg object-cover border-4 border-blue-300"
          />
        </motion.div>

        {/* User Details */}
        <motion.div
          className="flex flex-col space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold ">{displayName || "User Name"}</h2>
          <p className="">Email: {email}</p>
          <p className="">Phone: {phoneNumber || "N/A"}</p>
          <p className="">
            Email Verified:{" "}
            <span className={emailVerified ? "text-gray-400" : "text-red-400"}>
              {emailVerified ? "Yes" : "No"}
            </span>
          </p>
          <p className="">
            Location:{" "}
            <span className={emailVerified ? "text-gray-400" : "text-red-400"}>
              {location ? "N/A" : ""}
            </span>
          </p>
          
          <p className="">Created At: {metadata?.creationTime ? new Date(metadata.creationTime).toLocaleString() : "N/A"}</p>
          <p className="">Last Sign-In: {metadata?.lastSignInTime ? new Date(metadata.lastSignInTime).toLocaleString() : "N/A"}</p>

          {/* Update Profile Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-4 py-2 border-2 rounded-lg hover:bg-gray-300 transition"
          >
            Update Profile
          </button>
        </motion.div>
      </motion.div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
            
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">Location:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">Photo URL:</label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberProfile;
