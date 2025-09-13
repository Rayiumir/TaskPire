import React from "react";
import Progress from "../Progress.jsx";
import moment from "moment";
import AvatarGroup from "../AvatarGroup.jsx";
import {LuPaperclip} from "react-icons/lu";

const TaskCard = ({title, description, priority, status, progress, createdAt, dueDate, assignedTo, attachmentCount, completedTodoCount, todoChecklist, onClick}) => {

    const getStatusColor = () => {
        switch (status) {
            case "in progress":
                return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
            case "completed":
                return "text-lime-500 bg-lime-50 border border-lime-500/20";
            default:
                return "text-violet-500 bg-violet-50 border border-violet-500/10";
        }
    };

    const getPriorityColor = () => {
        switch (priority) {
            case "Low":
                return "text-green-500 bg-green-50 border border-green-500/10";
            case "Medium":
                return "text-orange-500 bg-orange-50 border border-orange-500/20";
            default:
                return "text-gray-500 bg-gray-50 border border-gray-500";
        }
    };

    return <div className="bg-white rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200/50 cursor-pointer" onClick={onClick}>
        <div className="flex items-end gap-3 px-4">
            <div className={`text-[11px] font-medium ${getStatusColor()} px-4 py-0.5 rounded`}>{status}</div>
            <div className={`text-[11px] font-medium ${getPriorityColor()} px-4 py-0.5 rounded`}>اولویت {priority}</div>
        </div>
        <div className={`px-4 border-l-[3px] ${status === "In Progress" ? "border-cyan-500" : status === "Completed" ? "border-indigo-500" : "border-violet-500"}`}>
            <h2 className="text-sm font-medium text-gray-800 mt-4 line-clamp-2">{title}</h2>
            <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-[18px]">{description}</p>
            <p className="text-[13px] text-gray-700/80 font-medium mt-2 mb-2 leading-[18px]">
                وظیفه انجام شده: {""}
                <span className="font-semibold text-gray-700">{completedTodoCount} / {todoChecklist.length || 0}</span>
            </p>
            <Progress progress={progress} status={status}/>
        </div>

        <div className="px-4">
            <div className="flex items-center justify-between my-1">
                <div>
                    <label className="text-xs text-gray-500">شروع تاریخ</label>
                    <p className="text-[13px] font-medium text-gray-900">{moment(createdAt).format("Do MMM YYYY")}</p>
                </div>
                <div>
                    <label className="text-xs text-gray-500">تاریخ پایان</label>
                    <p className="text-[13px] font-medium text-gray-900">{moment(dueDate).format("Do MMM YYYY")}</p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-3">
                <AvatarGroup avatars={assignedTo || []}/>
                {attachmentCount > 0 && <div className="flex items-center gap-2 bg-blue-50 px-2.5 py-1.5 rounded-lg">
                    <LuPaperclip className="text-primary"/>{""}
                    <p className="text-xs text-gray-900">{attachmentCount}</p>
                </div>}
            </div>
        </div>
    </div>

};
export default TaskCard;