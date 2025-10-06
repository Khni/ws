"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { useTranslations } from "next-intl";
import CustomForm from "@workspace/ui/core/form/custom-form";

import OtpField from "@workspace/ui/core/form/otp-field";
import { useVerifyOtpHandler } from "@/features/auth/hooks/useVerifyOtpHandler";
import { OtpRequestStorage } from "@/features/auth/hooks/useRequestOtpHandler";
import { ErrorAlert } from "@workspace/ui/core/ErrorAlert";
import { useState } from "react";
import { AuthErrorCodesType, ErrorResponse } from "@khaled/ims-shared";

//----changeable
const schema = z.object({
  otp: z.string().min(6),
});

const defaultValues = {
  otp: "",
};

//----

export type Props = {
  onNext: () => void;
  onBack: () => void;
};
const Form = ({ onNext }: Props) => {
  const t = useTranslations();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  const [errorResponse, setErrorResponse] =
    useState<ErrorResponse<AuthErrorCodesType>>();

  //---changeable
  const authErrors = useTranslations("auth.errors");

  const formTitleFallback = t("verifyOtpFormCardTitle");

  const submitButtonTextFallBack = t("submitButton");

  const isLoadingTextFallBack = t("loading");
  const fields = {
    otp: {
      label: t("verifyOtpFormCardTitle"),
      name: "otp",
      type: "otp",
    },
  } as const;
  const { isPending, submit } = useVerifyOtpHandler({
    onSuccess: () => onNext(),
    setErrorResponse,
  });
  const onSubmit = (data: { otp: string }) => {
    try {
      const otpRequest = localStorage.getItem("otpRequest");
      if (!otpRequest) throw new Error("No OTP request found in localStorage");
      const { otpType } = JSON.parse(otpRequest) as OtpRequestStorage;
      submit({ ...data, otpType });
    } catch (error) {
      console.error("Failed to parse OTP request from localStorage", error);
    }
  };

  //---

  return (
    <CustomForm
      cardTitle={formTitleFallback}
      submitButtonText={submitButtonTextFallBack}
      form={form}
      onSubmit={onSubmit}
      isLoadingText={isLoadingTextFallBack}
      isLoading={isPending}
    >
      {Object.values(fields).map(
        ({ label, name, type }) =>
          type === "otp" && (
            <OtpField key={name} form={form} label={label} name={name} />
          )
      )}
      <ErrorAlert
        errorTitle={t("error")}
        errorDescriptionFallback={t("unknownError")}
        error={errorResponse}
        codeTransform={(code) => authErrors(code)}
      />
    </CustomForm>
  );
};

export default Form;
