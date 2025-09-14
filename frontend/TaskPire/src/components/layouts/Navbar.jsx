import React, {useState} from "react";
import SideMenu from "./SideMenu.jsx";
import {HiOutlineMenu, HiOutlineX} from "react-icons/hi";
import Logo from "../../pages/image/logo.png";

const Navbar = () => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    return (
        <div className="flex gap-5 border bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30" dir="rtl">
            <button className="block lg:hidden text-black" onClick={() => {setOpenSideMenu(!openSideMenu)}}>
                {openSideMenu ? (
                    <HiOutlineX className="text-2xl"></HiOutlineX>
                ) : (
                    <HiOutlineMenu className="text-2xl"></HiOutlineMenu>
                )}
            </button>

            <h2 className="text-lg font-medium text-black">
                <img src={Logo} alt="Logo" className="w-[40px]"/>
            </h2>

            {openSideMenu && (
                <div className="fixed top-[61px] -ml-4 bg-white">
                    <SideMenu activeMenu={activeMenu}/>
                </div>
            )}
        </div>
    )
}

export default Navbar