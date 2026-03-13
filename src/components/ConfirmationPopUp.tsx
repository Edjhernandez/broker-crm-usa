"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface ConfirmationPopUpProps {
  icon: React.ReactNode;
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

const ConfirmationPopUp: React.FC<ConfirmationPopUpProps> = ({
  icon,
  message,
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;
  const t = useTranslations("confirmationPopUp");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-muted/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className={`p-8 rounded-xl shadow-2xl flex flex-col items-center gap-4 max-w-sm w-full mx-4 transform transition-all  bg-background text-foreground`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-auto flex justify-center items-center">
          {icon}
        </div>
        <p className="text-base font-medium text-center">{message}</p>
        {onClose && (
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2 rounded-lg transition-colors font-medium text-primary-foreground bg-primary hover:bg-primary-hover"
            >
              {t("yes")}
            </button>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2 rounded-lg transition-colors font-medium text-primary-foreground bg-primary hover:bg-primary-hover"
            >
              {t("no")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationPopUp;
