// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';


// const ManageCoupons = () => {
//   const [coupons, setCoupons] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newCoupon, setNewCoupon] = useState({
//     code: '',
//     discount: '',
//     description: '',
//   });

//   // Fetch all coupons
//   useEffect(() => {
//     const fetchCoupons = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/coupons');
//         setCoupons(response.data);
//       } catch (error) {
//         console.error('Error fetching coupons:', error);
//         toast.error('Failed to fetch coupons.');
//       }
//     };
//     fetchCoupons();
//   }, []);

//   // Handle input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewCoupon({ ...newCoupon, [name]: value });
//   };

//   // Add new coupon
//   const handleAddCoupon = async () => {
//     try {
//       const response = await axios.post('http://localhost:8000/coupons', newCoupon);
//       setCoupons([...coupons, response.data]);
//       setNewCoupon({ code: '', discount: '', description: '' });
//       setIsModalOpen(false);
//       toast.success('Coupon added successfully!');
//     } catch (error) {
//       console.error('Error adding coupon:', error);
//       toast.error('Failed to add coupon.');
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Manage Coupons</h1>
//       <div className="mb-4 flex justify-end">
//         <button
//           className="btn btn-primary"
//           onClick={() => setIsModalOpen(true)}
//         >
//           Add Coupon
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="table w-full">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Coupon Code</th>
//               <th>Discount (%)</th>
//               <th>Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {coupons.map((coupon, index) => (
//               <tr key={coupon._id}>
//                 <th>{index + 1}</th>
//                 <td>{coupon.code}</td>
//                 <td>{coupon.discount}</td>
//                 <td>{coupon.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && (
//         <div className="modal modal-open">
//           <div className="modal-box">
//             <h2 className="text-lg font-bold mb-4">Add New Coupon</h2>
//             <div className="form-control mb-4">
//               <label className="label">Coupon Code</label>
//               <input
//                 type="text"
//                 name="code"
//                 value={newCoupon.code}
//                 onChange={handleInputChange}
//                 className="input input-bordered"
//                 placeholder="Enter coupon code"
//               />
//             </div>
//             <div className="form-control mb-4">
//               <label className="label">Discount Percentage</label>
//               <input
//                 type="number"
//                 name="discount"
//                 value={newCoupon.discount}
//                 onChange={handleInputChange}
//                 className="input input-bordered"
//                 placeholder="Enter discount percentage"
//               />
//             </div>
//             <div className="form-control mb-4">
//               <label className="label">Description</label>
//               <textarea
//                 name="description"
//                 value={newCoupon.description}
//                 onChange={handleInputChange}
//                 className="textarea textarea-bordered"
//                 placeholder="Enter coupon description"
//               ></textarea>
//             </div>
//             <div className="modal-action">
//               <button
//                 className="btn btn-primary"
//                 onClick={handleAddCoupon}
//               >
//                 Submit
//               </button>
//               <button
//                 className="btn"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageCoupons;


import React from 'react';

const ManageCoupons = () => {
  return (
    <div>
      
    </div>
  );
};

export default ManageCoupons;