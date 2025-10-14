"use client";

import { ROUTES } from "@/constants";
import { AuthResponseType } from "@khaled/ims-shared";
import { useToast } from "@workspace/ui/components/use-toast";
import { useRouter } from "next/navigation";

type AuthSuccessOptions = {
  toastTitle: (user: AuthResponseType["user"]) => string;
  toastDescription: (user: AuthResponseType["user"]) => string;
  redirectTo?: string;
};

export function useAuthSuccessHandler() {
  const router = useRouter();
  const { toast } = useToast();

  return (data: AuthResponseType, options: AuthSuccessOptions) => {
    const { tokens, user } = data;

    // Store token
    localStorage.setItem("accessToken", tokens.accessToken);

    // Redirect (defaults to app home)
    location.reload();

    // Toast
    toast({
      title: options.toastTitle(user),
      description: options.toastDescription(user),
    });
  };
}
