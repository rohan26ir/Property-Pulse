import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion"; // Importing Framer Motion
import { AuthContext } from "../../Provider/Provider";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { createNewUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photoUrl.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const user = await createNewUser(email, password, name, photo);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Welcome, ${name}!`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleSignInGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      setUser(user);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Welcome, ${user.displayName || "User"}!`,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(location.state?.from || "/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <motion.div
      className="py-5 flex justify-center items-center bg-gradient-to-br from-gray-200 via-gray-100 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-md p-6 bg-white shadow-xl rounded-lg border"
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
          Sign Up for an Account
        </motion.h2>

        <form
          onSubmit={handleSignUp}
          className="card-body px-3 py-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="form-control">
            <label className="label">Your Name</label>
            <motion.input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered focus:outline-none"
              required
              whileFocus={{ scale: 1.03 }}
            />
          </div>
          <div className="form-control">
            <label className="label">Photo URL</label>
            <motion.input
              type="text"
              name="photoUrl"
              placeholder="Enter your photo URL"
              className="input input-bordered focus:outline-none"
              required
              whileFocus={{ scale: 1.03 }}
            />
          </div>
          <div className="form-control">
            <label className="label">Email</label>
            <motion.input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered focus:outline-none"
              required
              whileFocus={{ scale: 1.03 }}
            />
          </div>
          <div className="form-control relative">
            <label className="label">Password</label>
            <motion.input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered focus:outline-none"
              required
              whileFocus={{ scale: 1.03 }}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="h-8 w-8 cursor-pointer text-orange-500 absolute right-4 top-12 rounded-full flex justify-center items-center"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <motion.button
            type="submit"
            className="btn bg-blue-500 text-white w-full py-2 mt-4 rounded-lg hover:bg-blue-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
          <p className="text-sm text-center py-2">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign in here
            </Link>
          </p>
          <motion.button
            onClick={handleSignInGoogle}
            className="btn bg-gray-100 flex items-center justify-center w-full py-2 mt-2 rounded-lg hover:bg-gray-200 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Sign in with Google"
          >
            <FcGoogle className="mr-2" /> Log in with Google
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
