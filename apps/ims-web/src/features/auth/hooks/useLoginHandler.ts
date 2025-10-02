"use client";

import { useLogin } from "@/api";
import { LocalLoginInput } from "@/api/model";
import { useAuthSuccessHandler } from "@/features/auth/hooks/helpers/useAuthSuccessHandler";

export function useLoginHandler() {
  const onAuthSuccess = useAuthSuccessHandler();

  const { mutate: loginMutate, isPending } = useLogin({
    mutation: {
      onSuccess: (data) => {
        onAuthSuccess(data, {
          toastTitle: (user) => `Welcome back, ${user.name}!`,
          toastDescription: (user) =>
            `You have logged in successfully with : ${user.identifier}`,
        });
      },
      onError: (error) => {
        console.error("Login failed", error);
      },
    },
  });

  const submit = (data: LocalLoginInput) => {
    loginMutate({ data });
  };

  return { submit, isPending };
}
