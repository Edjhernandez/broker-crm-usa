import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  // Create an array of step numbers based on totalSteps
  const stepsArray = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="w-full py-1">
      <div className="flex items-center justify-between relative">
        {/* Background line (Base) */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-secondary -translate-y-1/2 z-0" />

        {/* Active progress line */}
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-500 z-0"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
        />

        {stepsArray.map((stepNumber) => {
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <div
              key={stepNumber}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isActive
                      ? "bg-background border-primary text-primary shadow-[0_0_0_4px_rgba(37,99,235,0.1)]"
                      : "bg-background border-secondary text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <Check size={20} />
                ) : (
                  <span className="font-semibold text-sm">{stepNumber}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
