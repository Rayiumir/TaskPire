import React, {useContext, useEffect, useState} from "react";
import AdminLayout from "../../components/layouts/AdminLayout.jsx";
import {useUserAuth} from "../../hooks/useUserAuth.jsx";
import {UserContext} from "../../context/userContext.jsx";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import moment from "moment";
import {addThousandsSeparator} from "../../utils/helper.js";
import InfoCard from "../../components/Cards/InfoCard.jsx";
import {LuArrowLeft, LuArrowRight} from "react-icons/lu";
import TaskListTable from "../../components/TaskListTable.jsx";
import CustomPieChart from "../../components/Charts/CustomPieChart.jsx";
import CustomBerChart from "../../components/Charts/CustomBerChart.jsx";
import {useTranslation} from "react-i18next";

const COLORS = [
    "#4f46e5",
    "#60a5fa",
    "#22c55e",
];

const AdminIndex = () => {
    useUserAuth();
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [dashboardData, setDashboardData] = useState(null);
    const [pieChartData, setPieChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);

    const perpareChartsData = (data) => {
        const taskDistribution = data?.taskDistribution || null;
        const taskPriorityLevels  = data?.taskPriorityLevel || null;

        const taskDistributionData = [
            {
                status: t("Pending"),
                count: taskDistribution?.Pending || 0
            },
            {
                status: t("In Progress"),
                count: taskDistribution?.InProgress || 0
            },
            {
                status: t("Completed"),
                count: taskDistribution?.Completed || 0
            }
        ];

        setPieChartData(taskDistributionData);

        const PriorityLevelsData = [
            {
                priority: t("Low"),
                count: taskPriorityLevels?.Low || 0
            },
            {
                priority: t("Medium"),
                count: taskPriorityLevels?.Medium || 0
            },
            {
                priority: t("High"),
                count: taskPriorityLevels?.High || 0
            },
        ];

        setBarChartData(PriorityLevelsData);
    };

    const getDashboardData = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
            if (response.data){
                setDashboardData(response.data);
                perpareChartsData(response.data?.charts || null);
            }
        }catch (error){
            console.error("Error fetching users:", error);
        }
    };

    const onSeeMore = () => {
        navigate("/admin/tasks");
    };

    useEffect(() => {
        getDashboardData();
        return () => {};
    }, []);

    return <AdminLayout activeMenu="AdminIndex">
        <div className="card my-5">
            <div>
                <h2 className="text-lg md:text-lg font-bold"> {t('Hello!')} {user?.name}</h2>
                <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
                    {moment().format("dddd Do MMM YYYY")}
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 md:gap-6 mt-5">
                <InfoCard
                    label={t("Total Tasks")}
                    value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.All || 0)}
                    color="bg-primary"
                />

                <InfoCard
                    label={t('Pending')}
                    value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Pending || 0)}
                    color="bg-violet-500"
                />

                <InfoCard
                    label={t('In Progress')}
                    value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.InProgress || 0)}
                    color="bg-cyan-500"
                />

                <InfoCard
                    label={t('Completed')}
                    value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Completed || 0)}
                    color="bg-lime-500"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">

            <div>
                <div className="card">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">
                            {t('Task distribution')}
                        </h2>
                    </div>
                    <CustomPieChart
                        data={pieChartData}
                        colors={COLORS}
                    />
                </div>
            </div>

            <div>
                <div className="card">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">
                            {t('Task priority')}
                        </h2>
                    </div>
                    <CustomBerChart
                        data={barChartData}
                    />
                </div>
            </div>

            <div className="md:col-span-2">
                <div className="card">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg">
                            {t('Recent tasks')}
                        </h2>
                        <button className="card-btn" onClick={onSeeMore}>
                            <LuArrowLeft className="text-base" /> {t('view all')}
                        </button>
                    </div>
                    <TaskListTable tableData={dashboardData?.recentTasks || []}/>
                </div>
            </div>
        </div>
    </AdminLayout>
}

export default AdminIndex