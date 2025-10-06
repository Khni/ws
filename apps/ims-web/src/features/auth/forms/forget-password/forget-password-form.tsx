"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { useTranslations } from "next-intl";
import CustomForm from "@workspace/ui/core/form/custom-form";
import InputField from "@workspace/ui/core/form/input-field";

//----changeable
import {
  AuthErrorCodes,
  AuthErrorCodesType,
  ErrorResponse,
  resetForgettenPasswordBodySchema as schema,
} from "@khaled/ims-shared";
import { useForgetPasswordHandler } from "@/features/auth/hooks/useForgetPasswordHandler";
import { ErrorAlert } from "@workspace/ui/core/ErrorAlert";
import { useState } from "react";

const defaultValues = {
  newPassword: "",
  confirmNewPassword: "",
};

//----

const Form = () => {
  const t = useTranslations();
  const authErrors = useTranslations("auth.errors");
  const [errorResponse, setErrorResponse] =
    useState<ErrorResponse<AuthErrorCodesType>>();
  //---changeable
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  //---changeable

  const formTitleFallback = t("forgetPassword");

  const submitButtonTextFallBack = t("submitButton");

  const isLoadingTextFallBack = t("loading");
  const fields = {
    newPassword: {
      label: t("newPassword"),
      name: "newPassword",
      type: "password",
    },
    confirmNewPassword: {
      label: t("confirmPassword"),
      name: "confirmNewPassword",
      type: "password",
    },
  } as const;

  const { isPending, submit } = useForgetPasswordHandler({ setErrorResponse });

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
        <InputField
          key={name}
          form={form}
          label={label}
          name={name}
          type={type}
        />
      ))}
      <ErrorAlert
        error={errorResponse}
        errorTitle={t("error")}
        errorDescriptionFallback={t("unknownError")}
        codeTransform={(code) => authErrors(code)}
      />
    </CustomForm>
  );
};

export default Form;
