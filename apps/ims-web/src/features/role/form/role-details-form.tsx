"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useEffect } from "react";
import { Form as CustomForm } from "@/components/form";
//----changeable
import {
  ErrorResponse,
  type RoleCreateForm,
  RoleErrorCodesType,
  roleCreateFormSchema as schema,
} from "@khaled/ims-shared";
import PermissionsMatrix from "@/features/role/form/permissionsMatrix";

const defaultValues = {
  name: "",
  description: "",
};

//----

type Props = {
  role?: RoleCreateForm & { id: string };
  error?: ErrorResponse<RoleErrorCodesType>;
  codeTransform?: (key: RoleErrorCodesType) => string;
  submit: (data: RoleCreateForm) => void;
  isLoading: boolean;
  roleFieldTranslations: (key: keyof RoleCreateForm) => string;
  formTitle: string;
};
const Form = ({
  role,
  error,
  submit,
  isLoading,
  roleFieldTranslations,
  formTitle,
  codeTransform,
}: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  //----changeable

  useEffect(() => {
    if (role) {
      form.reset({
        name: role?.name,
        description: role?.description || "",
      });
    }
  }, [role, form]);
  //--------------

  return (
    <CustomForm
      cardTitle={formTitle}
      getLabel={roleFieldTranslations}
      form={form}
      onSubmit={submit}
      isLoading={isLoading}
      error={error}
      codeTransform={codeTransform}
      fields={[
        {
          key: "name",
          content: {
            name: "name",
            type: "text",
          },

          spans: {
            base: 4,
            md: 2,
          },
        },
        {
          key: "description",
          content: {
            name: "description",
            type: "text",
          },

          spans: {
            base: 4,
            md: 2,
          },
        },
      ]}
    >
      <PermissionsMatrix />
    </CustomForm>
  );
};

export default Form;
