"use client";
import { useEffect } from "react";
import { useGetOwnedOrganizations } from "@/api";
import CreateOrganizationForm from "@/features/organization/forms/create-organization-form";
import { useSelectedOrganizationContext } from "@/providers/selected-org-provider";
import { useRouter } from "next/navigation";
import ComboBox from "@workspace/ui/core/combo-box";
import UserButton from "@/components/buttons/user-btn";
import { Navbar } from "@workspace/ui/blocks/layout/navbar";
import { Button } from "@workspace/ui/components/button";
import LanguageSwitcher from "@workspace/ui/core/settings/langauge-switcher";
import { ModeToggle } from "@workspace/ui/core/settings/mode-toggle";
import { HomeIcon } from "lucide-react";
import { useAuthenticatedProfile } from "@/features/auth/hooks/useAuthenticatedProfileHandler";
import LoadingPage from "@workspace/ui/core/loading/loading-page";
import { ROUTES } from "@/constants";
import { useUserPreferencesContext } from "@workspace/ui/blocks/providers/UserPreferencesContext";
import { useTheme } from "next-themes";

import { ReactNode } from "react";
import Auth from "@/features/auth";

interface NavbarProps {
  children?: ReactNode;
}

export default function NavbarLayout({ children }: NavbarProps) {
  const router = useRouter();

  const { user, isLoading } = useAuthenticatedProfile();
  const { locale, updateLocale, rtl } = useUserPreferencesContext();
  const { setTheme } = useTheme();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar
          end={
            <>
              <ModeToggle setTheme={setTheme} />
              <LanguageSwitcher locale={locale} updateLocale={updateLocale} />
            </>
          }
          start={
            <Button
              onClick={() => router.replace(ROUTES.home)}
              variant="outline"
              size="icon"
              className="cursor-pointer"
            >
              <HomeIcon />
            </Button>
          }
        />
        <div className="flex-1 flex flex-col gap-4 bg-muted items-center justify-center p-6 md:p-4">
          <Auth />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        end={
          <>
            <UserButton user={user} isLoading={isLoading} />
            <ModeToggle setTheme={setTheme} />
            <LanguageSwitcher locale={locale} updateLocale={updateLocale} />
          </>
        }
        start={
          <Button
            onClick={() => router.replace(ROUTES.home)}
            variant="outline"
            size="icon"
            className="cursor-pointer"
          >
            <HomeIcon />
          </Button>
        }
      />
      <div className="flex-1 flex flex-col gap-4 bg-muted items-center justify-center p-6 md:p-4">
        {children}
      </div>
    </div>
  );
}
