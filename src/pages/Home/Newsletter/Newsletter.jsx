import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';  // Importing email icon
import Swal from 'sweetalert2';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email is valid
    if (email === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 3000, // Automatically close after 3 seconds
        showConfirmButton: false,
      });
      return;
    }

    // Show success toast with auto-close
    Swal.fire({
      title: 'Success!',
      text: 'You have successfully subscribed to the newsletter.',
      icon: 'success',
      timer: 800, // Automatically close after 3 seconds
      showConfirmButton: false, // Hide confirm button
    });

    // Clear email input after submission
    setEmail('');
  };

  return (
    <div className='py-6'>
      <div className="p-8 bg-white rounded-lg shadow-md w-full flex flex-col md:flex-row items-center">
       
       <div>
       <h2 className="text-2xl font-bold text-center mb-4">Stay Updated with Our Newsletter!</h2>
        <p className="text-center mb-6 text-gray-700">
          Subscribe to receive the latest updates and offers directly to your inbox.
        </p>

       </div>

        <div className='w-[30%] mx-auto'>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaEnvelope className="text-gray-500 ml-3" />
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="px-4 py-2 w-full border-none rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="border-2 border-gray-300 text-black py-2 rounded-md hover:bg-gray-200 transition duration-200"
            >
              Subscribe Now
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Newsletter;
