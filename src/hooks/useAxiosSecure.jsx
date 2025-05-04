import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/Provider';

const axiosSecure = axios.create({
  baseURL: 'https://property-pulse-server.vercel.app',
  withCredentials: true, // Include credentials (cookies) if needed
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  useEffect(() => {
    // Request interceptor to add JWT token
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        } else {
          console.warn('No access token found in localStorage');
        }
        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle 401/403 and other errors
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.error('Response interceptor error:', {
          message: error.message,
          response: error.response,
          config: error.config,
        });

        // Handle cases where response is undefined (e.g., network error)
        if (!error.response) {
          console.error('No response received. Possible network or server issue.');
          return Promise.reject(new Error('Network error or server unreachable'));
        }

        const status = error.response.status;
        if (status === 401 || status === 403) {
          console.log(`Received ${status} status. Logging out and redirecting to /signin.`);
          await logOut();
          navigate('/signin');
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on component unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;