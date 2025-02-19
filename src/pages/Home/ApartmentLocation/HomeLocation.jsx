import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";



const HomeLocation = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/aboutBuilding.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Define a custom icon
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41], // Default size
    iconAnchor: [12, 41], // Point of the icon which corresponds to marker's location
    popupAnchor: [1, -34], // Position where popup opens
  });

  return (
    <div>
      <div className="py-6 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold">Explore Our Property Locations</h2>
        <p className="my-2">
          View our properties on the map and explore their surroundings.
        </p>
      </div>

      <div className="pb-5">
        <div className="flex justify-center items-center w-full h-72 md:h-96 border-4">
          {data.length > 0 && (
            <MapContainer center={[23.8103, 90.4125]} zoom={6} className="h-full w-full ">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {data.map((property) => (
                <Marker 
                  key={property._id} 
                  position={[property.location.reactLeafletLocation.lat, property.location.reactLeafletLocation.lng]}
                  icon={customIcon} // Use the custom icon
                >
                  <Popup>
                    <strong>{property.name}</strong>
                    <br />
                    {property.location.displayLocation}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeLocation;
