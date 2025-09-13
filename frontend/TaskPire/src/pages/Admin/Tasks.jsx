import React, {useEffect, useState} from "react";
import AdminLayout from "../../components/layouts/AdminLayout.jsx";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import {LuFileSpreadsheet} from "react-icons/lu";
import TaskStatusTabs from "../../components/TaskStatusTabs.jsx";
import TaskCard from "../../components/Cards/TaskCard.jsx";
import toast from "react-hot-toast";

const Tasks = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [tabs, setTabs] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const navigate  = useNavigate();

    const statusMapping = {
        "همه": "All",
        "در انتظار": "Pending",
        "در پیشرفت": "In Progress",
        "تکمیل شده": "Completed"
    };
    const handleClick = (taskData) => {
        navigate(`/admin/create`, {state: {taskId: taskData._id}});
    };
    const handleDownloadReport = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "tasks.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("گزارش با موفقیت دانلود شد");
        }catch (error){
            console.error("Error downloading report:", error);
            if (error.response) {
                console.error("Response status:", error.response.status);
                console.error("Response data:", error.response.data);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Request setup error:", error.message);
            }
            toast.error("مشکلی در دانلود گزارش رخ داده است");
        }
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
        getAllTasks();
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
                        onClick={() => handleClick(item)}
                    />
                ))}
            </div>
        </div>
    </AdminLayout>
}

export default Tasks