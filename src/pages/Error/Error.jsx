import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import errorAnimation from "../../../public/Animation - 1737920242048.json";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Animated Error Illustration */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-64 h-64"
      >
        <Lottie animationData={errorAnimation} loop={true} />
      </motion.div>

      {/* Error Message */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-red-500">
          Oops! Something Went Wrong.
        </h1>
        <p className="text-gray-600 mt-2">
          It seems like there was an issue accessing this building's rent page. 
        </p>
        <p className="text-gray-600">
          Please check the URL or return to the main page.
        </p>

        {/* Navigation Button */}
        <Link to="/">
          <button className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Go Back Home
          </button>
        </Link>
      </motion.div>


      
    </div>
  );
};

export default Error;
