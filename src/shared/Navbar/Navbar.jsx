import { button } from "motion/react-client";
import React, { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";
import { FaRegCircleUser } from "react-icons/fa6";
import useAdmin from "../../hooks/useAdmin";
import useMember from "../../hooks/useMember";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isMember] = useMember();
  const { role } = useRole();

  // console.log("isRole", role);

  const navMenu = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/apartment"}>Apartment</NavLink>
      </li>
      
      <li>
        <NavLink to={"/services"}>Services</NavLink>
      </li>
      
      <li>
        <NavLink to={"/about"}>About</NavLink>
      </li>
      <li>
        <NavLink to={"/contact"}>Contact</NavLink>
      </li>
    </>
  );

  return (
    // <div className="bg-base-300">
    <div className="bg-white">
      <div className="navbar  w-11/12 mx-auto ">
      {/* Navbar Start */}
      <div className="navbar-start">

       {/* aafasddas */}
        <div className="dropdown  z-50">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {navMenu}
      </ul>
    </div>
    {/* dsada */}

        <Link to={"/"} className="flex items-center gap-1 text-xl">
          <img className="h-10 rounded-full" src="/favicon.png" alt="" />{" "}
          <h1 className="text-2xl font-bold">PropertyPulse</h1>
        </Link>
      </div>
      {/* Navbar Center */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navMenu}</ul>
      </div>
      {/* Navbar End */}
      <div className="navbar-end">
        
        {/* User Dropdown */}
        <div className="dropdown dropdown-end flex items-center gap-3">
          {user ? (
            <div>
              <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      user
                        ? `${user.photoURL}`
                        : "https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
                    }
                  />
                </div>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-60 p-2 shadow space-y-3  z-40"
              >
                <li>
                  <a className="justify-between">
                    {user ? `${user.displayName}` : "username"}
                    <span className="badge text-orange-500"> {role} </span>
                  </a>
                </li>
                <li className="font-bold">
                  <Link
                    to={
                      role === "Manager"
                        ? "/dashboard/info" // Redirect to the admin profile if the role is "Manager"
                        : role === "Resident"
                        ? "/dashboard/info" // Redirect to the member profile if the role is "Tenant"
                        : role === "Tenant"
                        ? "/dashboard/info" // Redirect to the my profile if the role is "Resident"
                        : "/"
                    }
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  {user ? (
                    <button
                      onClick={logOut}
                      className="px-2 py-1 bg-red-600 hover:bg-rose-800 text-white font-semibold rounded-md"
                    >
                      Log Out
                    </button>
                  ) : (
                    <Link to="/signin">
                      <button className="px-2 py-1 bg-orange-600 hover:bg-green-700 text-white font-semibold rounded-md w-[275%]">
                        Sign In
                      </button>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">
              <div className="px-5 py-1 bg-orange-600 hover:bg-green-700 text-white font-semibold rounded-md ">
                Sign In
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;