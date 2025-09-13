import React, {useEffect, useState} from "react";
import AdminLayout from "../../components/layouts/AdminLayout.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import {LuFileSpreadsheet} from "react-icons/lu";
import UserCard from "../../components/Cards/UserCard.jsx";
import toast from "react-hot-toast";

const Users = () => {
    const [allUsers, setAllUsers] = useState([]);
    const handleDownloadReport = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "users.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("گزارش با موفقیت دانلود شد");
        }catch (error){
            console.error("Error downloading report:", error);
            toast.error("مشکلی در دانلود گزارش رخ داده است");
        }
    };
    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
            if(response.data?.length > 0){
                setAllUsers(response.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getAllUsers();
        return  () => {}
    }, []);

    return <AdminLayout activeMenu="Users">
        <div className="mt-5 mb-10">
            <div className="flex md:flex-row md:items-center justify-between">
                <h2 className="text-xl md:text-xl font-medium">مدیریت کاربران</h2>
                <button className="flex md:flex download-btn" onClick={handleDownloadReport}>
                    <LuFileSpreadsheet className="text-lg"/>
                    دانلود گزارش
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {allUsers.map((user) => (
                    <UserCard key={user._id} userInfo={user}/>
                ))}
            </div>
        </div>
    </AdminLayout>
}

export default Users