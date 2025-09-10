import React, {useState} from "react";
import AdminLayout from "../../components/layouts/AdminLayout.jsx";
import {PRIORITY_DATA} from "../../utils/data.js";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import toast from "react-hot-toast";
import {useLocation, useNavigate} from "react-router-dom";
import moment from "moment";
import {LuTrash2} from "react-icons/lu";
import SelectDropdown from "../../components/Inputs/SelectDropdown.jsx";
import SelectUsers from "../../components/Inputs/SelectUsers.jsx";
import TodoListInput from "../../components/Inputs/TodoListInput.jsx";
import AddAttachementsInput from "../../components/Inputs/AddAttachementsInput.jsx";

const Create = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {taskId} = location.state || {};

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        priority: "Low",
        dueDate: null,
        todoChecklist: [],
        assignedTo: [],
        attachments: []
    });

    const [currentTask, setCurrentTask] = useState(null);
    const [error, setError] = useState("");
    const [Loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

    const handleValueChange = (key, value) => {
        setTaskData((prevData) => ({...taskData, [key]: value}));
    };

    const clearData = () => {
        setTaskData({
            title: "",
            description: "",
            priority: "Low",
            dueDate: null,
            todoChecklist: [],
            assignedTo: [],
            attachments: []
        });
    };

    const createTask = async () => {};
    const updateTask = async () => {};
    const deleteTask = async () => {};
    const getTaskDetailsById = async () => {};
    const handleSubmit = async () => {};

    return (
        <AdminLayout activeMenu="Create Task">
            <div className="mt-5">
                <div className="grid grid-cols-12 mt-4">
                    <div className="col-span-6 col-start-4">
                        <div className="form-card col-span-3">
                        <div className="flex items-center justify-between">
                            <h2 className=" text-xl md:text-xl font-medium">
                                {taskId ? "به روز رسانی وظیفه" : "ایجاد وظیفه"}
                            </h2>

                            {taskId && (
                                <button className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer" onClick={() => setOpenDeleteAlert(true)}>
                                    <LuTrash2 className="text-base"/> حذف
                                </button>
                            )}
                        </div>
                        <div className="mt-4">
                            <label className="text-xs font-medium text-slate-600">
                                عنوان وظیفه
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                value={taskData.title}
                                onChange={({target}) => handleValueChange("title", target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="text-xs font-medium text-slate-600">
                                توضیحات
                            </label>
                            <textarea
                                className="form-input"
                                value={taskData.description}
                                onChange={({target}) => handleValueChange("description", target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-12 gap-4 mt-2">
                            <div className="col-span-6 md:col-span-4">
                                <label className="text-xs font-medium text-slate-600">
                                    اولویت
                                </label>

                                <SelectDropdown
                                    options={PRIORITY_DATA}
                                    value={taskData.priority}
                                    onChange={(value) => handleValueChange("priority", value)}
                                    placeholder="انتخاب کنید ..."
                                />
                            </div>

                            <div className="col-span-6 md:col-span-4">
                                <label className="text-xs font-medium text-slate-600">
                                    تاریخ
                                </label>
                                <input
                                    type="date"
                                    className="form-input"
                                    value={taskData.dueDate}
                                    onChange={({target}) => handleValueChange("dueDate", target.value)}
                                />
                            </div>

                            <div className="col-span-12 md:col-span-4">
                                <label className="text-xs font-medium text-slate-600 mt-5">
                                    اختصاص دادن به
                                </label>
                                <SelectUsers
                                    selectedUsers={taskData.assignedTo}
                                    setSelectedUsers={(value) => handleValueChange("assignedTo", value)}
                                />
                            </div>

                        </div>
                        <div className="mt-3">
                            <label className="text-xs font-medium text-slate-600">
                                چک لیست کارها
                            </label>
                            <TodoListInput
                                todoList={taskData?.todoChecklist}
                                setTodoList={(value) => handleValueChange("todoChecklist", value)}
                            />
                        </div>
                        <div className="mt-3">
                            <label className="text-xs font-medium text-slate-600">اضافه کردن پیوست‌ها</label>

                            <AddAttachementsInput
                                attachments={taskData?.attachments}
                                setAttachments={(value) => handleValueChange("attachments", value)}
                            />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Create