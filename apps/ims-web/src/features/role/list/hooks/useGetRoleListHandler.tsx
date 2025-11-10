import { useRoleList } from "@/api";
import { useSelectedOrganizationContext } from "@/providers/selected-org-provider";
import { use } from "react";

export const useGetRoleListHandler = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const { selectedOrganizationId } = useSelectedOrganizationContext();
  const { data: roleList, isPending } = useRoleList(
    { organizationId: selectedOrganizationId || "" },
    {
      request: {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      },
    }
  );

  return { roleList, isPending };
};
