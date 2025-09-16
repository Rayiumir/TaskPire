import React, {useEffect, useState} from "react";
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
import Modal from "../../components/Modal.jsx";
import DeleteAlert from "../../components/DeleteAlert.jsx";
import { useTranslation } from 'react-i18next';

const Create = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {taskId} = location.state || {};
    const { t } = useTranslation();

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
    const [loading, setloading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

    const handleValueChange = (key, value) => {
        setTaskData((prevData) => ({...prevData, [key]: value}));
    };

    const clearData = () => {
        setTaskData({
            title: "",
            description: "",
            priority: "Low",
            dueDate: null,
            todoChecklist: [],
            assignedTo: [],
            attachments: [],
        });
    };

    const createTask = async () => {
        setloading(true);
        try {
            const todolist  = taskData.todoChecklist?.map((item) => ({
                text: item,
                completed: false,
            }));

            const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
                ...taskData,
                dueDate: new Date(taskData.dueDate).toISOString(),
                todoChecklist: todolist,
            });

            if (response.status === 201) {
                toast.success(t("Task created successfully."));
                clearData();
                navigate("/admin/tasks");
            }
        }catch (error){
            console.error("Error creating task:", error);
            setloading(false);
        }finally {
            setloading(false);
        }
    };
    const updateTask = async () => {
        setloading(true);
        try {
            const todolist  = taskData.todoChecklist?.map((item) => {
                const prevTodoChecklist = currentTask?.todoChecklist || [];
                const matchedTask = prevTodoChecklist.find((task) => task.text === item);
                return{
                    text: item,
                    completed: matchedTask ? matchedTask.completed : false,
                }
            });

            const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
                ...taskData,
                dueDate: new Date(taskData.dueDate).toISOString(),
                todoChecklist: todolist,
            });

            if (response.status === 200) {
                toast.success(t("Task updated successfully."));
                navigate("/admin/tasks");
            }
        }catch (error){
            console.error("Error updating task:", error);
            setloading(false);
        }finally {
            setloading(false);
        }
    };
    const deleteTask = async () => {
        try {
            const response = await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
            setOpenDeleteAlert(false);
            toast.success("وظیفه با موفقیت حذف شد");
            navigate("/admin/tasks");
        }catch (error){
            console.error("Error deleting task:", error.response?.data?.message || error.message);
        }
    };
    const getTaskDetailsByID = async () => {
        try {
            console.log('Fetching task details for id:', taskId);
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId));
            console.log('Response data:', response.data);
            if (response.data){
                const taskInfo = response.data;
                setCurrentTask(taskInfo);

                const newAssignedTo = taskInfo?.assignedTo?.map((item) => item?._id) || [];
                const newTodoChecklist = taskInfo?.todoChecklist?.map((item) => item?.text) || [];

                setTaskData((prevState) =>({
                    title: taskInfo.title,
                    description: taskInfo.description,
                    priority: taskInfo.priority,
                    dueDate: taskInfo.dueDate ? moment(taskInfo.dueDate).format("YYYY-MM-DD") : null,
                    todoChecklist: newTodoChecklist,
                    assignedTo: newAssignedTo,
                    attachments: taskInfo?.attachments || [],
                }));
            }
        }catch (error){
            console.error("Error fetching task details:", error);
        }
    };
    const handleSubmit = async () => {

        setError(null);

        if (!taskData.title.trim()) {
            setError(t("Title cannot be empty."));
            return;
        }

        if (!taskData.description.trim()) {
            setError(t("Description cannot be empty."));
            return;
        }

        if (!taskData.dueDate) {
            setError(t("Please select a date."));
            return;
        }

        if (taskData.assignedTo?.length === 0) {
            setError(t("Please select a user."));
            return;
        }

        if (taskData.todoChecklist?.length === 0) {
            setError(t("Please add an item to the todo list."));
            return;
        }

        if (taskId){
            updateTask();
            return;
        }

        createTask();
    };

    useEffect(() => {
        if (taskId) {
            getTaskDetailsByID(taskId);
        }
        return  () => {};
    }, [taskId]);

    return (
        <AdminLayout activeMenu="Create Task">
            <div className="mt-5">
                <div className="grid grid-cols-12 mt-4">
                    <div className="col-span-6 col-start-4">
                        <div className="form-card col-span-3">
                            <div className="flex items-center justify-between">
                                <h2 className=" text-xl md:text-xl font-medium">
                                    {taskId ? t('Update task') : t('Create task')}
                                </h2>

                                {taskId && (
                                    <button className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer" onClick={() => setOpenDeleteAlert(true)}>
                                        <LuTrash2 className="text-base"/> {t('Remove')}
                                    </button>
                                )}
                            </div>
                            <div className="mt-4">
                                <label className="text-xs font-medium text-slate-600">
                                    {t('Title')}
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
                                    {t('Description')}
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
                                        {t('Priority')}
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
                                        {t('Date')}
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
                                        {t('Assigned To')}
                                    </label>
                                    <SelectUsers
                                        selectedUsers={taskData.assignedTo}
                                        setSelectedUsers={(value) => handleValueChange("assignedTo", value)}
                                    />
                                </div>

                            </div>
                            <div className="mt-3">
                                <label className="text-xs font-medium text-slate-600">
                                    {t('Todo Check List')}
                                </label>
                                <TodoListInput
                                    todoList={taskData?.todoChecklist}
                                    setTodoList={(value) => handleValueChange("todoChecklist", value)}
                                />
                            </div>
                            <div className="mt-3">
                                <label className="text-xs font-medium text-slate-600">{t('Add Links')}</label>

                                <AddAttachementsInput
                                    attachments={taskData?.attachments}
                                    setAttachments={(value) => handleValueChange("attachments", value)}
                                />
                            </div>

                            {error && (
                                <div className="mt-4">
                                    <p className="text-red-500 text-xs font-medium mt-5">{error}</p>
                                </div>
                            )}

                            <div className="flex justify-end mt-7">
                                <button className="add-btn" onClick={handleSubmit} disabled={loading}>
                                    {taskId ? t('Update task') : t('Create task')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={openDeleteAlert}
                onClose={() => setOpenDeleteAlert(false)}
                title={t('Remove task')}
            >
                <DeleteAlert content={t('Are you sure you want to delete this task?')} onDelete={() => deleteTask()}/>
            </Modal>
        </AdminLayout>
    )
}

export default Create