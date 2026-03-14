"use client";

import StepIndicator from "@/components/form/StepIndicator";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AddClientPage() {
  const t = useTranslations("addClientPage");
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl font-semibold text-foreground">{t("title")}</h1>
      {/* navigation bar */}
      <div className="w-11/12 my-2">
        <StepIndicator
          totalSteps={5} // Total number of steps in the form
          currentStep={currentStep}
        />
      </div>

      {/* Content for adding a client here */}
      <div className="bg-background rounded-xl border border-border shadow-sm flex-1 w-full mt-1">
        <div className="flex flex-col items-center justify-start h-full text-secondary-foreground">
          {/* sections for information */}
          <p className="text-base font-medium bg-amber-600">
            Step {currentStep}: {t(`step${currentStep}`)}
          </p>
          <p className="text-sm">
            Sección en construcción para la siguiente rama...
          </p>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-around w-full mt-4">
        <button
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          {t("back")}
        </button>
        <button
          className="px-4 py-2 bg-primary text-foreground rounded"
          onClick={handleNext}
          disabled={currentStep === 5}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}
