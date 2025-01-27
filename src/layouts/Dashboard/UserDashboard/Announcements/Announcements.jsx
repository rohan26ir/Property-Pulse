import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';

const Announcements = () => {
  const axiosPublic = useAxiosPublic();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axiosPublic.get('/announcements'); // Using axiosPublic hook
        setAnnouncements(response.data);
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Failed to load announcements.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [axiosPublic]);

  if (loading)
    return (
      <motion.div
        className="flex items-center justify-center h-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>Loading announcements...</p>
      </motion.div>
    );

  if (error)
    return (
      <motion.div
        className="flex items-center justify-center h-40 text-red-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>{error}</p>
      </motion.div>
    );

  return (
    <motion.div
      className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-2xl font-bold text-center mb-6">Announcements</h1>
      {announcements.length === 0 ? (
        <motion.p
          className="text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No announcements to display.
        </motion.p>
      ) : (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {announcements.map((announcement, index) => (
            <motion.li
              key={announcement._id}
              className="flex items-start space-x-4 py-4 border-b last:border-b-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-lg font-semibold text-gray-700">
                {index + 1}.
              </span>
              <div>
                <h2 className="text-lg font-bold">{announcement.title}</h2>
                <p className="text-gray-600">{announcement.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default Announcements;
