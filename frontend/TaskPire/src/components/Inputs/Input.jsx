import React, {useState} from "react";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {setShowPassword(!showPassword)};
    return (
        <div className="relative">
            <label className="block text-sm/6 font-medium text-gray-900">{label}</label>
            <input type={type === 'password' ? showPassword ? 'text' : 'password' : 'text'}
                   placeholder={placeholder}
                   className="block w-full rounded-full bg-white pl-10 px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                   value={value}
                   onChange={(e) => onChange(e)}
            />

            {type === 'password' && (
                <div className="absolute mt-6 inset-y-0 left-3 flex items-center cursor-pointer">
                {showPassword ? (
                    <FaRegEye
                        size={22}
                        className="text-primary cursor-pointer"
                        onClick={() => toggleShowPassword()}
                    />
                    ) : (
                        <FaRegEyeSlash
                            size={22}
                            className="text-slate-400 cursor-pointer"
                            onClick={() => toggleShowPassword()}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Input