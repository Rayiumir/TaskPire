import React, {useEffect, useState} from "react";
import AdminLayout from "../../components/layouts/AdminLayout.jsx";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import {LuFileSpreadsheet} from "react-icons/lu";
import TaskStatusTabs from "../../components/TaskStatusTabs.jsx";
import TaskCard from "../../components/Cards/TaskCard.jsx";

const Tasks = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [tabs, setTabs] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const navigate  = useNavigate();
    const handleClick = (taskData) => {
        navigate(`/admin/create`, {state: {taskId: taskData._id}});
    };
    const handleDownloadReport = async () => {};
    const getAllTasks = async () => {
        try {
            const reponse = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
                params:{
                    status: filterStatus === "All" ? "" : filterStatus
                },
            });

            setAllTasks(reponse.data?.tasks?.length > 0 ?  reponse.data.tasks : []);

            const statusSummary = reponse.data?.statusSummary || [];

            const statusArray = [
                {label: "همه", count: statusSummary.all || 0},
                {label: "در انتظار", count: statusSummary.pendingTasks || 0},
                {label: "در پیشرفت", count: statusSummary.inProgressTasks || 0},
                {label: "تکمیل شده", count: statusSummary.completedTasks || 0},
            ];

            setTabs(statusArray);
        }catch (error){
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        getAllTasks(filterStatus);
        return () => [];
    }, [filterStatus]);

    return <AdminLayout activeMenu="ManageTasks">
        <div className="my-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl md:text-xl font-medium">وظایف من</h2>
                </div>

                {tabs?.[0]?.count > 0 && (
                    <div className="flex items-center gap-3">
                        <TaskStatusTabs tabs={tabs} activeTab={filterStatus} setActiveTab={setFilterStatus}/>
                        <button className="flex download-btn" onClick={handleDownloadReport}>
                            <LuFileSpreadsheet className="text-lg"/>
                            دانلود گزارش
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {allTasks?.map((item, index) => (
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
                        onClick={() => handleClick(item)}
                    ></TaskCard>
                ))}
            </div>
        </div>
    </AdminLayout>
}

export default Tasks