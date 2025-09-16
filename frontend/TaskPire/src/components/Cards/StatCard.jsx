import React from "react";
import { useTranslation } from 'react-i18next';

const StatCard = ({label, count, status}) => {
    const { t } = useTranslation();
    const getStatusColor = () => {
        switch (status) {
            case "In Progress":
                return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
            case "Completed":
                return "text-lime-500 bg-lime-50 border border-lime-500/20";
            default:
                return "text-violet-500 bg-violet-50 border border-violet-500/10";
        }
    };

    return (
        <div className={`flex-1 text-[10px] font-medium ${getStatusColor()} px-4 py-0.5 rounded`}>
            <span className="text-[12px] font-semibold">{count} <br/>  {t(label)}</span>
        </div>
    )
}

export default StatCard;