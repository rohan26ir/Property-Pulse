import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const AdminProfile = () => {
  const { user } = useAuth();
  const { displayName, email, photoURL, metadata, phoneNumber, emailVerified } = user;
  const axiosSecure = useAxiosSecure();

  const [data, setData] = useState({
    totalRooms: 0,
    availablePercentage: 0,
    unavailablePercentage: 0,
    usersWithoutRole: 0,
    totalMembers: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(displayName || "");
  const [phone, setPhone] = useState(phoneNumber || "");
  const [photo, setPhoto] = useState(photoURL || "");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setPhone(userDoc.data().phone || "");
        setLocation(userDoc.data().location || "");
      }
    };
    fetchUserData();
  }, [user.uid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apartmentsResponse = await axiosSecure.get("/apartment");
        const totalRooms = apartmentsResponse.data.total || 0;

        const availableRooms = await axiosSecure.get("/agreementsAccep");
        const availableCount = availableRooms.data.apartments.length;
        const unavailableCount = totalRooms - availableCount;

        const availablePercentage = ((availableCount / totalRooms) * 100).toFixed(2);
        const unavailablePercentage = ((unavailableCount / totalRooms) * 100).toFixed(2);

        const usersResponse = await axiosSecure.get("/users");
        const users = usersResponse.data;

        const usersWithoutRole = users.filter(user => !user.role).length;
        const totalMembers = users.filter(user => user.role === "member").length;

        setData({
          totalRooms,
          availablePercentage,
          unavailablePercentage,
          usersWithoutRole,
          totalMembers,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  const handleUpdate = async () => {
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      await updateDoc(doc(db, "users", user.uid), {
        phone,
        location,
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="bg-gray-100 px-10">
      <div className="flex flex-col items-center gap-10 pb-8">
        <div className="flex items-center justify-center w-full pt-10">
          <motion.div
            className="py-2 px-6 flex flex-row justify-center gap-10 items-center bg-white shadow-lg rounded-lg w-full max-w-4xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
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

            <motion.div
              className="flex flex-col space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold">{displayName || "User Name"}</h2>
              <p>Email: {email}</p>
              <p>Phone: {phoneNumber || "N/A"}</p>
              <p>
                Email Verified:{" "}
                <span className={emailVerified ? "text-green-500" : "text-red-500"}>
                  {emailVerified ? "Yes" : "No"}
                </span>
              </p>
              <p>Location: {location || "N/A"}</p>
              <p>Created At: {metadata?.creationTime ? new Date(metadata.creationTime).toLocaleString() : "N/A"}</p>
              <p>Last Sign-In: {metadata?.lastSignInTime ? new Date(metadata.lastSignInTime).toLocaleString() : "N/A"}</p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 px-4 py-2 border-2 rounded-lg hover:bg-gray-300 transition"
              >
                Update Profile
              </button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-6 border-b-2 border-gray-600 pb-2">Admin Dashboard Information</h3>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Total Rooms", value: data.totalRooms, color: "blue-400" },
              { label: "Available Rooms (%)", value: `${data.availablePercentage}%`, color: "green-400" },
              { label: "Unavailable Rooms (%)", value: `${data.unavailablePercentage}%`, color: "red-400" },
              { label: "Users Without Role", value: data.usersWithoutRole, color: "yellow-400" },
              { label: "Total Members", value: data.totalMembers, color: "purple-400", span: 2 },
            ].map(({ label, value, color, span = 1 }, index) => (
              <div key={index} className={`bg-gray-900 rounded-lg p-2 shadow-md col-span-${span}`}>
                <h4 className={`text-xl font-semibold text-${color}`}>{label}</h4>
                <p className="text-3xl font-bold mt-2 text-white">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full p-2 border rounded mb-3" />
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" className="w-full p-2 border rounded mb-3" />
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" className="w-full p-2 border rounded mb-3" />
            <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
