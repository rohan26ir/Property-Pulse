import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MemberManage = () => {
  const axiosSecure = useAxiosSecure();
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
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now a Building Manager!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will change the user's role to member.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change role!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.message === "User role updated to member successfully") {
            refetch();
            Swal.fire({
              title: "Updated!",
              text: `${user.name}'s role has been changed to member.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Count users based on roles
  const adminCount = users.filter((user) => user.role === "admin").length;
  const residentCount = users.filter(
    (user) => user.role === "member" || !user.role
  ).length;

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold">Building Management Users</h2>
        <p className="mt-2 text-gray-600">
          Total Residents: <strong>{residentCount}</strong> | Managers:{" "}
          <strong>{adminCount}</strong>
        </p>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
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

            <div className="flex space-x-4">
              {user.role === "admin" ? (
                <span className="bg-green-500 text-white py-1 px-3 rounded-full text-sm">
                  Building Manager
                </span>
              ) : (
                <button
                  onClick={() => handleMakeAdmin(user)}
                  className="bg-orange-500 text-white rounded-full py-1 px-3 text-sm"
                >
                  <FaUsers className="inline-block mr-2" />
                  Promote to Manager
                </button>
              )}

              <button
                onClick={() => handleDeleteUser(user)}
                className="bg-red-500 text-white rounded-full py-1 px-3 text-sm"
              >
                <FaTrashAlt className="inline-block mr-2" />
                Change to Member
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberManage;
