"use client";

import { useRoleTranslations } from "@/features/role/translations/hooks/useRoleTrans";
import { createColumns } from "@/components/global/custom-columns";
import { RoleList200Item } from "@/api/model";

export const RoleColumns = () => {
  const { roleColumnHeaderTranslations } = useRoleTranslations();
  return createColumns<RoleList200Item>({
    columns: [
      {
        key: "name",
      },
      {
        key: "description",
      },
    ],
    getHeader: roleColumnHeaderTranslations as (
      key: keyof RoleList200Item
    ) => string,
  });
};
