"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { useTranslations } from "next-intl";
import CustomForm from "@workspace/ui/core/form/custom-form";
import InputField from "@workspace/ui/core/form/input-field";

//----changeable
import { resetForgettenPasswordBodySchema as schema } from "@khaled/ims-shared";
import { useForgetPasswordHandler } from "@/features/auth/hooks/useForgetPasswordHandler";

const defaultValues = {
  newPassword: "",
  confirmNewPassword: "",
};

//----

const Form = () => {
  const t = useTranslations();
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

  const { isPending, submit } = useForgetPasswordHandler();

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
    </CustomForm>
  );
};

export default Form;
