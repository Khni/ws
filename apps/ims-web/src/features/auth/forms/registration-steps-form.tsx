"use client";
import React from "react";

import RequestEmailOtp from "./request-email-otp-form";
import EmailVerification from "./verify-otp-form";
import Register from "./register-form";
import { Stepper } from "@workspace/ui/core/stepper/stepper-ui";
import { useStepper } from "@workspace/ui/core/stepper/useStepper";
import { defineSteps } from "@workspace/ui/core/stepper/types";
import { OtpEnum } from "@khaled/ims-shared";
const steps = defineSteps([
  {
    id: "Step 1",
    name: "Request Email OTP",
    component: RequestEmailOtp,
    customProps: { otpType: OtpEnum.SIGN_UP },
  },
  {
    id: "Step 2",
    name: "Email Verification",
    component: EmailVerification,
  },
  {
    id: "Step 3",
    name: "Registration",
    component: Register,
  },
]);
const RegisterPage = () => {
  const { currentStep, previousStep, delta, goNext, goBack, reset } =
    useStepper(steps.length);

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

export default RegisterPage;
