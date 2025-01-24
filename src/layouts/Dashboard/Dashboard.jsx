import React from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../shared/Footer/Footer';
import DbNavbar from '../../components/DbNavbar';

const Dashboard = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <div className='flex gap-2'>
          <div className='w-[25%] '><DbNavbar></DbNavbar></div>
          <div className='m-auto'><Outlet></Outlet></div>
        </div>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Dashboard;