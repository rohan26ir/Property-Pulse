import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MemberManage = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  // Handle role removal
  const handleRoleRemove = async (user) => {
    try {
      const res = await axiosSecure.patch(`/users/remove-role/${user._id}`);

      if (res.data.success) {
        // Update the local state with the returned data
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === user._id ? { ...u, role: null } : u
          )
        );

        toast.success(`${user.name}'s role has been removed.`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to remove role. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Error removing role:", error);
    }
  };

  // Calculate totals
  const adminCount = users.filter((user) => user.role === "admin").length;
  const memberCount = users.filter((user) => user.role === "member").length;
  const userCount = users.length - adminCount - memberCount;

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold">Manage Residents</h2>
        <p className="mt-2 text-gray-600">
          Below is the list of all users. You can change their roles as needed.
        </p>
        <div className="mt-4">
          <span className="bg-green-200 text-green-800 px-4 py-1 rounded-full text-sm mr-4">
            Admins: {adminCount}
          </span>
          <span className="bg-blue-200 text-blue-800 px-4 py-1 rounded-full text-sm mr-4">
            Residents: {memberCount}
          </span>
          <span className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full text-sm">
            Users: {userCount}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-gray-700">Name</th>
              <th className="px-4 py-2 text-gray-700">Email</th>
              <th className="px-4 py-2 text-gray-700">Role</th>
              <th className="px-4 py-2 text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  {user.role ? (
                    <span className="capitalize">{user.role}</span>
                  ) : (
                    <span className="capitalize">User</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {user.role && (
                    <button
                      onClick={() => handleRoleRemove(user)}
                      className="bg-red-500 text-white py-1 px-3 rounded-full text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberManage;
