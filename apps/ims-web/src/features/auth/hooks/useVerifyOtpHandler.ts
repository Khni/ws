"use client";

import { useVerifyOtp } from "@/api";
import { VerifyOtp200, VerifyOtpBody } from "@/api/model";

export function useVerifyOtpHandler({
  onSuccess,
}: {
  onSuccess?: (data: VerifyOtp200) => void;
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
        console.error("VerifyOtp failed", error);
      },
    },
  });

  const submit = (data: VerifyOtpBody) => {
    verifyOtpMutate({ data });
  };

  return { submit, isPending };
}
