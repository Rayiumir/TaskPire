import React, {useContext, useEffect, useState} from "react";
import AdminLayout from "../../components/layouts/AdminLayout.jsx";
import {useUserAuth} from "../../hooks/useUserAuth.jsx";
import {UserContext} from "../../context/userContext.jsx";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import moment from "moment";

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

    return <AdminLayout activeMenu="AdminIndex">
        <div className="card my-5">
            <div>
                <h2 className="text-xl md:text-2xl">سلام! {user?.name}</h2>
                <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
                    {moment().format("dddd Do MMM YYYY")}
                </p>
            </div>
        </div>
    </AdminLayout>
}

export default AdminIndex