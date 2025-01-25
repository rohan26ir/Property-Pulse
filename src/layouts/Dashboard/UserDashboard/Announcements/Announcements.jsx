import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // Fetch announcements from the server
  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await axiosPublic.get("/announcements");
      setAnnouncements(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load announcements. Please try again later.",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="w-11/12 mx-auto my-5">
      <h2 className="text-2xl font-bold text-center mb-4">Announcements</h2>

      {loading ? (
        <p className="text-center">Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <p className="text-center">No announcements available.</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="card shadow-lg border p-4 rounded-lg"
            >
              <h3 className="text-lg font-bold">{announcement.title}</h3>
              <p className="text-gray-600 mt-2">{announcement.description}</p>
              <p className="text-gray-400 text-sm mt-2">
                Date: {new Date(announcement.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
