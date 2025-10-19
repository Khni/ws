import { useCreateRole, useUpdateRole } from "@/api";

export const useUpsertRoleHandler = ({ roleId }: { roleId: string }) => {
  const {} = useCreateRole();
  const {} = useUpdateRole();
};
