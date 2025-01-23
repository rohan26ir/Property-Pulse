import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/Provider";

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { status } = error.response || {};
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/signin");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;