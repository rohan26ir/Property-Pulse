import React from "react";

const Coupons = () => {
  const coupons = [
    {
      id: 1,
      category: "Luxury Apartments",
      discount: "15% Off",
      image:
        "https://dreamsestate.dreamstechnologies.com/html/assets/img/icons/property-icon-3.svg",
      backgroundColor: "#FFD700",
    },
    {
      id: 2,
      category: "Family Homes",
      discount: "10% Off",
      image:
        "https://dreamsestate.dreamstechnologies.com/html/assets/img/icons/property-icon-1.svg",
      backgroundColor: "#FF4500",
    },
    {
      id: 3,
      category: "Studio Apartments",
      discount: "20% Off",
      image:
        "https://dreamsestate.dreamstechnologies.com/html/assets/img/icons/property-icon-4.svg",
      backgroundColor: "#32CD32",
    },
    {
      id: 4,
      category: "Penthouse Suites",
      discount: "25% Off",
      image:
        "https://dreamsestate.dreamstechnologies.com/html/assets/img/icons/property-icon-2.svg",
      backgroundColor: "#1E90FF",
    },
  ];

  return (
    <div className="bg-[#1E1D85] p-10">
      <div className="flex justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="text-white mb-8 w-[85%]">
          <h2 className="text-3xl font-bold">Exclusive Building Coupons</h2>
          <p className="text-lg mt-2">
            Grab these amazing deals and save on your dream apartment!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="rounded-lg shadow-lg overflow-hidden flex flex-col justify-between"
            style={{ backgroundColor: coupon.backgroundColor }}
          >
            <div className="p-4">
              <div className="flex justify-center items-center">
                <img src={coupon.image} alt="" className="h-16 w-16" />
              </div>
              <h3 className="text-xl font-bold text-white mt-4">
                {coupon.category}
              </h3>
              <div className="mt-2">
                <span className="text-2xl font-bold text-white">
                  {coupon.discount}
                </span>
              </div>
            </div>
            <div className="p-4">
              <button className="w-full px-4 py-2 bg-white text-[#1E1D85] font-semibold rounded-lg hover:bg-gray-200">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Coupons;
