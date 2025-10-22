import { CreateRoleMutationBody, useCreateRole, useUpdateRole } from "@/api";
import { useRoleTranslations } from "@/features/role/translations/hooks/useRoleTrans";
import { useSelectedOrganizationContext } from "@/providers/selected-org-provider";
import {
  ErrorResponse,
  RoleCreateForm,
  RoleErrorCodesType,
} from "@khaled/ims-shared";

import { useToast } from "@workspace/ui/components/use-toast";
import { useCommonTranslations } from "messages/common/hooks/useCommonTranslations";

export const useUpsertRoleHandler = ({
  id,
  setErrorResponse,
}: {
  id?: string;
  setErrorResponse: (_error: ErrorResponse<RoleErrorCodesType>) => void;
}) => {
  const { toast } = useToast();
  const { msgTranslations } = useCommonTranslations();
  const { roleHeaderTranslations } = useRoleTranslations();
  const onSuccess = () => {
    toast({
      title: msgTranslations("added", {
        thing: roleHeaderTranslations("role"),
      }),
    });
  };
  const { selectedOrganizationId } = useSelectedOrganizationContext();
  if (!selectedOrganizationId) {
    throw new Error("selectedOrganizationId is undefiend");
  }
  const { mutate: createMutate, isPending: isPendingCreate } = useCreateRole({
    mutation: {
      onSuccess,
      onError: (error: {
        response: { data: ErrorResponse<RoleErrorCodesType> };
      }) => {
        const err = error.response.data as ErrorResponse<RoleErrorCodesType>;
        setErrorResponse(err);
      },
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
