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

export const Side_Menu_Admin_Items = [
    {
        id: 1,
        label: "پیشخوان",
        path: "/admin/index",
        icon: LuLayoutDashboard,
    },
    {
        id: 2,
        label: "مدیریت وظایف",
        path: "/admin/tasks",
        icon: LuClipboardCheck,
    },
    {
        id: 3,
        label: "ایجاد وظیفه جدید",
        path: "/admin/create",
        icon: LuPlus,
    },
    {
        id: 4,
        label: "مدیریت کاربران",
        path: "/admin/users",
        icon: LuUsers,
    },
    {
        id: 5,
        label: "خروج",
        path: "/logout",
        icon: LuLogOut,
    },
];

export const Side_Menu_User_Items = [
    {
        id: 1,
        label: "پیشخوان",
        path: "/user/index",
        icon: LuLayoutDashboard,
    },
    {
        id: 2,
        label: "وظایف من",
        path: "/user/tasks",
        icon: LuClipboardPlus,
    },
    {
        id: 3,
        label: "خروج",
        path: "logout",
        icon: LuLogOut,
    },
];

export const PRIORITY_DATA = [
    {
        label: "بالا",
        value: "high",
    },
    {
        label: "متوسط",
        value: "medium",
    },
    {
        label: "کم",
        value: "low",
    },
];

export const STATUS_DATA = [
    {
        label: "بررسی نشده",
        value: "Pending",
    },
    {
        label: "در حال پیشرفت",
        value: "In Progress",
    },
    {
        label: "تکمیل شده",
        value: "Completed",
    },
];