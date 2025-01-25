import React from "react";
import { Link, NavLink } from "react-router-dom";

const DbNavbar = () => {
  const userMenu = (
    <>
      <li>
        <NavLink to={"/dashboard/all-users"}>AllUsers</NavLink>
      </li>
    </>
  );
  const memberMenu = (
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
      <div className="flex flex-col gap-2  p-5">
        <div>
          <h2 className="text-2xl font-bold">User DashBoard</h2>

          <ul className="menu menu-verticle px-1 gap-1">{userMenu}</ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Member DashBoard</h2>

          <ul className="menu menu-verticle px-1 gap-1">
            {memberMenu}
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
