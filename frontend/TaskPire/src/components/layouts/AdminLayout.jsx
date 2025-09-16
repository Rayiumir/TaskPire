import React, {useContext} from "react";
import {UserContext} from "../../context/userContext.jsx";
import Navbar from "./Navbar.jsx";
import SideMenu from "./SideMenu.jsx";
import { useTranslation } from 'react-i18next';

const AdminLayout = ({children, activeMenu}) => {
    const user = useContext(UserContext);
    const { i18n } = useTranslation();
    const currentLang = i18n.language;
    return (
        <div className="">
            <Navbar activeMenu={activeMenu}/>

            {user &&
                <div className="flex" dir={currentLang === 'fa' ? 'rtl' : 'ltr'}>
                    <div className="max-[1080]:hidden">
                        <SideMenu activeMenu={activeMenu}/>
                    </div>
                    <div className="grow mx-5">
                        {children}
                    </div>
                </div>
            }
        </div>
    )
}

export default AdminLayout