import React from "react";
import { NavLink } from "react-router-dom";
import useRole from "../hooks/useRole";

const DbNavbar = () => {
  const { role } = useRole(); // Get the current user's role

  const adminMenu = (
    <>
      <li>
        <NavLink to={"/dashboard/admin-profile"}>Admin Profile</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/MemberManage"}>Manage Members</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/make-announcement"}>Make Announcement</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/agreement-requests"}>Agreement Requests</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/manage-coupons"}>Manage Coupons</NavLink>
      </li>
    </>
  );

  const userMenu  = (
    <>
      <li>
        <NavLink to={"/dashboard/member-profile"}>My Profile</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/announcements"}>Announcements</NavLink>
      </li>
    </>
  );

  const memberMenu = (
    <>
      <li>
        <NavLink to={"/dashboard/my-profile"}>My Profile</NavLink>
      </li>
      {/* <li>
        <NavLink to={"/dashboard/agreement"}>Agreement</NavLink>
      </li> */}
      <li>
        <NavLink to={"/dashboard/make-payment"}>Make Payment</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/oayment-history"}>Payment History</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/announcements"}>Announcements</NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="flex flex-col gap-4 p-5">
        <div>
          <h2 className="text-2xl font-bold">{role} Dashboard</h2>
          <ul className="menu menu-vertical px-1 gap-1">
            {/* Render menu based on role */}
            {role === "Manager" && adminMenu}
            {role === "Tenant" && memberMenu}
            {role === "Resident" && userMenu}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DbNavbar;
