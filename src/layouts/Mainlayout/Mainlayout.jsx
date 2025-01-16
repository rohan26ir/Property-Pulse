import React from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import Footer from '../../shared/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Mainlayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main className='w-11/12 mx-auto'>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Mainlayout;