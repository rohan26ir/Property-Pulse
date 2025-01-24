import React from "react";
import { Link } from "react-router-dom";

const DbNavbar = () => {
  return (
    <div>
      <div className="flex flex-col gap-2 bg-gray-500 bg-opacity-30 shadow-2xl p-5">
        <div>
          <h2 className="text-2xl font-bold">User DashBoard</h2>
          <ul>
            <Link to={"/dashboard/myprofile"}>
              <li>My Profile</li>
            </Link>
            <Link>
              <li>Announcements</li>
            </Link>
          </ul>

          <ul>
            <Link to={"/dashboard/agrement"}>
              <li>Agrement</li>
            </Link>
            <Link>
              <li></li>
            </Link>
            <Link>
              <li></li>
            </Link>
            <Link>
              <li></li>
            </Link>
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
