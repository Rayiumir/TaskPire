import React from "react";
import { useTranslation } from 'react-i18next';

const DeleteAlert = ({content, onDelete}) => {
    const { t } = useTranslation();
  return (
      <div>
          <p className="text-sm">{content}</p>

          <div className="flex justify-end mt-6">
              <button className="flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium text-rose-500 whitespace-nowrap bg-rose-50 border border-rose-100 rounded-lg px-4 py-2 cursor-pointer" onClick={onDelete}>{t("Remove")}</button>
          </div>
      </div>
  )
}

export default DeleteAlert;