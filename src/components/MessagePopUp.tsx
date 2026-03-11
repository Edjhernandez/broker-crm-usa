"use client";

import React from "react";

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center gap-4 max-w-sm w-full mx-4 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-4xl text-blue-600">{icon}</div>
        <p className="text-lg font-medium text-gray-800 text-center">
          {message}
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Cerrar
          </button>
        )}
      </div>
    </div>
  );
};

export default MessagePopUp;
