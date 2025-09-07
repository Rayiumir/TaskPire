import React, {useContext} from "react";
import {UserContext} from "../../context/userContext.jsx";
import Navbar from "./Navbar.jsx";
import SideMenu from "./SideMenu.jsx";

const AdminLayout = ({children, activeMenu}) => {
    const user = useContext(UserContext);
    return (
        <div className="">
            <Navbar activeMenu={activeMenu}/>

            {user &&
                <div className="flex" dir="rtl">
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