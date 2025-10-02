"use client";

import { ROUTES } from "@/constants";
import { useAuthenticatedProfile } from "@/features/auth/hooks/useAuthenticatedProfileHandler";
import { Navbar } from "@workspace/ui/blocks/layout/navbar";
import { useUserPreferencesContext } from "@workspace/ui/blocks/providers/UserPreferencesContext";
import { Button } from "@workspace/ui/components/button";
import LoadingPage from "@workspace/ui/core/loading/loading-page";
import LanguageSwitcher from "@workspace/ui/core/settings/langauge-switcher";
import { ModeToggle } from "@workspace/ui/core/settings/mode-toggle";
import { HomeIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { redirect, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function LoginPage({ children }: { children: ReactNode }) {
  const { locale, updateLocale, rtl } = useUserPreferencesContext();
  const { setTheme } = useTheme();
  const router = useRouter();

  const { user, isLoading } = useAuthenticatedProfile();
  if (isLoading) {
    return <LoadingPage />;
  }
  if (user) {
    redirect(ROUTES.app);
  }
  // Use a flex column layout with h-screen to avoid scroll caused by h-screen on content.
  // The Navbar has a fixed height, and the content area uses flex-1 to fill the remaining space.
  // This prevents double height from h-screen + Navbar and ensures proper vertical spacing.

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
            onClick={() => router.replace("/")}
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
