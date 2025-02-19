import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axiosSecure.get("/coupons");
        setCoupons(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, [axiosSecure]);

  // Define color pattern
  const colors = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];

  // Function to copy coupon code and show toast
  const copyToClipboard = (couponCode) => {
    navigator.clipboard.writeText(couponCode);
    toast.success(`Coupon Code "${couponCode}" copied to clipboard!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      <ToastContainer />
      <div className="flex flex-col items-center">
        <div className="text-black mb-8 text-center">
          <h2 className="text-3xl font-bold">Exclusive Building Coupons</h2>
          <p className="text-lg mt-2">
            Grab these amazing deals and save on your dream apartment!
          </p>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }, // 4 cards per view for large screens
          }}
          // pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper w-full mb-1"
        >
          {coupons.map((coupon, index) => (
            <SwiperSlide key={coupon._id}>
              <div
                className="rounded-lg shadow-lg overflow-hidden flex flex-col justify-between p-4 h-72 min-h-[250px] flex-grow"
                style={{
                  backgroundColor: colors[index % colors.length],
                }}
              >
                <div className="text-center flex-grow">
                  <h3 className="text-2xl font-bold text-black">
                    {coupon.category}
                  </h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-black">
                      {coupon.discount}
                    </span>
                    <span className="text-xl text-black"> OFF</span>
                  </div>
                  <p className="text-black mt-2 text-sm">
                    {coupon.description}
                  </p>
                </div>
                <div className="mt-6">
                  <div className="flex justify-center items-center">
                    <span className="text-white font-semibold bg-[#00000080] px-4 py-2 rounded-lg">
                      {coupon.couponCode}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(coupon.couponCode)}
                    className="w-full px-4 py-2 mt-4 border-2 text-black font-semibold rounded-lg hover:bg-gray-200"
                  >
                    Copy Coupon
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Coupons;
