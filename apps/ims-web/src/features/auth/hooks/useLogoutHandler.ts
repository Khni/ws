"use client";

import { useLogout } from "@/api";
import { ROUTES } from "@/constants";
import { useToast } from "@workspace/ui/components/use-toast";

export function useLogoutHandler() {
  const { toast } = useToast();
  const { mutate: logoutMutate, isPending } = useLogout({
    mutation: {
      onSuccess: (data) => {
        toast({
          title: "You logged out successfully",
        });

        location.reload();
      },
      onError: (error) => {
        console.error("logout failed", error);
      },
    },
  });

  const submit = () => {
    localStorage.removeItem("accessToken");
    logoutMutate({ data: {} });
  };

  return { submit, isPending };
}
