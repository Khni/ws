"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

//----changeable
import {
  ErrorResponse,
  RoleErrorCodesType,
  roleCreateFormSchema as schema,
} from "@khaled/ims-shared";

const defaultValues = {
  name: "",
  description: "",
};

//----

import { useState } from "react";

import CustomForm from "@workspace/ui/core/form/custom-form";
import { useCreateRole } from "@/api";

const Form = () => {
  const [errorResponse, setErrorResponse] =
    useState<ErrorResponse<RoleErrorCodesType>>();
  //----changeable
  const { mutate, isPending } = useCreateRole();

  //--------------
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const formTitleFallback = "Create New Role";

  const submitButtonTextFallBack = "Submit";

  const isLoadingTextFallBack = "Loading...";
  return (
    <CustomForm
      cardTitle={formTitleFallback}
      submitButtonText={submitButtonTextFallBack}
      form={form}
      onSubmit={(data) =>
        mutate({ data: { ...data, organizationId: "", permissions: [] } })
      }
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
