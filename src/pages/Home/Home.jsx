import React from 'react';
import Hero from './Hero';
import AboutBuilding from './AboutBuilding/AboutBuilding';
import Coupons from './Coupons/Coupons';
import useAuth from '../../hooks/useAuth';
import { AuthContext } from '../../Provider/Provider';

const Home = () => {

  const { user } = useAuth(AuthContext);
  
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
          {
            user ? <Coupons></Coupons> : ''
          }
        </div>
      </main>
    </div>
  );
};

export default Home;