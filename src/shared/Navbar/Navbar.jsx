import { button } from "motion/react-client";
import React, { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";

const Navbar = () => {

  const {user} = useContext(AuthContext);

  console.log(user);


  const navMenu = (
    <>
      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/'}>Apartment</NavLink>
      </li>
      <li>
        <NavLink to={'/'}>Announcements</NavLink>
      </li>
      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/'}>Dashboard</NavLink>
      </li>
    </>
  );

  const [showDocs, setShowDocs] = useState(true);

  return (
    <div className="navbar bg-base-300">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="md:hidden">
          {/* Hamburger Menu */}
        <button
          onClick={() => setShowDocs(!showDocs)}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle Docs"
        >
          <GiHamburgerMenu />
        </button>
        {/* Display Toggle */}
        {showDocs && (
          <div className="absolute top-16 left-0 bg-base-300 pl-3 pr-8 py-4 rounded-r-lg">
            <ul className="gap-5">{navMenu}</ul>
          </div>
        )}
        </div>

        {user ? (<Link to={'/'} className="btn btn-ghost text-xl" href="#home">
          <img className="h-10 rounded-full" src="/favicon.png" alt="" /> PropertyPulse
        </Link>) : "User Not Login "}

        {
          user ? (<p>{user.displayName}</p>) : "not ok"
        }
      </div>
      {/* Navbar Center */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navMenu}</ul>
      </div>
      {/* Navbar End */}
      <div className="navbar-end">
        {/* Cart Dropdown */}
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </button>
          <div
            tabIndex={0}
            className="dropdown-content card card-compact bg-base-100 z-50 mt-3 w-52 shadow"
          >
            <div className="card-body ">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        {/* User Dropdown */}
        <div className="dropdown dropdown-end flex items-center gap-3">
          
          <div>
          <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src={user.photoURL}
              />
            </div>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow  z-40"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
          </div>

          <div>
            {!user &&  <Link to={'/signin'}><button>Sign in</button></Link>}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
