import React from "react";

const Progress = ({status, progress}) => {

    const getColor = () => {
        switch (status) {
            case "In Progress":
                return "text-blue-500 bg-blue-500 border border-blue-500/10";
            case "Completed":
                return "text-green-500 bg-green-500 border border-green-500/20";
            default:
                return "text-violet-500 bg-violet-500 border border-violet-500/10";
        }
    };

  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div className={`${getColor()} h-1.5 rounded-full text-center text-xs font-medium`} style={{width:`${progress}%`}}></div>
    </div>
  );
};

export default Progress;