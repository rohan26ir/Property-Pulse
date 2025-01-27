import React from 'react';
import useAuth from '../../hooks/useAuth';
import { motion } from "framer-motion";

const MemberProfile = () => {
  const { user } = useAuth();
  const { displayName, email, photoURL } = user;

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="px-20 py-10 flex flex-row gap-5 items-center bg-[#111827] shadow-lg rounded-lg"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
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
            className="w-32 h-32 rounded-full shadow-lg object-cover border-4 border-blue-300"
          />
        </motion.div>

        {/* User Details */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-300">{displayName || "User Name"}</h2>
          <p className="text-gray-400  mt-2">{email}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MemberProfile;
