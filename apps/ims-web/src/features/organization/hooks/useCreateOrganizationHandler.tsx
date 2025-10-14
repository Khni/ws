import { CreateOrgnizationMutationBody, useCreateOrgnization } from "@/api";
import { ROUTES } from "@/constants";
import { useSelectedOrganizationContext } from "@/providers/selected-org-provider";
import {
  ErrorResponse,
  OrganizationCreateBody,
  OrganizationErrorCodesType,
} from "@khaled/ims-shared";
import { useToast } from "@workspace/ui/components/use-toast";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export function useCreateOrgnizationHanler({
  setErrorResponse,
}: {
  setErrorResponse: Dispatch<
    SetStateAction<ErrorResponse<OrganizationErrorCodesType> | undefined>
  >;
}) {
  const { setSelectedOrganizationId } = useSelectedOrganizationContext();
  const router = useRouter();
  const { toast } = useToast();
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const {
    data: organization,
    isPending,
    mutate,
  } = useCreateOrgnization({
    mutation: {
      onSuccess: (data) => {
        toast({
          title: "Organization created",
          description: `Organization ${data.name} has been created successfully`,
        });
        setSelectedOrganizationId(data.id);
        router.push(ROUTES.app.index(data.id));
      },
      onError: (error: any) => {
        const err = error.response
          .data as ErrorResponse<OrganizationErrorCodesType>;
        setErrorResponse(err);
        console.error("Login failed", error.response.data);
      },
    },
    request: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  });
  const submit = (data: CreateOrgnizationMutationBody) => {
    mutate({ data });
  };

  return { submit, isPending };
}
