import React, {useContext, useEffect, useState} from "react";
import AdminLayout from "../../components/layouts/AdminLayout.jsx";
import {useUserAuth} from "../../hooks/useUserAuth.jsx";
import {UserContext} from "../../context/userContext.jsx";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";

const AdminIndex = () => {
    useUserAuth();
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    // const [pieChartData, setPieChartData] = useState([]);
    // const [barChartData, setBarChartData] = useState([]);

    const getDashboardData = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
            if (response.data){
                setDashboardData(response.data);
            }
        }catch (error){
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getDashboardData();

        return () => {};
    }, []);

    return <AdminLayout activeMenu="AdminIndex">{JSON.stringify(dashboardData)}</AdminLayout>
}

export default AdminIndex