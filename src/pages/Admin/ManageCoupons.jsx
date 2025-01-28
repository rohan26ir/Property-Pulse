import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaPlus, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Fetch coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axiosSecure.get('/coupons');
        setCoupons(response.data);
      } catch (error) {
        console.error('Error fetching coupons:', error);
        Swal.fire('Error', 'Failed to fetch coupons. Please try again later.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, [axiosSecure]);

  // Add a new coupon
  const handleAddCoupon = () => {
    Swal.fire({
      title: 'Add Coupon',
      html: `
        <input type="text" id="couponCode" class="swal2-input" placeholder="Coupon Code">
        <input type="number" id="discount" class="swal2-input" placeholder="Discount Percentage">
        <textarea id="description" class="swal2-textarea" placeholder="Coupon Description"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      preConfirm: () => {
        const couponCode = Swal.getPopup().querySelector('#couponCode').value;
        const discount = Swal.getPopup().querySelector('#discount').value;
        const description = Swal.getPopup().querySelector('#description').value;

        if (!couponCode || !discount || !description) {
          Swal.showValidationMessage('Please fill in all fields');
          return null;
        }

        return { couponCode, discount: parseFloat(discount), description, available: true };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post('/coupons', result.value)
          .then((res) => {
            setCoupons((prev) => [...prev, res.data]);
            Swal.fire('Success', 'Coupon added successfully!', 'success');
          })
          .catch((error) => {
            console.error('Error adding coupon:', error);
            Swal.fire('Error', 'Failed to add coupon. Please try again later.', 'error');
          });
      }
    });
  };

  // Toggle coupon availability
  const handleToggleAvailability = (couponId, currentStatus) => {
    axiosSecure.patch(`/coupons/${couponId}`)
      .then((response) => {
        setCoupons((prev) =>
          prev.map((coupon) =>
            coupon._id === couponId ? { ...coupon, available: !currentStatus } : coupon
          )
        );
        Swal.fire('Success', response.data.message, 'success');
      })
      .catch((error) => {
        console.error('Error toggling coupon availability:', error);
        Swal.fire('Error', 'Failed to update coupon status. Please try again.', 'error');
      });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-60">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Coupons</h2>
      <button
        onClick={handleAddCoupon}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 mb-4">
        <FaPlus /> Add Coupon
      </button>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Coupon Code</th>
              <th className="border border-gray-300 px-4 py-2">Discount (%)</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Availability</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon._id}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{coupon.couponCode}</td>
                <td className="border border-gray-300 px-4 py-2">{coupon.discount}</td>
                <td className="border border-gray-300 px-4 py-2">{coupon.description}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {coupon.available ? 'Available' : 'Unavailable'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleToggleAvailability(coupon._id, coupon.available)}
                    className={`px-4 py-2 rounded text-white ${
                      coupon.available ? 'bg-red-500' : 'bg-green-500'
                    } flex items-center gap-2`}
                  >
                    {coupon.available ? (
                      <>
                        <FaToggleOff /> Deactivate
                      </>
                    ) : (
                      <>
                        <FaToggleOn /> Activate
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupons;
