"use client";
import React from "react";
import SignUp from "./signup-form";
import OtpSteps from "@/features/auth/forms/otp/otp-steps";

const SignUpPage = () => {
  return <OtpSteps component={SignUp} title="signUp" otpType="SIGN_UP" />;
};

export default SignUpPage;
