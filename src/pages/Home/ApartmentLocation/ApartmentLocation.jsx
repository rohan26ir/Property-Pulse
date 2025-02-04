import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { Card, CardContent } from "@/components/ui/card";

const ApartmentLocation = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/aboutBuilding.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) return <div className="text-center py-10">Loading...</div>;

  const { name, description, location } = data;
  const position = [40.7128, -74.006]; 

  return (
    <div className="container mx-auto p-6">
      <Card className="shadow-xl bg-base-100">
        <CardContent>
          <h2 className="text-2xl font-bold text-primary mb-4">{name}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold">Location</h3>
            <p>{location.address}, {location.city}, {location.state}, {location.postalCode}, {location.country}</p>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6">
        <MapContainer center={position} zoom={13} className="h-96 w-full rounded-lg shadow-lg">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {name} <br /> {location.address}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default ApartmentLocation;
