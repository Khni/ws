"use client";
import React from "react";

import RequestEmailOtp from "./request-email-otp-form";
import EmailVerification from "./verify-otp-form";
import PasswordReset from "./forget-password-form";
import { Stepper } from "@workspace/ui/core/stepper/stepper-ui";
import { useStepper } from "@workspace/ui/core/stepper/useStepper";
import { defineSteps } from "@workspace/ui/core/stepper/types";

const steps = defineSteps([
  {
    id: "Step 1",
    name: "Request Email OTP",
    component: RequestEmailOtp,
    customProps: { otpType: "FORGET_PASSWORD" },
  },
  {
    id: "Step 2",
    name: "Email Verification",
    component: EmailVerification,
  },
  {
    id: "Step 3",
    name: "Password Reset",
    component: PasswordReset,
  },
]);
const ForgetPassword = () => {
  const { currentStep, delta, goNext, goBack } = useStepper(steps.length);

  return (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      delta={delta}
      onNext={goNext}
      onBack={goBack}
    />
  );
};

export default ForgetPassword;
