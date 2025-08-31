import axios from "axios";
import {API_URL} from "./apiPaths.js";

// Create axios instance with base URL
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Add token interceptor to automatically attach token to requests
axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add response interceptor to handle token expiration
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        if (error.response.status === 401) {
            // If token is expired, clear token and redirect to login page
            localStorage.removeItem("token");
            window.location.href = "/login";
        }else if (error.response.status === 500) {
            console.error("Server Error:", error.response.data.message);
        }
    }else if (error.code === "ECONNABORTED") {
        console.error("Request Timeout Error. Please check your internet connection.");
    }

    return Promise.reject(error);
});

export default axiosInstance;