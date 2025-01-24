import React from "react";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import { div } from "motion/react-client";

const MyProfile = () => {
  const { user } = useAuth();
  const { displayName, email, photoURL } = user;

  return (
    <div className="w-11/12 mx-auto">
      <div className=" flex justify-center items-center bg-gradient-to-br from-blue-100 to-purple-200">
      <motion.div
        className="max-w-sm p-6 shadow-lg rounded-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="flex justify-center"
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
        <div className="text-center mt-4">
          <motion.h2
            className="text-2xl font-bold text-gray-800"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {displayName || "User Name"}
          </motion.h2>
          <motion.p
            className="text-gray-600 mt-2"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {email}
          </motion.p>
        </div>
        <motion.div
          className="mt-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
        >
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200">
            Edit Profile
          </button>
        </motion.div>
      </motion.div>
    </div>
    </div>
  );
};

export default MyProfile;
