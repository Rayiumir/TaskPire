import React, {createContext, useEffect, useState} from "react";
import axiosInstance from "../utils/axiosInstance.js";
import {API_PATHS} from "../utils/apiPaths.js";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) return;
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        // If there's token, fetch user data from API

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
        localStorage.setItem("token", userData.token);
        setLoading(false);
    }

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{user, updateUser, clearUser, loading}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;