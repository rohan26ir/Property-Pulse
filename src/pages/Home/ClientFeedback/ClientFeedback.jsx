import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const clientReviews = [
  {
    id: 1,
    name: "John Doe",
    image: "https://i.pravatar.cc/150?img=1",
    feedback: "Amazing service! Highly recommended for anyone looking for quality.",
  },
  {
    id: 2,
    name: "Sarah Smith",
    image: "https://i.pravatar.cc/150?img=2",
    feedback: "Professional and reliable. I had a great experience!",
  },
  {
    id: 3,
    name: "Michael Brown",
    image: "https://i.pravatar.cc/150?img=3",
    feedback: "Fast and efficient service. I’ll be coming back for sure.",
  },
  {
    id: 4,
    name: "Emily Davis",
    image: "https://i.pravatar.cc/150?img=4",
    feedback: "Great customer support and a fantastic experience overall.",
  },
  {
    id: 5,
    name: "James Wilson",
    image: "https://i.pravatar.cc/150?img=5",
    feedback: "The team is very professional. My expectations were exceeded!",
  },
  {
    id: 6,
    name: "Olivia Martinez",
    image: "https://i.pravatar.cc/150?img=6",
    feedback: "Loved every bit of the process. Highly recommended!",
  },
];

const ClientFeedback = () => {
  return (
    <div className="pt-5 w-11/12 mx-auto">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Client Feedback
      </h2>


      <div className=" bg-gray-100 rounded-lg shadow-md pb-6 px-4">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1} 
        breakpoints={{
          640: { slidesPerView: 1 }, // Mobile
          768: { slidesPerView: 2 }, // Tablet
          1024: { slidesPerView: 3 }, // Desktop
        }}
        loop={true}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="p-4"
      >
        {clientReviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col justify-center h-60">
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-blue-600"
              />
              <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
              <p className="text-gray-600 italic mt-2">"{review.feedback}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  );
};

export default ClientFeedback;
