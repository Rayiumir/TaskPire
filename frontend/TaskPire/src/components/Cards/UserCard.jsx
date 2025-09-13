import React from "react";
import StatCard from "./StatCard.jsx";

const UserCard = ({userInfo}) => {
    return (
        <div className="user-card p-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={userInfo?.profileImageURL} alt={`avatar`} className="w-12 h-12 rounded-full border-2 border-white"/>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{userInfo?.name}</span>
                        <span className="text-xs text-gray-500">{userInfo?.email}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-end gap-3 mt-5">
                <StatCard label="در انتظار" count={userInfo?.pending || 0} status="Pending"/>
                <StatCard label="در پیشرفت" count={userInfo?.inProgress || 0} status="In Progress"/>
                <StatCard label="تکمیل شده" count={userInfo?.completed || 0} status="Completed"/>
            </div>
        </div>
    );
};

export default UserCard;