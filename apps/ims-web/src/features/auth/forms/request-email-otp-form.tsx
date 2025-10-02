"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { useTranslations } from "next-intl";
import CustomForm from "@workspace/ui/core/form/custom-form";
import InputField from "@workspace/ui/core/form/input-field";

import { useRequestEmailOtpHandler } from "@/features/auth/hooks/useRequestOtpHandler";
import { OtpType } from "@khaled/ims-shared";

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
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

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
  const { isPending, submit } = useRequestEmailOtpHandler({
    otpType: otpType,
    onSuccess: () => onNext(),
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
