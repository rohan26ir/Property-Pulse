import React from 'react';
import Hero from './Hero';
import AboutBuilding from './AboutBuilding/AboutBuilding';
import Coupons from './Coupons/Coupons';

const Home = () => {
  return (
    <div className=''>
      <header>
        <Hero></Hero>
      </header>

      <main className='bg-gray-100'>
        <div className='w-11/12 mx-auto py-5'>
         <AboutBuilding></AboutBuilding>
        </div>
        <div>
          <Coupons></Coupons>
        </div>
      </main>
    </div>
  );
};

export default Home;