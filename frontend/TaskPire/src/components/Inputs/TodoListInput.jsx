import React, {useState} from "react";
import {HiMiniPlus, HiOutlineTrash} from "react-icons/hi2";

const TodoListInput = ({ todoList, setTodoList }) => {
    const [option, setOption] = useState("");

    const handleAddOption = () => {
        if (option.trim()){
            setTodoList([...todoList, option.trim()]);
            setOption("");
        }
    };

    const handleDeleteOption = (index) => {
        const updatedArr = todoList.filter((_, idx) => idx !== index);
        setTodoList(updatedArr);
    };
  return (
    <div>
        {todoList.map((item, index) => (
            <div key={item} className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-3">
                <p className="text-xs text-black">
                    <span className="text-xs text-gray-400 font-semibold ml-2">{index < 9 ? `0${index + 1}` : index + 1}</span>
                    {item}
                </p>

                <button className="cursor-pointer" onClick={() => handleDeleteOption(index)}>
                    <HiOutlineTrash className="text-lg text-red-500"/>
                </button>
            </div>
        ))}

        <div className="flex items-center gap-5 mt-4 w-full">
            <input
                type="text"
                placeholder="افزودن وظیفه"
                value={option}
                onChange={({target}) => setOption(target.value)}
                className="flex-1 text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md"
            />
            <button className="card-btn text-nowrap" onClick={handleAddOption}>
                <HiMiniPlus className="text-lg"/> افزودن
            </button>
        </div>

    </div>
  )
};

export default TodoListInput;