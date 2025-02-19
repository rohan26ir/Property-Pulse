import React from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../shared/Footer/Footer';
import DbNavbar from '../../components/DbNavbar';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Uncomment if Navbar is needed */}
      {/* <header>
        <Navbar></Navbar>
      </header> */}

      <main className="flex flex-grow">
        {/* Sidebar (DbNavbar) */}
        <div className="w-[20%] min-h-screen bg-gray-500 bg-opacity-30 shadow-2xl fixed left-0 top-0 bottom-0 overflow-y-auto">
          <DbNavbar />
        </div>

        {/* Main Content */}
        <div className="w-[80%] ml-[20%] ">
          <Outlet />
        </div>
      </main>

      {/* Uncomment if Footer is needed */}
      {/* <footer>
        <Footer></Footer>
      </footer> */}
    </div>
  );
};


export default Dashboard;