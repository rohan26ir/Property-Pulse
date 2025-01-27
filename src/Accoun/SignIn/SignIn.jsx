import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../../Provider/Provider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { logIn, signInWithGoogle, setUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

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

  const handleSignInGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      setUser(user);
  
      // Save Google user to the database
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
  
      const response = await axiosPublic.post("/users", userInfo);
      
      // Show a success message regardless of whether the user is new or existing
      if (response.data.success || response.data.message === "user already exists") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Welcome, ${user.displayName || "User"}!`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state?.from || "/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
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
    }, 1800);
  };

  const handleError = (error) => {
    const friendlyMessage = error.message.includes("user-not-found")
      ? "No account found with this email."
      : error.message.includes("wrong-password")
      ? "Incorrect password. Try again."
      : "An unexpected error occurred.";
    setErrorMessage(friendlyMessage);
  };

  return (
    <motion.div
      className="min-h-screen flex justify-center items-center p-4 relative bg-gradient-to-br from-gray-200 via-gray-100 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative z-10 w-full max-w-md p-8 shadow-xl rounded-lg border bg-white"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.h2
          className="text-center text-2xl font-bold mx-auto p-2 border-b-[1px] border-gray-500 w-[80%] text-[#000000]"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Login to Your Account
        </motion.h2>

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
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
          )}

          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </motion.button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t Have An Account?{" "}
          <Link to="/signUp" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>

        <motion.button
          onClick={handleSignInGoogle}
          className="mt-4 flex items-center justify-center w-full py-2 rounded-lg shadow-lg bg-gray-100 hover:bg-gray-200 transition"
          aria-label="Sign in with Google"
        >
          <FcGoogle className="text-2xl mr-2" /> Log in with Google
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SignIn;
