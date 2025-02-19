import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";

const AboutBuilding = () => {
  const [data, setData] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  useEffect(() => {
    fetch("/aboutBuilding.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleReadMore = (building) => {
    setSelectedBuilding(building);
    document.getElementById("my_modal_5").showModal(); // Open the modal when "Read More" is clicked
  };

  return (
    <div className="">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">About The Building</h2>
        <p className="text-gray-700">
          Explore details about our apartments and find your perfect match!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((building) => (
          <div
            key={building._id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={building.imageGallery[0]}
              alt={building.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-blue-800">{building.name}</h3>
              <p className="text-gray-700 mt-2 flex-grow">{building.description}</p>

              <div className="mt-4 flex justify-center items-center border-2 rounded-lg border-gray-300 cursor-pointer hover:bg-gray-300"
              
              onClick={() => handleReadMore(building)}
              >
                <button
                  className="py-2 px-6 text-black transition duration-200"
                  
                >
                  Show More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBuilding && (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{selectedBuilding.name}</h3>
            <img
              src={selectedBuilding.imageGallery[0]}
              alt={selectedBuilding.name}
              className="w-full h-48 object-cover my-4"
            />
            <p className="py-4">{selectedBuilding.description}</p>
            <p className="py-4 text-gray-500 flex items-center gap-1">
              <strong><FaMapLocationDot/> </strong>
              {selectedBuilding.location.displayLocation}
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* Close the modal */}
                <button className="border-2 border-gray-300 px-4 py-1 rounded-lg text-black hover:bg-gray-300">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AboutBuilding;
