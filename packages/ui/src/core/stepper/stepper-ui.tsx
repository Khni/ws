"use client";
import { Step } from "@workspace/ui/core/stepper/types.js";
import { motion } from "framer-motion";
import React from "react";

interface StepperProps<T extends Step<React.ComponentType<any>>[]> {
  steps: T;
  currentStep: number;
  delta: number;
  onNext: () => void;
  onBack: () => void;
}

export function Stepper<T extends Step<React.ComponentType<any>>[]>({
  steps,
  currentStep,
  delta,
  onNext,
  onBack,
}: StepperProps<T>) {
  const CurrentStep = steps[currentStep]!;

  return (
    <div className="space-y-3 w-full">
      {/* Progress Nav */}
      <nav aria-label="Progress" className="w-full">
        <ol
          role="list"
          className="space-y-4  md:flex md:space-x-8 md:space-y-0"
        >
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pt-4">
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 md:border-l-0 md:border-t-4 md:pt-4">
                  <span className="text-sm font-medium text-gray-500">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Animated Current Step */}
      <motion.div
        key={currentStep}
        initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <CurrentStep.component
          onNext={onNext}
          onBack={onBack}
          {...(CurrentStep.customProps ?? {})}
        />
      </motion.div>
    </div>
  );
}
