import {
    LuClipboard,
    LuClipboardCheck,
    LuClipboardPlus,
    LuEye,
    LuLayoutDashboard,
    LuLogOut,
    LuPlus,
    LuUsers
} from "react-icons/lu";
import i18n from "i18next";

export const Side_Menu_Admin_Items = [
    {
        id: 1,
        label: "Home",
        path: "/admin/index",
        icon: LuLayoutDashboard,
    },
    {
        id: 2,
        label: "Tasks",
        path: "/admin/tasks",
        icon: LuClipboardCheck,
    },
    {
        id: 3,
        label: "Create task",
        path: "/admin/create",
        icon: LuPlus,
    },
    {
        id: 4,
        label: "Users",
        path: "/admin/users",
        icon: LuUsers,
    },
    {
        id: 5,
        label: "Logout",
        path: "logout",
        icon: LuLogOut,
    },
];

export const Side_Menu_User_Items = [
    {
        id: 1,
        label: "Home",
        path: "/user/index",
        icon: LuLayoutDashboard,
    },
    {
        id: 2,
        label: "My Tasks",
        path: "/user/tasks",
        icon: LuClipboardPlus,
    },
    {
        id: 3,
        label: "Logout",
        path: "logout",
        icon: LuLogOut,
    },
];

export const PRIORITY_DATA = [
    {
        label: "High",
        value: "High",
    },
    {
        label: "Medium",
        value: "Medium",
    },
    {
        label: "Low",
        value: "Low",
    },
];

export const STATUS_DATA = [
    {
        label: "Pending",
        value: "Pending",
    },
    {
        label: "In Progress",
        value: "In Progress",
    },
    {
        label: "Completed",
        value: "Completed",
    },
];