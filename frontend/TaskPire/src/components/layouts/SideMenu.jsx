import React, {useContext, useEffect, useState} from "react";
import { UserContext } from "../../context/userContext.jsx";
import {useNavigate} from "react-router-dom";
import {Side_Menu_Admin_Items, Side_Menu_User_Items} from "../../utils/data.js";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../LanguageSwitcher.jsx";

const SideMenu = ({activeMenu}) => {
    const { user, clearUser } = useContext(UserContext);
    const [sideMenuItems, setSideMenuItems] = useState([]);
    const navgate = useNavigate();
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }

        navgate(route);
    }

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navgate("/login");
    };

    useEffect(() => {
        if(user) {
            setSideMenuItems(user?.role === "admin"? Side_Menu_Admin_Items : Side_Menu_User_Items);
        }
        return () => {};
    }, [user]);

    return <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20" dir={currentLang === 'fa' ? 'rtl' : 'ltr'}>
        <div className="flex flex-col items-center justify-center mb-7 pt-5">
            <div className="relative">
                {user?.profileImageURL ? (
                    <img src={user.profileImageURL} className="rounded-full w-20 h-20 object-cover" alt="Profile" />
                ) : (
                    <div className="rounded-full w-20 h-20 bg-slate-400 flex items-center justify-center">
                        <span className="text-2xl text-white font-bold">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                    </div>
                )}
            </div>
            {user?.role === "admin" && (<div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-3">{t("Admin")}</div>)}
            {user?.role === "user" && (<div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-3">{t("User")}</div>)}
            <h5 className="text-gray-950 font-medium leading-6 mt-3">{user?.name || ""}</h5>
            <p className="text-[12px] text-gray-500 mb-5">{user?.email || ""}</p>
            <LanguageSwitcher/>
        </div>

        {sideMenuItems.map((item, index) => (
            <button key={`menu_${index}`} className={`w-full flex items-center gap-4 text-[15px] ${activeMenu === item.label ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3" : ""} py-3 px-6 nb-3 cursor-pointer`} onClick={() => handleClick(item.path)}>
                <item.icon className="text-xl"/>
                {t(item.label)}
            </button>
        ))}
    </div>
}

export default SideMenu