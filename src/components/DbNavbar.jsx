import React from "react";
import { NavLink } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useMember from "../hooks/useMember";

const DbNavbar = () => {
  const [isAdmin] = useAdmin(); 
  const [isMember] = useMember();

  const userMenu = (
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

  const memberMenu = (
    <>
      <li>
        <NavLink to={"/dashboard/my-profile"}>My Profile</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/agreement"}>Agreement</NavLink>
      </li>
      <li>
        <NavLink to={"/make-payment"}>Make Payment</NavLink>
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
      <div className="flex flex-col gap-4 p-5">
        <div>
          <h2 className="text-2xl font-bold">Dashboard  {isAdmin && "Admin"}{isMember && "Member"}</h2>
          <ul className="menu menu-vertical px-1 gap-1">
            {/* Conditional render the menu based on isAdmin */}
            {isAdmin ? userMenu : memberMenu}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DbNavbar;