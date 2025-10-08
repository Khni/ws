"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { useTranslations } from "next-intl";
import CustomForm from "@workspace/ui/core/form/custom-form";
import InputField from "@workspace/ui/core/form/input-field";

//----changeable
import {
  AuthErrorCodesType,
  ErrorResponse,
  otpSignUpBodySchema as schema,
} from "@khaled/ims-shared";
import { useRegisterHandler } from "@/features/auth/hooks/useSignUpHandler";
import { useState } from "react";
import { ErrorAlert } from "@workspace/ui/core/ErrorAlert";
import { getFieldErrors } from "@workspace/ui/core/getFieldErrors";

const defaultValues: z.infer<typeof schema> = {
  password: "",
  name: "",
};

//----

export type Props = {
  onNext: () => void;
  onBack: () => void;
};
const Form = ({}: Props) => {
  const t = useTranslations();

  const [errorResponse, setErrorResponse] =
    useState<ErrorResponse<AuthErrorCodesType>>();
  //---changeable
  const authErrors = useTranslations("auth.errors");
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  //---changeable
  const { isPending, submit } = useRegisterHandler({ setErrorResponse });

  const formTitleFallback = t("auth.form.signUp");

  const submitButtonTextFallBack = t("submitButton");

  const isLoadingTextFallBack = t("loading");
  const fields = {
    password: {
      label: t("passwordLabel"),
      name: "password",
      type: "password",
    },
    name: {
      label: t("name"),
      name: "name",
      type: "text",
    },
  } as const;

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
          errorResponse={errorResponse}
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
