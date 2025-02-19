import React from "react";
import { Link, NavLink } from "react-router-dom";
import useRole from "../hooks/useRole";

const DbNavbar = () => {
  const { role } = useRole(); // Get the current user's role

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-black  font-bold px-3 py-1 rounded" // Active link style
      : "text-gray-700 px-3 py-1 rounded"; // Default link style

  const adminMenu = (
    <>
      <li>
        <NavLink to="/dashboard/admin-profile" className={linkStyle}>
          Admin Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/MemberManage" className={linkStyle}>
          Manage Members
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/make-announcement" className={linkStyle}>
          Make Announcement
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/agreement-requests" className={linkStyle}>
          Agreement Requests
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-coupons" className={linkStyle}>
          Manage Coupons
        </NavLink>
      </li>
    </>
  );

  const userMenu = (
    <>
      <li>
        <NavLink to="/dashboard/member-profile" className={linkStyle}>
          My Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/announcements" className={linkStyle}>
          Announcements
        </NavLink>
      </li>
    </>
  );

  const memberMenu = (
    <>
      <li>
        <NavLink to="/dashboard/my-profile" className={linkStyle}>
          My Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/make-payment" className={linkStyle}>
          Make Payment
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/payment-history" className={linkStyle}>
          Payment History
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/announcements" className={linkStyle}>
          Announcements
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="h-full py-5 px-2">

      <div className="flex justify-center mb-4 pb-2  border-b-2">
        <Link to={"/"} className="flex items-center gap-1 text-xl">
          <img className="h-8 rounded-full" src="/favicon.png" alt="" />{" "}
          <h1 className="text-xl font-bold">PropertyPulse</h1>
        </Link>
      </div>

      <h2 className="text-2xl font-bold">{role} Dashboard</h2>
      <ul className="menu menu-vertical px-1 gap-1">
        {role === "Manager" && adminMenu}
        {role === "Tenant" && memberMenu}
        {role === "Resident" && userMenu}
      </ul>
    </div>
  );
};

export default DbNavbar;
