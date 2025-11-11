import { RoleColumns } from "@/features/role/list/components/columns";
import { useGetRoleListHandler } from "@/features/role/list/hooks/useGetRoleListHandler";
import { DataTable } from "@workspace/ui/core/data-table";
export const RoleDataTable = () => {
  const { roleList, isPending } = useGetRoleListHandler();
  if (!roleList) {
    return null;
  }

  return <DataTable columns={RoleColumns()} data={roleList} />;
};
