import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllUsers = () => {
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
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "The user has been deleted.",
                            icon: "success",
                        });
                    }
                });
            }
        });
    };

    const adminCount = users.filter((user) => user.role === "admin").length;
    const memberCount = users.length - adminCount;

    return (
        <div className="p-5 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h2 className="text-3xl font-semibold">Building Management Users</h2>
                <p className="mt-2 text-gray-600">
                    Total Users: <strong>{users.length}</strong> | Admins:{" "}
                    <strong>{adminCount}</strong> | Members: <strong>{memberCount}</strong>
                </p>
            </div>

            <div className="space-y-4">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="w-full bg-black bg-opacity-70 shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 relative"
                    >
                        {/* Dark Overlay on Background Image */}
                        <div
                            className="absolute inset-0 bg-black opacity-10 rounded-lg"
                            style={{
                                backgroundImage: `url('https://i.ibb.co/yWdzPVC/user-bg.webp')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        ></div>

                        {/* User Image */}
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden relative z-10">
                            <img
                                src={user.photoURL || "https://via.placeholder.com/150"}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-white relative z-10">
                            <h3 className="text-xl font-semibold">{user.name}</h3>
                            <p>{user.email}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4 relative z-10">
                            {/* Admin/Make Admin Button */}
                            {user.role === "admin" ? (
                                <span className="bg-green-500 text-white py-1 px-3 rounded-full text-sm">
                                    Building Manager
                                </span>
                            ) : (
                                <button
                                    onClick={() => handleMakeAdmin(user)}
                                    className=" bg-orange-500 text-white border border-orange-500 rounded-full py-1 px-3 text-sm transition duration-200"
                                >
                                    <FaUsers className="inline-block mr-2" />
                                    Promote to Manager
                                </button>
                            )}

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDeleteUser(user)}
                                className=" bg-red-500 text-white border border-red-500 rounded-full py-1 px-3 text-sm transition duration-200"
                            >
                                <FaTrashAlt className="inline-block mr-2" />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;
