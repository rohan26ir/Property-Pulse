import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../../Provider/Provider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { createNewUser, signInWithGoogle } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.files[0];
    const email = form.email.value.trim();
    const password = form.password.value;

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    setPasswordError("");

    try {
      // Upload photo to ImgBB
      const imageData = new FormData();
      imageData.append("image", photo);
      const imageRes = await axiosPublic.post(imageHostingAPI, imageData);

      if (imageRes.data.success) {
        const photoURL = imageRes.data.data.display_url;

        // Create user with Firebase/Auth system
        await createNewUser(email, password, name, photoURL);

        // Save user to the database
        const userInfo = { name, email, photoURL };
        const response = await axiosPublic.post("/users", userInfo);

        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Account created successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          navigate("/");
        } else {
          throw new Error("Failed to save user to the database.");
        }
      } else {
        throw new Error("Failed to upload image.");
      }
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
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Google sign-in failed.",
      });
    }
  };

  return (
    <motion.div
      className=" py-5 flex justify-center items-center bg-gradient-to-br from-gray-200 via-gray-100 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Helmet>
        <title>SignUp - PropertyPulse</title>
      </Helmet>

      {/* <div className="w-[70%] mx-auto justify-center"> */}

      {/* <div className="flex-1">
          <div>
            <img src="" alt="" />
          </div>
          <h2 className="text-4xl font-bold">Create Your PropertyPulse Account</h2>
          <p className="text-lg">Sign up to manage your properties effortlessly. Join today and experience a seamless property management solution at your fingertips!</p>
        </div> */}

      <motion.div
        className="relative w-full max-w-md p-6 bg-white shadow-xl rounded-lg border"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <motion.h2
          className="text-center text-2xl font-bold mx-auto p-2 border-b-[1px] border-gray-500 w-[80%] text-[#000000]"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Sign Up for an Account
        </motion.h2>

        <form onSubmit={handleSignUp} className="card-body px-3 py-4">
          <div className="form-control">
            <label className="label">Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered focus:outline-none"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Photo</label>
            <input
              type="file"
              name="photo"
              className="file-input file-input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered focus:outline-none"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered focus:outline-none"
              required
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
            aria-label="Sign in with Google"
          >
            <FcGoogle className="mr-2" /> Log in with Google
          </motion.button>
        </form>
      </motion.div>
      {/* </div> */}
    </motion.div>
  );
};

export default SignUp;
