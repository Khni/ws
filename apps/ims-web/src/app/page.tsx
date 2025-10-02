"use client";
import { Navbar } from "@workspace/ui/blocks/layout/navbar";
import { useUserPreferencesContext } from "@workspace/ui/blocks/providers/UserPreferencesContext";
import { Button } from "@workspace/ui/components/button";
import LanguageSwitcher from "@workspace/ui/core/settings/langauge-switcher";
import { ModeToggle } from "@workspace/ui/core/settings/mode-toggle";
import { AppleIcon, HomeIcon, LogInIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import DashboardButton from "@/components/buttons/dashboard-btn";
import UserButton from "@/components/buttons/user-btn";
import { useAuthenticatedProfile } from "@/features/auth/hooks/useAuthenticatedProfileHandler";
import LoadingPage from "@workspace/ui/core/loading/loading-page";
import { useGetProfile } from "@/api";

export default function HomePage() {
  const { locale, updateLocale, rtl } = useUserPreferencesContext();
  const { setTheme } = useTheme();
  const t = useTranslations();
  const { user, isLoading } = useAuthenticatedProfile();

  return (
    <>
      <Navbar
        end={
          <>
            <UserButton user={user} isLoading={isLoading} />
            <DashboardButton user={user} isLoading={isLoading} />
            <ModeToggle setTheme={setTheme} />
            <LanguageSwitcher locale={locale} updateLocale={updateLocale} />
          </>
        }
      />

      <div className="flex flex-1 flex-col gap-4 p-4">{t("home")}</div>
    </>
  );
}
