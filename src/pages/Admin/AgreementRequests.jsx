import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AgreementRequests = () => {
  const [agreements, setAgreements] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Fetch agreement requests
    const fetchAgreements = async () => {
      try {
        const response = await axiosSecure.get("/agreements");
        // Filter out agreements with status "accepted"
        const pendingAgreements = response.data.filter(
          (agreement) => agreement.status !== "accepted"
        );
        setAgreements(pendingAgreements);
      } catch (error) {
        console.error("Error fetching agreements:", error);
      }
    };
    fetchAgreements();
  }, [axiosSecure]);

  // Handle Accept Agreement & Update User Role
  const handleAccept = async (id) => {
    try {
      const response = await axiosSecure.patch(`/agreements/status/${id}`, { status: "accepted" });

      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });

      setAgreements((prev) => prev.filter((agreement) => agreement._id !== id));
    } catch (error) {
      console.error("Error accepting agreement:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to accept agreement",
        text: error.message,
      });
    }
  };

  // Handle Reject Agreement
  const handleReject = async (id) => {
    try {
      await axiosSecure.delete(`/agreements/${id}`);
      setAgreements((prev) => prev.filter((agreement) => agreement._id !== id));

      Swal.fire({
        icon: "info",
        title: "Agreement request rejected.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error rejecting agreement:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Agreement Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agreements.map((agreement) => (
          <div key={agreement._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="font-bold text-lg">{agreement.userName}</h3>
              <p className="text-sm text-gray-500">{agreement.userEmail}</p>
              <div className="mt-2">
                <p>
                  <span className="font-medium">Floor:</span> {agreement.floorNo}
                </p>
                <p>
                  <span className="font-medium">Block:</span> {agreement.blockName}
                </p>
                <p>
                  <span className="font-medium">Room:</span> {agreement.roomNo}
                </p>
                <p>
                  <span className="font-medium">Rent:</span> ${agreement.rent}
                </p>
                <p>
                  <span className="font-medium">Request Date:</span>{" "}
                  {new Date(agreement.agreementRequestDate).toLocaleDateString()}
                </p>
              </div>
              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => handleAccept(agreement._id)}
                  className="btn btn-primary btn-sm"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(agreement._id)}
                  className="btn btn-error btn-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {agreements.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No agreement requests available.</p>
      )}
    </div>
  );
};

export default AgreementRequests;
