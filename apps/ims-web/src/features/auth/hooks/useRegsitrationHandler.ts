"use client";

import { useSignUp } from "@/api";
import { useAuthSuccessHandler } from "@/features/auth/hooks/helpers/useAuthSuccessHandler";
import { LocalRegisterInput } from "@khaled/ims-shared";

export function useRegisterHandler() {
  const onAuthSuccess = useAuthSuccessHandler();

  const otpToken = localStorage.getItem("otpToken");
  const { mutate: registerMutate, isPending } = useSignUp({
    request: {
      headers: {
        Authorization: otpToken ? `Bearer ${otpToken}` : "",
      },
    },
    mutation: {
      onSuccess: (data) => {
        onAuthSuccess(data, {
          toastTitle: (user) => `Welcome aboard, ${user.name}!`,
          toastDescription: (user) =>
            `Your account has been created successfully with: ${user.identifier}`,
        });
      },
      onError: (error) => {
        console.error("Registration failed", error);
      },
    },
  });

  const submit = (data: LocalRegisterInput) => {
    registerMutate({ data });
  };

  return { submit, isPending };
}
