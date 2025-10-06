"use client";

import { useRequestOtp } from "@/api";
import { RequestOtp200, RequestOtpBody } from "@/api/model";

import { AuthErrorCodesType, ErrorResponse, OtpType } from "@khaled/ims-shared";
import { Dispatch, SetStateAction } from "react";

export type OtpRequestStorage = {
  identifier: string;
  otpType: OtpType;
  createdAt: number;
};
export function useRequestOtpHandler({
  otpType,
  onSuccess,
  setErrorResponse,
}: {
  otpType: OtpType;
  onSuccess?: (data: RequestOtp200) => void;
  setErrorResponse: Dispatch<
    SetStateAction<ErrorResponse<AuthErrorCodesType> | undefined>
  >;
}) {
  const { mutate: requestOtpMutate, isPending } = useRequestOtp({
    mutation: {
      onSuccess: (data, variables) => {
        const { identifier, otpType } = variables.data;
        // Store both identifier + otpType together to use later in VerifyOtp
        localStorage.setItem(
          "otpRequest",
          JSON.stringify({
            identifier,
            otpType,
            createdAt: Date.now(),
          })
        );
        console.log("Storing otp token:", data.token);
        localStorage.setItem("otpToken", data.token);

        onSuccess?.(data);
      },
      onError: (error) => {
        setErrorResponse(
          error.response?.data as ErrorResponse<AuthErrorCodesType>
        );
      },
    },
  });

  const submit = (data: Omit<RequestOtpBody, "otpType">) => {
    requestOtpMutate({ data: { ...data, otpType } });
  };

  return { submit, isPending };
}
