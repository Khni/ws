"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { useTranslations } from "next-intl";
import CustomForm from "@workspace/ui/core/form/custom-form";
import InputField from "@workspace/ui/core/form/input-field";

import { useRequestOtpHandler } from "@/features/auth/hooks/useRequestOtpHandler";
import { AuthErrorCodesType, ErrorResponse, OtpType } from "@khaled/ims-shared";
import { ErrorAlert } from "@workspace/ui/core/ErrorAlert";
import { useState } from "react";
import { getFieldErrors } from "@workspace/ui/core/getFieldErrors";

//----changeable
const schema = z.object({
  identifier: z.union([z.e164(), z.email()]),
});

//----

export type Props = {
  onNext: () => void;
  onBack: () => void;
  otpType: OtpType;
};
const Form = ({ onNext, otpType }: Props) => {
  const t = useTranslations();
  const authErrors = useTranslations("auth.errors");
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const [errorResponse, setErrorResponse] =
    useState<ErrorResponse<AuthErrorCodesType>>();
  //---changeable

  const formTitleFallback = t("sendingOtpFormTitle");

  const submitButtonTextFallBack = t("submitButton");

  const isLoadingTextFallBack = t("loading");
  const fields = {
    email: {
      label: t("emailLabel"),
      name: "identifier",
      type: "text",
    },
  } as const;
  const { isPending, submit } = useRequestOtpHandler({
    otpType: otpType,
    onSuccess: () => onNext(),
    setErrorResponse,
  });

  //---

  return (
    <CustomForm
      cardTitle={formTitleFallback}
      submitButtonText={submitButtonTextFallBack}
      form={form}
      onSubmit={submit}
      isLoadingText={isLoadingTextFallBack}
      isLoading={isPending}
    >
      {Object.values(fields).map(({ label, name, type }) => (
        <div key={name}>
          <InputField form={form} label={label} name={name} type={type} />
          {getFieldErrors(name, errorResponse)}
        </div>
      ))}
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
