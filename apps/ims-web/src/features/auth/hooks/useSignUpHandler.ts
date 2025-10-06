"use client";

import { useSignUp } from "@/api";
import { useAuthSuccessHandler } from "@/features/auth/hooks/helpers/useAuthSuccessHandler";
import {
  AuthErrorCodesType,
  ErrorResponse,
  LocalRegisterInput,
} from "@khaled/ims-shared";
import { Dispatch, SetStateAction } from "react";

export function useRegisterHandler({
  setErrorResponse,
}: {
  setErrorResponse: Dispatch<
    SetStateAction<ErrorResponse<AuthErrorCodesType> | undefined>
  >;
}) {
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
        setErrorResponse(
          error.response?.data as ErrorResponse<AuthErrorCodesType>
        );
      },
    },
  });

  const submit = (data: LocalRegisterInput) => {
    registerMutate({ data });
  };

  return { submit, isPending };
}
