import { useTranslations } from "next-intl";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import LoginForm from "./forms/login/login-form";
import SignUpForm from "./forms/sign-up/signup-steps-form";
export default function Auth() {
  const t = useTranslations();
  return (
    <Tabs className="md:w-1/3 " defaultValue="SignIn">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="SignIn">{t("signIn")}</TabsTrigger>
        <TabsTrigger value="SignUp">{t("signUp")}</TabsTrigger>
      </TabsList>

      <TabsContent value="SignIn">
        <LoginForm />
      </TabsContent>

      <TabsContent value="SignUp">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  );
}
