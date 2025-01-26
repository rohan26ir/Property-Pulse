import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaUserAlt, FaUserShield } from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useRole from "../../../../hooks/useRole";

const MemberManage = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useRole(); // Get the current user's role
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`${user.name} is now a Building Manager!`, {
          position: "top-right",
        });
      }
    });
  };

  const handleMakeMember = (user) => {
    axiosSecure.patch(`/users/member/${user._id}`).then((res) => {
      if (res.data.success) {
        refetch();
        toast.success(`${user.name}'s role has been changed to Resident.`, {
          position: "top-right",
        });
      }
    });
  };

  // Count users based on roles
  const adminCount = users.filter((user) => user.role === "admin").length;
  const memberCount = users.filter((user) => user.role === "member").length;
  const noRoleCount = users.filter((user) => !user.role).length;

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold">Building Management Users</h2>
        <p className="mt-2 text-gray-600">
          Total Residents: <strong>{memberCount}</strong> | Managers:{" "}
          <strong>{adminCount}</strong> | Tenant:{" "}
          <strong>{noRoleCount}</strong>
        </p>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <div className="w-24 h-24 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
              <img
                src={user.photoURL || "https://via.placeholder.com/150"}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p>{user.email}</p>
            </div>

            <div className="flex flex-col space-y-2">
              {user.role === "admin" ? (
                <span className="bg-green-500 text-white py-1 px-3 rounded-full text-sm text-center flex items-center justify-center">
                  <FaUserShield className="mr-2" />
                  Building Manager
                </span>
              ) : (
                <button
                  onClick={() => handleMakeAdmin(user)}
                  className="bg-orange-500 text-white rounded-full py-1 px-3 text-sm flex items-center justify-center"
                >
                  <MdPersonAddAlt1 className="mr-2" />
                  Promote to Manager
                </button>
              )}

              {user.role === "member" ? (
                <span className="bg-blue-400 text-white py-1 px-3 rounded-full text-sm text-center flex items-center justify-center">
                  <FaUserAlt className="mr-2" />
                  Resident
                </span>
              ) : (
                <button
                  onClick={() => handleMakeMember(user)}
                  className="bg-red-500 text-white rounded-full py-1 px-3 text-sm flex items-center justify-center"
                >
                  <FaUsers className="mr-2" />
                  Change to Resident
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MemberManage;
