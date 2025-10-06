"use client";
import React from "react";

import { Stepper } from "@workspace/ui/core/stepper/stepper-ui";
import { useStepper } from "@workspace/ui/core/stepper/useStepper";
import { defineSteps } from "@workspace/ui/core/stepper/types";
import { OtpEnum, OtpType } from "@khaled/ims-shared";
import { useTranslations } from "next-intl";
import RequestOtpForm from "./request-otp-form";
import VerifyOtpForm from "./verify-otp-form";
const OtpSteps = ({
  title,
  component,
  otpType,
}: {
  component: React.ComponentType<any>;
  title: "signUp" | "resetPassword";
  otpType: OtpType;
}) => {
  const formT = useTranslations("auth.form");

  const steps = defineSteps([
    {
      id: formT("stepOne"),
      name: formT("requestOtp"),
      component: RequestOtpForm,
      customProps: { otpType },
    },
    {
      id: formT("stepTwo"),
      name: formT("verifyOtp"),
      component: VerifyOtpForm,
    },
    {
      id: formT("stepThree"),
      name: formT(title),
      component,
    },
  ]);
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

export default OtpSteps;
