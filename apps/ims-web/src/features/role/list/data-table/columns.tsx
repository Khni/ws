"use client";

import { RoleList200Item } from "@/api/model";
import { useRoleTranslations } from "@/features/role/translations/hooks/useRoleTrans";
import { ColumnDef } from "@tanstack/react-table";

export const CustomerColumns = (): ColumnDef<RoleList200Item>[] => {
  const { roleColumnHeaderTranslations } = useRoleTranslations();
  return [
    {
      accessorKey: "name",
      header: roleColumnHeaderTranslations("name"),
      cell: ({ row }) => {
        const name: RoleList200Item["name"] = row.getValue("name");
        return <div>{name}</div>;
      },
    },
    {
      accessorKey: "description",
      header: roleColumnHeaderTranslations("description"),
      cell: ({ row }) => {
        const desc: RoleList200Item["description"] =
          row.getValue("description");
        return <div>{desc}</div>;
      },
    },
  ];
};
