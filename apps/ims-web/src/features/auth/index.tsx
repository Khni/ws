import { useTranslations } from "next-intl";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import LoginForm from "./forms/login/login-form";
import Registration from "./forms/registration-steps-form";
export default function Auth() {
  const t = useTranslations();
  return (
    <Tabs className="w-full h-full px-2 md:w-2/4" defaultValue="SignIn">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="SignIn">{t("signIn")}</TabsTrigger>
        <TabsTrigger value="SignUp">{t("signUp")}</TabsTrigger>
      </TabsList>

      <TabsContent value="SignIn">
        <LoginForm />
      </TabsContent>

      <TabsContent value="SignUp">
        <Registration />
      </TabsContent>
    </Tabs>
  );
}
