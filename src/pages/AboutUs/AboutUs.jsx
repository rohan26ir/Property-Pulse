import React from 'react';
import aboutImg from '../../assets/aboutUs1.svg'

const AboutUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-full">
          <img src={aboutImg} alt="About Us" className="w-full h-80 object-contain" />
        </div>
        {/* Content Section */}
        <div className="p-6 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-gray-600 text-lg mb-4">
            Welcome to PropertyPulse, your trusted Building Management System. Our platform simplifies property
            management by providing seamless solutions for tenants, landlords, and building administrators.
            We aim to enhance efficiency, transparency, and convenience in managing properties with innovative
            technology.
          </p>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md flex-1">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Our Mission</h2>
              <p className="text-gray-600 text-lg">
                Our mission is to revolutionize the real estate industry by integrating technology with property
                management. We strive to provide a user-friendly and efficient platform that helps users manage 
                their properties effortlessly while maintaining transparency and accuracy in all transactions.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md flex-1">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Why Choose Us?</h2>
              <p className="text-gray-600 text-lg">
                At PropertyPulse, we prioritize customer satisfaction, offering a seamless and intuitive experience.
                Our features include automated rent collection, maintenance tracking, and real-time communication
                between landlords and tenants. We continuously innovate to make property management a hassle-free
                experience for all stakeholders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;