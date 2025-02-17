import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";

const AboutBuilding = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/aboutBuilding.json")
      .then((res) => res.json()) 
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600">About The Building</h2>
        <p className="text-gray-700">
          Explore details about our apartments and find your perfect match!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((building) => (
          <div
            key={building._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={building.imageGallery[0]}
              alt={building.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-blue-800">{building.name}</h3>
              <p className="text-gray-700 mt-2">{building.description}</p>
              
              <div className="mt-4 text-sm text-gray-500">
                <p className="flex items-center gap-2">
                  <strong><FaMapLocationDot /></strong> {building.location.displayLocation}
                </p>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutBuilding;
