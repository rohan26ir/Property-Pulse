import axios from "axios";
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/Provider";

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    const axiosSecure = useMemo(() => {
        const instance = axios.create({
            baseURL: 'http://localhost:8000',
        });

        // Request interceptor
        instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access-token');
                if (token) {
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error) // Handle request errors
        );

        // Response interceptor
        instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                if (status === 401 || status === 403) {
                    if (logOut) {
                        await logOut(); // Ensure logOut is defined
                    }
                    navigate('/signin');
                }
                return Promise.reject(error); // Forward the error
            }
        );

        return instance;
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
