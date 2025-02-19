import React from 'react';

const Services = () => {
  const services = [
    { title: "Property Management", description: "Efficiently manage properties with our comprehensive tools and features." },
    { title: "Maintenance Tracking", description: "Keep track of maintenance requests and resolve issues seamlessly." },
    { title: "Tenant Communication", description: "Facilitate easy communication between tenants and landlords." },
    { title: "Automated Rent Collection", description: "Simplify rent payments with our secure automated system." },
    { title: "Financial Reports", description: "Access detailed financial reports to manage expenses and revenue." },
    { title: "Security & Access Control", description: "Ensure safety with modern security solutions and access control systems." },
    { title: "Smart Notifications", description: "Receive timely updates and alerts for property-related tasks." },
    { title: "Legal Compliance Support", description: "Stay compliant with legal requirements through our expert guidance." }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Our Services</h1>
        <p className="text-lg text-center text-gray-600 mb-10">We provide a range of services to help property managers, landlords, and tenants streamline their operations.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 shadow-lg rounded-lg text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
