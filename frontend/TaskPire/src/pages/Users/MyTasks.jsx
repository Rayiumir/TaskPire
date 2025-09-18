import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import toast from "react-hot-toast";
import AdminLayout from "../../components/layouts/AdminLayout.jsx";
import TaskStatusTabs from "../../components/TaskStatusTabs.jsx";
import {LuFileSpreadsheet} from "react-icons/lu";
import TaskCard from "../../components/Cards/TaskCard.jsx";
import { useTranslation } from 'react-i18next';

const myTask = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [tabs, setTabs] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const navigate  = useNavigate();
    const { t } = useTranslation();

    const statusMapping = {
        "All": "All",
        "Pending": "Pending",
        "In Progress": "In Progress",
        "Completed": "Completed"
    };

    const getAllTasks = async () => {
        try {
            const mappedStatus = statusMapping[filterStatus] || filterStatus;
            const statusParam = mappedStatus === "All" ? "" : mappedStatus;
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
                params:{
                    status: statusParam
                },
            });

            setAllTasks(response.data?.tasks?.length > 0 ?  response.data.tasks : []);

            const statusSummary = response.data?.statusSummary || [];

            const statusArray = [
                {label: "All", count: statusSummary.all || 0},
                {label: "Pending", count: statusSummary.pendingTasks || 0},
                {label: "In Progress", count: statusSummary.inProgressTasks || 0},
                {label: "Completed", count: statusSummary.completedTasks || 0},
            ];

            setTabs(statusArray);
        }catch (error){
            console.error("Error fetching tasks:", error);
        }
    };

    const handleClick = (taskId) => {
        navigate(`/user/taskdetails/${taskId}`);
    };

    useEffect(() => {
        getAllTasks();
        return () => [];
    }, [filterStatus]);

    return <AdminLayout activeMenu="MyTasks">
        <div className="my-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl md:text-xl font-medium">{t("My Tasks")}</h2>
                </div>

                {tabs?.[0]?.count > 0 && (
                    <div className="flex items-center gap-3">
                        <TaskStatusTabs tabs={tabs} activeTab={filterStatus} setActiveTab={setFilterStatus}/>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {allTasks?.map((item) => (
                    <TaskCard
                        key={item._id}
                        title={item.title}
                        description={item.description}
                        priority={item.priority}
                        status={item.status}
                        progress={item.progress}
                        createdAt={item.createdAt}
                        dueDate={item.dueDate}
                        assignedTo={item.assignedTo?.map((item) => item.profileImageURL)}
                        attachmentCount={item.attachments?.length || 0}
                        completedTodoCount={item.completedTodoCount || 0}
                        todoChecklist={item.todoChecklist || []}
                        onClick={() => handleClick(item._id)}
                    />
                ))}
            </div>
        </div>
    </AdminLayout>
}

export default myTask;