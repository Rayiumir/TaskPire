import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {API_PATHS} from "../../utils/apiPaths.js";
import axiosInstance from "../../utils/axiosInstance.js";
import AdminLayout from "../../components/layouts/AdminLayout.jsx";
import InfoBox from "../../components/Cards/InfoBox.jsx";
import moment from "moment";
import AvatarGroup from "../../components/AvatarGroup.jsx";
import TodoCheckList from "../../components/TodoCheckList.jsx";
import AttachmentInputList from "../../components/Inputs/AttachmentInputList.jsx";

const TaskDetails = () => {
    const {id} = useParams();
    const [task, setTask] = useState(null);

    const getStatusColor = (taskStatus) => {
        switch (taskStatus) {
            case "In Progress":
                return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
            case "Completed":
                return "text-lime-500 bg-lime-50 border border-lime-500/20";
            default:
                return "text-violet-500 bg-violet-50 border border-violet-500/10";
        }
    };

    const getTaskDetailsByID = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
            if (response.data){
                const taskInfo = response.data;
                setTask(taskInfo);
            }
        }catch (error){
            console.error("Error fetching task details:", error);
        }
    };

    const updateTodoChecklist = async (index) => {
        const todoChecklist = [...task?.todoChecklist];
        const taskId = id;

        if (todoChecklist && todoChecklist[index]){
            todoChecklist[index].completed = !todoChecklist[index].completed;
            const allCompleted = todoChecklist.every(item => item.completed);

            try {
                const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK_TODOCHECKLIST(taskId), {
                    todoChecklist,
                });
                if (response.status === 200){
                    let updatedTask = response.data?.task || task;

                    // If all todos are completed and status is not already "Completed", update status
                    if (allCompleted && updatedTask.status !== "Completed") {
                        try {
                            const statusResponse = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK_STATUS(taskId), {
                                status: "Completed"
                            });
                            if (statusResponse.status === 200) {
                                updatedTask = { ...updatedTask, status: "Completed" };
                            }
                        } catch (statusError) {
                            console.error("Error updating task status:", statusError);
                        }
                    }
                    setTask(updatedTask);
                }else {
                    todoChecklist[index].completed = !todoChecklist[index].completed;
                }
            }catch (error){
                console.error("Error updating TodoCheckList:", error);
            }
        }
    };

    const handleLinkClick = (link) => {
        if(!/^https?:\/\//i.test(link)){
            link = "https://" + link;
        }
        window.open(link, "_blank");
    }

    useEffect(() => {
        if (id){
            getTaskDetailsByID();
        }
        return () => {};
    }, [id]);

    return (
        <AdminLayout activeMenu="MyTasks">
            {task && (
                <div className="mt-5">
                    <div className="grid grid-cols-12 mt-4">
                        <div className="col-span-6 col-start-4">
                            <div className="form-card col-span-3">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm md:text-xl font-medium">{task?.title}</h2>
                                    <div className={`text-[11px] md:text-[13px] font-medium ${getStatusColor(task?.status)} px-4 py-0.5 rounded`}>{task?.status}</div>
                                </div>
                                <div className="mt-4">
                                    <InfoBox label="توضیحات" value={task?.description} />
                                </div>

                                <div className="grid grid-cols-12 gap-4 mt-4">
                                    <div className="col-span-6 md:col-span-4">
                                        <InfoBox label="اولویت" value={task?.priority} />
                                    </div>
                                    <div className="col-span-6 md:col-span-4">
                                        <InfoBox label="تاریخ پایان" value={task?.dueDate ? moment(task?.dueDate).format("Do MM YYYY") : "N/A"} />
                                    </div>
                                    <div className="col-span-6 md:col-span-4">
                                        <div className="text-xs font-medium text-slate-500">
                                            اختصاص به
                                        </div>
                                        <AvatarGroup avatars={task?.assignedTo?.map((item) => item?.profileImageURL) || []} maxVisible={5}/>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="text-xs font-medium text-slate-500">
                                        چک لیست کارها
                                    </label>

                                    {task?.todoChecklist?.map((item, index) => (
                                        <TodoCheckList
                                            key={`todo_${index}`}
                                            text={item.text}
                                            isChecked={item?.completed}
                                            onChange={() => updateTodoChecklist(index)}
                                        />
                                    ))}
                                </div>

                                {task?.attachments?.length > 0 && (
                                    <div className="mt-4">
                                        <label className="text-xs font-medium text-slate-500">
                                            پیوست ها
                                        </label>

                                        {task?.attachments?.map((link, index) => (
                                            <AttachmentInputList
                                                key={`link_${index}`}
                                                link={link}
                                                index={index}
                                                onClick={() => handleLinkClick(link)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}

export default TaskDetails