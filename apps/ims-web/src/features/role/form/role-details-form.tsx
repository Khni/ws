"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

//----changeable
import {
  ErrorResponse,
  type RoleCreateForm,
  RoleErrorCodesType,
  roleCreateFormSchema as schema,
} from "@khaled/ims-shared";

const defaultValues = {
  name: "",
  description: "",
};

//----

import { useEffect, useState } from "react";

import CustomForm from "@workspace/ui/core/form/custom-form";
import { useUpsertRoleHandler } from "@/features/role/form/useUpsertRoleHandler";

type Props = {
  role?: RoleCreateForm & { id: string };
  getPlaceHolders?: (key: "submit" | "loading") => string;
  getFormTitle?: (key: "formTitle") => string;
};
const Form = ({
  role,
  getFormTitle = (key) => "Fill The Fields",
  getPlaceHolders: getText = (key) => key,
}: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const [errorResponse, setErrorResponse] =
    useState<ErrorResponse<RoleErrorCodesType>>();
  //----changeable
  const { submit, isPending } = useUpsertRoleHandler({ id: role?.id });
  useEffect(() => {
    if (role) {
      form.reset({
        name: role?.name,
        description: role?.description || "",
      });
    }
  }, [role, form]);
  //--------------

  const formTitleFallback = getFormTitle("formTitle");

  const submitButtonTextFallBack = getText("submit");

  const isLoadingTextFallBack = getText("loading");
  return (
    <CustomForm
      cardTitle={formTitleFallback}
      submitButtonText={submitButtonTextFallBack}
      form={form}
      onSubmit={submit}
      isLoadingText={isLoadingTextFallBack}
      isLoading={isPending}
      fields={[
        {
          key: "name",
          content: { name: "name", label: "name", form: form, type: "text" },

          spans: {
            base: 4,
            md: 2,
          },
        },
        {
          key: "description",
          content: {
            name: "description",
            label: "description",
            form: form,
            type: "text",
          },

          spans: {
            base: 4,
            md: 2,
          },
        },
      ]}
    >
      <></>
    </CustomForm>
  );
};

export default Form;
