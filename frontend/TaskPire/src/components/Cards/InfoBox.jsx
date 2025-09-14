import React from "react";

const InfoBox = ({label, value}) => {
  return <div>
      <label className="text-xs font-medium text-slate-500">{label}</label>
      <p className="text-[12px] md:text-[13px] font-medium text-gray-700 mt-0.5">{value}</p>
  </div>
};

export default InfoBox;