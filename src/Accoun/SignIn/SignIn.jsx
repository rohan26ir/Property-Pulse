import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Provider/Provider";
import { Helmet } from "react-helmet-async";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { logIn, signInWithGoogle, setUser, darkMode } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        handleNavigation(
          result.user,
          `Welcome ${result.user.displayName || "User"}!`
        );
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleSignInGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        handleNavigation(
          result.user,
          `Welcome ${result.user.displayName || "User"}!`
        );
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleNavigation = (user, message) => {
    setUser(user);
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: `${message}`,
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      navigate(location?.state || "/");
    }, 1600);
  };

  const handleError = (error) => {
    const friendlyMessage = error.message.includes("user-not-found")
      ? "No account found with this email."
      : error.message.includes("wrong-password")
      ? "Incorrect password. Try again."
      : "An unexpected error occurred.";
    setErrorMessage(friendlyMessage);
  };

  const handleForgetPasswordClick = () => {
    const email = emailRef.current.value || "";
    navigate("/forget-password", { state: { email } });
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 relative">
      <div className="relative z-10 w-full max-w-md p-8 shadow-xl rounded-lg border">
        <h2 className="text-center text-2xl font-extrabold mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogIn} className="space-y-6">
          <div className="form-control">
            <label>Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="form-control relative">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 cursor-pointer"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
          )}
          
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don’t Have An Account?{" "}
          <Link to={"/signUp"} className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
        <button
          onClick={handleSignInGoogle}
          className="mt-4 flex items-center justify-center w-full py-2 rounded-lg shadow-lg hover:bg-gray-100"
        >
          <FcGoogle className="text-2xl mr-2" /> Log in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
