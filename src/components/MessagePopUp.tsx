"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface MessagePopUpProps {
  icon: React.ReactNode;
  message: string;
  isVisible: boolean;
  onClose?: () => void;
}

const MessagePopUp: React.FC<MessagePopUpProps> = ({
  icon,
  message,
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;
  const t = useTranslations("messagePopUp");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className={`p-8 rounded-xl shadow-2xl flex flex-col items-center gap-4 max-w-sm w-full mx-4 transform transition-all dark:bg-gray-800 dark:text-white bg-white text-gray-800`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={"text-8xl text-blue-600 dark:text-blue-400"}>
          {icon}
        </div>
        <p className="text-lg font-medium text-center">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-2 px-6 py-2 rounded-lg transition-colors font-medium dark:bg-blue-500 hover:bg-blue-600 dark:text-white"
          >
            {t("close")}
          </button>
        )}
      </div>
    </div>
  );
};

export default MessagePopUp;
