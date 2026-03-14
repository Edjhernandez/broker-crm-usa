"use client";

import StepIndicator from "@/components/form/StepIndicator";
import { useTranslations } from "next-intl";

export default function AddClientPage() {
  const t = useTranslations("addClientPage");

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl font-semibold mb-4 text-foreground">
        {t("title")}
      </h1>
      {/* Add your form or content for adding a client here */}
      <div className="w-full">
        <StepIndicator
          steps={[t("step1"), t("step2"), t("step3")]}
          currentStep={2}
        />
      </div>
    </div>
  );
}
