"use client";

import { useVerifyOtp } from "@/api";
import { VerifyOtp200, VerifyOtpBody } from "@/api/model";
import { ErrorResponse, AuthErrorCodesType } from "@khaled/ims-shared";
import { Dispatch, SetStateAction } from "react";

export function useVerifyOtpHandler({
  onSuccess,
  setErrorResponse,
}: {
  onSuccess?: (data: VerifyOtp200) => void;
  setErrorResponse: Dispatch<
    SetStateAction<ErrorResponse<AuthErrorCodesType> | undefined>
  >;
}) {
  const { mutate: verifyOtpMutate, isPending } = useVerifyOtp({
    request: {
      headers: {
        // Attach the otpToken from localStorage if it exists
        Authorization: localStorage.getItem("otpToken")
          ? `Bearer ${localStorage.getItem("otpToken")}`
          : "",
      },
    },
    mutation: {
      onSuccess: (data) => {
        const token = data.token;
        localStorage.setItem("otpToken", token);
        onSuccess?.(data);
      },
      onError: (error) => {
        setErrorResponse(
          error.response?.data as ErrorResponse<AuthErrorCodesType>
        );
        console.error("OTP verification failed", error);
      },
    },
  });

  const submit = (data: VerifyOtpBody) => {
    verifyOtpMutate({ data });
  };

  return { submit, isPending };
}
