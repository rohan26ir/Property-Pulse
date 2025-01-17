import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img1 from '../../assets/property/home1.webp';
import img2 from '../../assets/property/home2.webp';
import img3 from '../../assets/property/home3.webp';
import img4 from '../../assets/property/home4.webp';
import img5 from '../../assets/property/home5.webp';
import img6 from '../../assets/property/home6.webp';
import img7 from '../../assets/property/home7.webp';
import img8 from '../../assets/property/home8.webp';
import img9 from '../../assets/property/home9.webp';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Hero = () => {
  const sliderData = [
    {
      title: "Modern Living Spaces",
      description: "Experience the luxury and comfort of modern architecture in every corner.",
      img: img1,
    },
    {
      title: "Smart Building Features",
      description: "Stay ahead with innovative smart building technologies.",
      img: img2,
    },
    {
      title: "Eco-Friendly Design",
      description: "Sustainability at its core with eco-conscious construction.",
      img: img3,
    },
    {
      title: "24/7 Security",
      description: "Ensuring safety and peace of mind for residents and visitors.",
      img: img4,
    },
    {
      title: "Premium Amenities",
      description: "Enjoy top-notch amenities tailored for a modern lifestyle.",
      img: img5,
    },
    {
      title: "Flexible Spaces",
      description: "Adaptable interiors to suit all your needs and preferences.",
      img: img6,
    },
    {
      title: "Prime Location",
      description: "Located in the heart of the city for maximum convenience.",
      img: img7,
    },
    {
      title: "Efficient Energy Usage",
      description: "Cutting-edge systems designed to save energy and reduce costs.",
      img: img8,
    },
    {
      title: "Community-Centered Living",
      description: "Creating vibrant communities with shared spaces and activities.",
      img: img9,
    },
  ];

  return (
    <div className=''>
      <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {sliderData.map((data, index) => (
            <SwiperSlide key={index}>
              <div className="relative text-center">
                <img
                  src={data.img}
                  alt={data.title}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-6 py-4 rounded-md">
                  <h3 className="text-lg font-bold">{data.title}</h3>
                  <p className="text-sm">{data.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;