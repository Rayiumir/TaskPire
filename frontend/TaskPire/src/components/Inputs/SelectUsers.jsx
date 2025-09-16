import React, {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import {LuUsers} from "react-icons/lu";
import Modal from "../Modal.jsx";
import AvatarGroup from "../AvatarGroup.jsx";
import { useTranslation } from 'react-i18next';

const SelectUsers = ({selectedUsers, setSelectedUsers}) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);
    const { t } = useTranslation();

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

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((prev) => prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]);
    };

    const handleAssign = () => {
        setSelectedUsers(tempSelectedUsers);
        setIsModalOpen(false);
    };

    const selectedUserAvatars = allUsers.filter((user) => tempSelectedUsers.includes(user._id)).map((user) => user.profileImageURL || null);

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        setTempSelectedUsers(selectedUsers);
    }, [selectedUsers]);


  return (
    <div className="space-y-4 mt-4">
        {selectedUserAvatars.length === 0 && (
            <button className="card-btn" onClick={() => setIsModalOpen(true)}>
                <LuUsers className="text-xs"/> {t('Add User')}
            </button>
        )}

        {tempSelectedUsers.length > 0 && (
            <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
                <AvatarGroup avatars={selectedUserAvatars} maxVisible={3}/>
            </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('Select Users')}>
            <div className="space-y-4 h-[60vh] overflow-y-auto">
                {allUsers.map((user) => (
                    <div key={user._id} className="flex items-center gap-4 p-3 border-b border-gray-200">
                        <input
                            type="checkbox"
                            checked={tempSelectedUsers.includes(user._id)}
                            onChange={() => toggleUserSelection(user._id)}
                            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none"
                        />

                        {user.profileImageURL ? (
                            <img src={user.profileImageURL} className="rounded-full w-10 h-10" alt={user.name} title={user.name} />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-400 flex items-center justify-center">
                                <span className="text-sm text-white font-bold">
                                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                                </span>
                            </div>
                        )}
                        <div className="flex-1">
                            <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
                            <p className="text-[13px] text-gray-500">{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button className="card-btn" onClick={() => setIsModalOpen(false)}>
                    {t('Cancel')}
                </button>
                <button className="card-btn-fill" onClick={handleAssign}>
                    {t('Ok')}
                </button>
            </div>
        </Modal>

    </div>
  )
}

export default SelectUsers