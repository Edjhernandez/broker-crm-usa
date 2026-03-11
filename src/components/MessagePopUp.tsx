"use client";

import React from "react";

interface MessagePopUpProps {
  icon: React.ReactNode;
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  theme?: "light" | "dark";
}

const MessagePopUp: React.FC<MessagePopUpProps> = ({
  icon,
  message,
  isVisible,
  onClose,
  theme = "light",
}) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className={`p-8 rounded-xl shadow-2xl flex flex-col items-center gap-4 max-w-sm w-full mx-4 transform transition-all ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={
            theme === "dark"
              ? "text-4xl text-blue-400"
              : "text-4xl text-blue-600"
          }
        >
          {icon}
        </div>
        <p className="text-lg font-medium text-center">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className={`mt-2 px-6 py-2 rounded-lg transition-colors font-medium ${
              theme === "dark"
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Cerrar
          </button>
        )}
      </div>
    </div>
  );
};

export default MessagePopUp;
