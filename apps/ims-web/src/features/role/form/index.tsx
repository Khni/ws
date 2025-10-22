"use client";
import { useUpsertRoleHandler } from "@/features/role/form/useUpsertRoleHandler";
import Form from "./role-details-form";
import { useRoleTranslations } from "@/features/role/translations/hooks/useRoleTrans";
import { ErrorResponse, RoleErrorCodesType } from "@khaled/ims-shared";
import { useState } from "react";

export const RoleForm = ({ id }: { id?: string }) => {
  const [error, setError] = useState<ErrorResponse<RoleErrorCodesType>>();
  const setErrorResponse = (_error: ErrorResponse<RoleErrorCodesType>) => {
    setError(_error);
  };
  const { submit, isPending } = useUpsertRoleHandler({ id, setErrorResponse });
  const {
    roleErrorTranslations,
    roleFieldTranslations,
    roleHeaderTranslations,
  } = useRoleTranslations();

  return (
    <Form
      submit={submit}
      isLoading={isPending}
      roleFieldTranslations={roleFieldTranslations}
      formTitle={roleHeaderTranslations("newRole")}
      error={error}
      codeTransform={roleErrorTranslations}
    />
  );
};
