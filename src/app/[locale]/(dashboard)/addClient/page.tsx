"use client";

import StepIndicator from "@/components/form/StepIndicator";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AddClientPage() {
  const t = useTranslations("addClientPage");
  const [currentStep, setCurrentStep] = useState(1);
  const TOTAL_STEPS = 5;

  const handleNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const handleBack = () =>
    setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl font-semibold text-foreground">{t("title")}</h1>
      {/* navigation bar */}
      <div className="w-11/12 my-2">
        <StepIndicator
          totalSteps={TOTAL_STEPS} // Total number of steps in the form
          currentStep={currentStep}
        />
      </div>

      {/* Content for adding a client here */}
      <div className="bg-background rounded-xl border border-border shadow-sm flex-1 w-full mt-1 min-h-150">
        <div className="flex flex-col items-center justify-start h-full text-secondary-foreground">
          <p className="text-base font-semibold mt-1">
            {t(`step${currentStep}`)}
          </p>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-around w-full mt-4">
        <button
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded w-40 cursor-pointer"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          {t("back")}
        </button>
        <button
          className="px-4 py-2 bg-primary text-foreground rounded w-40 cursor-pointer"
          onClick={handleNext}
        >
          {currentStep === TOTAL_STEPS ? t("save") : t("next")}
        </button>
      </div>
    </div>
  );
}
