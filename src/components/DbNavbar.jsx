import React from "react";
import { Link, NavLink } from "react-router-dom";

const DbNavbar = () => {
  const userMenu = (
      <>
        <li>
          <NavLink to={"/dashboard/my-profile"}>My Profile</NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/agrement"}>Agrement</NavLink>
        </li>
        <li>
          <NavLink to={"/make-payment"}>Make payment</NavLink>
        </li>
        <li>
          <NavLink to={"/payment-history"}>Payment History</NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/announcements"}>Announcements</NavLink>
        </li>
      </>
    );
  return (
    <div>
      <div className="flex flex-col gap-2 bg-gray-500 bg-opacity-30 shadow-2xl p-5">
        <div>
          <h2 className="text-2xl font-bold">User DashBoard</h2>

          <ul className="menu menu-verticle px-1 gap-1">
            {userMenu}
          </ul>

          
        </div>
        <div></div>
        <div>
          <h2 className="text-2xl font-bold">Pages</h2>

          <ul className="px-2 my-2 font-semibold">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <li>Apartment</li>
            <li>Notice</li>
          </ul>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default DbNavbar;
