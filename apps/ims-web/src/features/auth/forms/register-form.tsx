"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { useTranslations } from "next-intl";
import CustomForm from "@workspace/ui/core/form/custom-form";
import InputField from "@workspace/ui/core/form/input-field";

//----changeable
import { otpSignUpBodySchema as schema } from "@khaled/ims-shared";
import { useRegisterHandler } from "@/features/auth/hooks/useRegsitrationHandler";

const defaultValues: z.infer<typeof schema> = {
  password: "",
  name: "",
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

  //---changeable
  const { isPending, submit } = useRegisterHandler();

  const formTitleFallback = t("registration");

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
        />
      ))}
    </CustomForm>
  );
};

export default Form;
