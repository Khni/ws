"use client";

import { useRoleTranslations } from "@/features/role/translations/hooks/useRoleTrans";
import {
  createColumns,
  CreateColumnsProps,
} from "@/components/global/custom-columns";
import { RoleList200Item } from "@/api/model";

export const RoleColumns = ({
  getHeader,
}: Pick<CreateColumnsProps<RoleList200Item>, "getHeader">) => {
  return createColumns<RoleList200Item>({
    columns: [
      {
        key: "name",
      },
      {
        key: "description",
      },
    ],
    getHeader,
  });
};
