import React from 'react';
import { FaHandHoldingMedical, FaPersonSwimming } from 'react-icons/fa6';
import { LuBedSingle } from "react-icons/lu";

import { TbBuildingStadium, TbCar } from "react-icons/tb";
import { IoLibraryOutline } from "react-icons/io5";
import { GiSecurityGate } from 'react-icons/gi';
import { MdOutlineSmartButton } from 'react-icons/md';

const WhatWeOffer = () => {

  const datas = [
    {id: 1, title: "Parking Space", icon: <TbCar />},
    {id: 2, title: "Swimming Pool", icon: <FaPersonSwimming />},
    {id: 3, title: "Medical Center", icon: <FaHandHoldingMedical />},
    {id: 4, title: "King Size Beds", icon: <LuBedSingle />},
    {id: 5, title: "Kid’s Playland", icon: <TbBuildingStadium />},
    {id: 6, title: "Library Area", icon: <IoLibraryOutline />},
    {id: 7, title: "Smart Homes", icon: <MdOutlineSmartButton />},
    {id: 8, title: "Private Security", icon: <GiSecurityGate />}
  ]

  return (
    <div>
      <div className='w-11/12 mx-auto'>

        <div className='flex flex-col justify-center text-center mb-5 pt-3'>

        <h3 className='px-3 py-1 w-fit mx-auto rounded-3xl bg-gray-300'>WhatWeOffer</h3>
        <h2 className='text-3xl font-bold'>Facilities & Features</h2>

        </div>


        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 pb-10'> 

          {
            datas.map(data => <>
            
            <div key={data.id}  className='bg-white h-60 shadow-lg p-4 rounded-lg flex flex-col justify-center items-center'>
              <div className='text-4xl flex justify-center items-center text-gray-900 my-4'>
                <p className='h-20 w-20 bg-gray-600 text-white flex justify-center items-center rounded-full '>{data.icon}</p>
              </div>
              <h2 className='text-center'>{data.title}</h2>
            </div>
            </>)
          }


        </div>
      
      </div>
    </div>
  );
};

export default WhatWeOffer;