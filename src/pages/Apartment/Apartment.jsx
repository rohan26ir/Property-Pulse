import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/Provider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Apartment = () => {
  const [apartments, setApartments] = useState([]);
  const [searchRange, setSearchRange] = useState({ min: "", max: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalApartments, setTotalApartments] = useState(0);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const apartmentsPerPage = 6;

  // Fetch apartments from the server
  const fetchApartments = async () => {
    setLoading(true);
    const { min, max } = searchRange;
    const query = `?page=${currentPage}&limit=${apartmentsPerPage}${
      min && max ? `&min=${min}&max=${max}` : ""
    }`;

    try {
      const response = await axiosPublic.get(`/apartment${query}`);
      setApartments(response.data.apartments);
      setTotalApartments(response.data.total);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch apartments:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, [currentPage, searchRange]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const min = form.min.value;
    const max = form.max.value;
    setSearchRange({ min, max });
    setCurrentPage(1); // Reset to the first page after a search
  };

  // Handle agreement creation
  const handleAgreement = async (apartment) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "You need to log in first!",
        text: "Redirecting to login page...",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/signin");
      return;
    }

    // Agreement data to be stored
    const agreementData = {
      userId: user._id,
      userEmail: user.email,
      userName: user.displayName, // Store user name
      apartmentId: apartment._id,
      apartmentImage: apartment.image,
      floorNo: apartment.floorNo, // Store floor number
      blockName: apartment.blockName, // Store block name
      apartmentNo: apartment.apartmentNo, // Store apartment room number
      rent: apartment.rent, // Store rent
      status: "pending", // Initial status set as pending
      agreementRequestDate: new Date().toISOString(), // Store agreement request date
    };

    try {
      const response = await axiosPublic.post("/agreements", agreementData);
      Swal.fire({
        icon: "success",
        title: "Agreement submitted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      if (error.response?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Agreement Already Exists",
          text: error.response.data.message,
        });
      } else {
        console.error("Failed to submit agreement:", error);
        Swal.fire({
          icon: "error",
          title: "An error occurred!",
          text: error.message,
        });
      }
    }
  };

  // Handle page change for pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-100">
      <div className="w-11/12 mx-auto py-5">

<Helmet>
 <title>Apartment - PropertyPulse</title>
</Helmet>

<h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Apartment Listings</h2>

{/* Search functionality */}
<form
 onSubmit={handleSearch}
 className="flex flex-col md:flex-row items-center justify-center gap-2 mb-6"
>
 <input
   type="number"
   name="min"
   placeholder="Min Rent"
   className="input input-bordered"
 />
 <input
   type="number"
   name="max"
   placeholder="Max Rent"
   className="input input-bordered"
 />
 <button
   type="submit"
   className="btn bg-blue-600 text-white hover:bg-blue-700"
 >
   Search
 </button>
</form>

{/* Apartments display */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {loading ? (
   <p>Loading apartments...</p>
 ) : apartments.length === 0 ? (
   <p>No apartments found.</p>
 ) : (
   apartments.map((apartment) => (
     <div
       key={apartment._id}
       className="card shadow-lg border p-4 rounded-lg"
     >
       <img
         src={apartment.image}
         alt="Apartment"
         className="w-full h-40 object-cover rounded-md mb-4"
       />
       <h3 className="text-lg font-bold">
         Apartment No: {apartment.apartmentNo}
       </h3>
       <p>Floor No: {apartment.floorNo}</p>
       <p>Block Name: {apartment.blockName}</p>
       <p>Rent: ${apartment.rent}</p>
       <button
         onClick={() => handleAgreement(apartment)}
         className="btn border-2 border-gray-300 mt-4 "
       >
         Make Agreement
       </button>
     </div>
   ))
 )}
</div>

{/* Pagination */}
<div className="flex justify-center mt-6 space-x-2">
 {Array.from(
   { length: Math.ceil(totalApartments / apartmentsPerPage) },
   (_, index) => (
     <button
       key={index}
       onClick={() => handlePageChange(index + 1)}
       className={`btn ${
         currentPage === index + 1
           ? "bg-blue-600 text-white"
           : "bg-gray-300"
       }`}
     >
       {index + 1}
     </button>
   )
 )}
</div>
</div>
    </div>
  );
};

export default Apartment;
