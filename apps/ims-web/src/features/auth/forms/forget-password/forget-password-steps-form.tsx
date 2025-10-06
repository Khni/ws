"use client";
import React from "react";

import PasswordReset from "./forget-password-form";

import OtpSteps from "@/features/auth/forms/otp/otp-steps";
import { OtpEnum } from "@khaled/ims-shared";

const ForgetPassword = () => {
  return (
    <OtpSteps
      component={PasswordReset}
      otpType={OtpEnum.FORGET_PASSWORD}
      title="resetPassword"
    />
  );
};

export default ForgetPassword;
