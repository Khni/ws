"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { useTranslations } from "next-intl";
import CustomForm from "@workspace/ui/core/form/custom-form";
import InputField from "@workspace/ui/core/form/input-field";

//----changeable
import { SocialButtons } from "@workspace/ui/core/social-buttons";
import { FacebookOAuthURLStrategy } from "@workspace/ui/lib/oauth/url/FacebookOAuthURLStrategy";
import { GoogleOAuthURLStrategy } from "@workspace/ui/lib/oauth/url/GoogleOAuthURLStrategy";
import { OAuthContext } from "@workspace/ui/lib/oauth/url/OAuthContext";
import {
  AuthErrorCodesType,
  ErrorResponse,
  loginBodySchema as schema,
} from "@khaled/ims-shared";
import { useLoginHandler } from "@/features/auth/hooks/useLoginHandler";

import Link from "next/link";
import { ROUTES } from "@/constants";
import { useState } from "react";
import { ErrorAlert } from "@workspace/ui/core/ErrorAlert";

const defaultValues = {
  identifier: "",
  password: "",
};

//----

const Form = () => {
  const t = useTranslations();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  //---changeable
  const authErrors = useTranslations("auth.errors");

  const formTitleFallback = t("login");
  const [errorResponse, setErrorResponse] =
    useState<ErrorResponse<AuthErrorCodesType>>();

  const submitButtonTextFallBack = t("submitButton");

  const isLoadingTextFallBack = t("loading");
  const fields = {
    email: {
      label: t("emailLabel"),
      name: "identifier",
      type: "text",
    },
    password: {
      label: t("passwordLabel"),
      name: "password",
      type: "password",
    },
  } as const;

  const { isPending, submit } = useLoginHandler({ setErrorResponse });

  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return <LoadingPage />;
  // }

  //social buttons urls
  const googleStrategy = new GoogleOAuthURLStrategy(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!
  );
  const context = new OAuthContext(googleStrategy);

  const googleUrl = context.buildAuthURL();

  // Switch to Facebook
  const fbStrategy = new FacebookOAuthURLStrategy(
    process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
    process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI!
  );
  context.setStrategy(fbStrategy);

  const fbUrl = context.buildAuthURL();

  //---

  return (
    <CustomForm
      cardTitle={formTitleFallback}
      submitButtonText={submitButtonTextFallBack}
      form={form}
      onSubmit={submit}
      isLoadingText={isLoadingTextFallBack}
      isLoading={isPending}
    >
      {Object.values(fields).map(({ label, name, type }) => (
        <InputField
          key={name}
          form={form}
          label={label}
          name={name}
          type={type}
        />
      ))}

      <div className="flex items-center">
        <Link
          href={ROUTES.auth.forget_password}
          className="ml-auto text-sm underline-offset-2 hover:underline"
        >
          {t("auth.form.forgetPassword")}
        </Link>
      </div>

      <SocialButtons
        providers={{ google: { url: googleUrl }, facebook: { url: fbUrl } }}
      />
      <ErrorAlert
        errorTitle={t("error")}
        errorDescriptionFallback={t("unknownError")}
        error={errorResponse}
        codeTransform={(code) => authErrors(code)}
      />
    </CustomForm>
  );
};

export default Form;
