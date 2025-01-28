import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MakePayment = () => {
  const [agreements, setAgreements] = useState([]);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [adjustedRent, setAdjustedRent] = useState(0);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch agreements data
  useEffect(() => {
    const fetchAgreements = async () => {
      const { data } = await axiosSecure.get("/agreements");
      setAgreements(data);
      setSelectedAgreement(data[0]); // Default to the first agreement
      setAdjustedRent(data[0]?.rent || 0); // Default rent
    };
    fetchAgreements();
  }, [axiosSecure]);

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);

    // Adjust rent logic for the selected month if needed
    if (selectedAgreement) {
      setAdjustedRent(selectedAgreement.rent); // Reset rent for the selected month
    }
  };

  const handlePayment = () => {
    if (!selectedMonth) {
      Swal.fire("Error", "Please select a month to proceed", "error");
      return;
    }
    navigate("/payment", {
      state: { ...selectedAgreement, rent: adjustedRent, month: selectedMonth },
    });
  };

  if (!agreements.length) return <div>Loading...</div>;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Make Payment</h2>
      <div className="mb-4">
        <label className="block font-semibold">Select Agreement</label>
        <select
          value={selectedAgreement?._id}
          onChange={(e) => {
            const agreement = agreements.find((a) => a._id === e.target.value);
            setSelectedAgreement(agreement);
            setAdjustedRent(agreement.rent); // Reset rent for the newly selected agreement
          }}
          className="w-full px-4 py-2 border rounded-lg"
        >
          {agreements.map((agreement) => (
            <option key={agreement._id} value={agreement._id}>
              {`${agreement.blockName} Block - Apartment ${agreement.apartmentNo}`}
            </option>
          ))}
        </select>
      </div>
      {selectedAgreement && (
        <>
          <div className="mb-4">
            <label className="block font-semibold">Member Email</label>
            <input
              type="text"
              value={selectedAgreement.userEmail}
              readOnly
              className="w-full px-4 py-2 border rounded-lg text-red-600 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Floor</label>
            <input
              type="text"
              value={selectedAgreement.floorNo}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Block Name</label>
            <input
              type="text"
              value={selectedAgreement.blockName}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Apartment/Room No</label>
            <input
              type="text"
              value={selectedAgreement.apartmentNo}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Rent</label>
            <input
              type="text"
              value={`$${adjustedRent.toFixed(2)}`}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Month</label>
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="" disabled>
                Select a month
              </option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handlePayment}
            className="w-full py-2 mt-4 bg-green-500 text-white font-semibold rounded-lg"
          >
            Pay ${adjustedRent.toFixed(2)}
          </button>
        </>
      )}
    </div>
  );
};

export default MakePayment;
