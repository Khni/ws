"use client";

import { useResetForgettenPassword } from "@/api";
import { ForgetPasswordInput } from "@/api/model/forgetPasswordInput";

import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";

export function useForgetPasswordHandler() {
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
        onSuccess: (data) => {
          router.replace(ROUTES.auth.index);
        },
        onError: (error) => {
          console.error("ForgetPassword failed", error);
        },
      },
    }
  );

  const submit = (data: ForgetPasswordInput) => {
    forgetPasswordMutate({ data });
  };

  return { submit, isPending };
}
