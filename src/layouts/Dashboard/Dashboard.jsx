import React from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../shared/Footer/Footer';
import DbNavbar from '../../components/DbNavbar';

const Dashboard = () => {
  return (
    <div >
      <header>
        <Navbar></Navbar>
      </header>
      <main className='min-h-80'>

        <div className='flex gap-2'>

          <div className='w-[25%] min-h-80 bg-gray-500 bg-opacity-30 shadow-2xl'>
            <DbNavbar></DbNavbar></div>

          <div className='w-[75%] m-auto py-5'>
            <Outlet></Outlet>
          </div>
        
        </div>

      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Dashboard;