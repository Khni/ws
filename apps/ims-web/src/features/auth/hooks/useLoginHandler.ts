"use client";

import { useLogin } from "@/api";
import { LocalLoginInput } from "@/api/model";
import { useAuthSuccessHandler } from "@/features/auth/hooks/helpers/useAuthSuccessHandler";
import { Dispatch, SetStateAction } from "react";
import { parseServerError } from "@khaled/utils";
import { ErrorResponse } from "@/components/ErrorAlert";
export function useLoginHandler({
  setErrorResponse,
}: {
  setErrorResponse: Dispatch<unknown>;
}) {
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
      onError: (error: any) => {
        const err = error.response.data as ErrorResponse;
        setErrorResponse(err);
        console.error("Login failed", error.response.data);
      },
    },
  });

  const submit = (data: LocalLoginInput) => {
    loginMutate({ data });
  };

  return { submit, isPending };
}
