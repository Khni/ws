"use client";
import { RoleList200Item } from "@/api/model";
import { RoleColumns } from "@/features/role/list/components/columns";
import { useGetRoleListHandler } from "@/features/role/list/hooks/useGetRoleListHandler";
import { useRoleTranslations } from "@/features/role/translations/hooks/useRoleTrans";
import { DataTable } from "@workspace/ui/core/data-table";
export const RoleDataTable = () => {
  const { roleColumnHeaderTranslations } = useRoleTranslations();
  const { roleList, isPending } = useGetRoleListHandler();
  if (!roleList) {
    return null;
  }

  return (
    <DataTable
      columns={RoleColumns({
        getHeader: roleColumnHeaderTranslations as (
          key: keyof RoleList200Item
        ) => string,
      })}
      data={roleList}
    />
  );
};
