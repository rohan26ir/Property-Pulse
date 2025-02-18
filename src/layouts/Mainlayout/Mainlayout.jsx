import React from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import Footer from '../../shared/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Mainlayout = () => {
  return (
    <div>
      <header className='z-30'>

       <div className=''>
       <Navbar></Navbar>
       </div>

      </header>
      <main className=''>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Mainlayout;