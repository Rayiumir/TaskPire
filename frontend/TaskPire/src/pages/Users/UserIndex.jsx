import React, {useContext, useState} from "react";
import {useUserAuth} from "../../hooks/useUserAuth.jsx";
import {UserContext} from "../../context/userContext.jsx";
import AdminLayout from "../../components/layouts/AdminLayout.jsx";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";

const UserIndex = () => {
    useUserAuth();
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [pieChartData, setPieChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);

    const getUserData = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
            if (response.data){
                setUserData(response.data);
            }
        }catch (error){
            console.error("Error fetching users:", error);
        }
    };

    return <AdminLayout activeMenu="UserIndex"></AdminLayout>
}

export default UserIndex