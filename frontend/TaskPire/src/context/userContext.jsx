import React, {createContext, useEffect, useState} from "react";
import axiosInstance from "../utils/axiosInstance.js";
import {API_PATHS} from "../utils/apiPaths.js";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) return;
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setLoading(false);
            return;
        }

        // If there's no access token, fetch user data from API'

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            }catch (error) {
                console.error("User not authenticated", error);
                clearUser();
            }finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("accessToken", userData.accessToken);
        setLoading(false);
    }

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("accessToken");
    };

    return (
        <UserContext.Provider value={{user, updateUser, clearUser, loading}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;