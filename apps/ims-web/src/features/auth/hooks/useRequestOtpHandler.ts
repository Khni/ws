"use client";

import { useRequestOtp } from "@/api";
import { RequestOtp200, RequestOtpBody } from "@/api/model";

import { OtpType } from "@khaled/ims-shared";

export type OtpRequestStorage = {
  identifier: string;
  otpType: OtpType;
  createdAt: number;
};
export function useRequestEmailOtpHandler({
  otpType,
  onSuccess,
}: {
  otpType: OtpType;
  onSuccess?: (data: RequestOtp200) => void;
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
        localStorage.setItem("otpToken", data.token);

        onSuccess?.(data);
      },
      onError: (error) => {
        console.error("RequestOtp failed", error);
      },
    },
  });

  const submit = (data: Omit<RequestOtpBody, "otpType">) => {
    requestOtpMutate({ data: { ...data, otpType } });
  };

  return { submit, isPending };
}
