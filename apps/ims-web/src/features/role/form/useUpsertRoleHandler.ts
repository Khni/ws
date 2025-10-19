import { CreateRoleMutationBody, useCreateRole, useUpdateRole } from "@/api";
import { CreateRole200 } from "@/api/model";
import {
  selectedOrganizationContext,
  useSelectedOrganizationContext,
} from "@/providers/selected-org-provider";
import { RoleCreateBody, RoleCreateForm } from "@khaled/ims-shared";
import { MutationFunctionContext } from "@tanstack/react-query";
import { useToast } from "@workspace/ui/components/use-toast";

export const useUpsertRoleHandler = ({ id }: { id?: string }) => {
  const { toast } = useToast();
  const onSuccess = (
    data: CreateRole200,
    variables: { data: RoleCreateBody },
    onMutateResult: unknown,
    context: MutationFunctionContext
  ) => {
    toast({ title: `Role: ${data.name} has been created successfully` });
  };
  const { selectedOrganizationId } = useSelectedOrganizationContext();
  if (!selectedOrganizationId) {
    throw new Error("selectedOrganizationId is undefiend");
  }
  const { mutate: createMutate, isPending: isPendingCreate } = useCreateRole({
    mutation: {
      onSuccess,
    },
  });
  const { mutate: updateMutate, isPending: isPendingUpdate } = useUpdateRole();

  const submit = (_data: RoleCreateForm) => {
    const data: CreateRoleMutationBody = {
      ..._data,
      organizationId: selectedOrganizationId,
      permissions: [],
    };
    if (id) {
      updateMutate({ data, id });
    } else {
      createMutate({ data });
    }
  };
  const isPending = isPendingCreate || isPendingUpdate;

  return { submit, isPending };
};
