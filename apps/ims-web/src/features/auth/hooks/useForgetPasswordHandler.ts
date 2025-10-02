"use client";

import { useResetForgettenPassword } from "@/api";

import { ROUTES } from "@/constants";
import { ResetForgettenPasswordInput } from "@khaled/ims-shared";
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
        onSuccess: () => {
          router.replace(ROUTES.auth.index);
        },
        onError: (error) => {
          console.error("ForgetPassword failed", error);
        },
      },
    }
  );

  const submit = (data: ResetForgettenPasswordInput) => {
    forgetPasswordMutate({ data });
  };

  return { submit, isPending };
}
