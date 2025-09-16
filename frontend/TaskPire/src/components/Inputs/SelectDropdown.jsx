import React, {useState} from "react";
import {LuChevronDown} from "react-icons/lu";
import { useTranslation } from 'react-i18next';

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const handleSelect = (option) => {
        onChange(option);
      setIsOpen(false);
    };

  return (
    <div className="relative w-full">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md mt-2 flex items-center justify-between">
            {value ? options.find((opt) => opt.value === value)?.label : placeholder}
            <span className="ml-2">{isOpen ? <LuChevronDown className="rotate-180"/> : <LuChevronDown />}</span>
        </button>

        {isOpen && (
            <div className="absolute w-full bg-white border border-slate-100 rounded-md mt-1 shadow-md z-10 p-2">
                {options.map((option) => (
                    <div key={option.value} onClick={() => handleSelect(option.value)} className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 hover:rounded-md">
                        {t(option.label)}
                    </div>
                ))}
            </div>
        )}
    </div>
  );
}

export default SelectDropdown;