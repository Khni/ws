import { useState } from "react";

export function useStepper(totalSteps: number) {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const delta = currentStep - previousStep;

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const reset = () => {
    setPreviousStep(0);
    setCurrentStep(0);
  };

  return { currentStep, previousStep, delta, goNext, goBack, reset };
}
