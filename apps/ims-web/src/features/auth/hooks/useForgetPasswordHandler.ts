"use client";

import { useResetForgettenPassword } from "@/api";

import { ROUTES } from "@/constants";
import {
  AuthErrorCodesType,
  ErrorResponse,
  ResetForgettenPasswordInput,
} from "@khaled/ims-shared";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { set } from "zod";

export function useForgetPasswordHandler({
  setErrorResponse,
}: {
  setErrorResponse: Dispatch<
    SetStateAction<ErrorResponse<AuthErrorCodesType> | undefined>
  >;
}) {
  const router = useRouter();
  const otpToken = localStorage.getItem("otpToken");
  const { mutate: forgetPasswordMutate, isPending } = useResetForgettenPassword(
    {
      request: {
        headers: {
          Authorization: otpToken ? `Bearer ${otpToken}` : "",
        },
      },
      mutation: {
        onSuccess: () => {
          router.replace(ROUTES.auth.index);
        },
        onError: (error) => {
          setErrorResponse(
            error.response?.data as ErrorResponse<AuthErrorCodesType>
          );
        },
      },
    }
  );

  const submit = (data: ResetForgettenPasswordInput) => {
    forgetPasswordMutate({ data });
  };

  return { submit, isPending };
}
