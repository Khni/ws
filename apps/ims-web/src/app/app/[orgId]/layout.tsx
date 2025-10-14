"use client";
import { CustomLayout } from "@workspace/ui/blocks/layout/custom-layout";
import { NavMain } from "@workspace/ui/blocks/layout/nav-main";

import { Switcher } from "@workspace/ui/blocks/layout/switcher";
import { ReactNode } from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  HomeIcon,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { ModeToggle } from "@workspace/ui/core/settings/mode-toggle";
import LanguageSwitcher from "@workspace/ui/core/settings/langauge-switcher";
import { useUserPreferencesContext } from "@workspace/ui/blocks/providers/UserPreferencesContext";
import { useTheme } from "next-themes";
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";

import { redirect } from "next/navigation";
import { ROUTES } from "@/constants";
import LoadingPage from "@workspace/ui/core/loading/loading-page";
import { useAuthenticatedProfile } from "@/features/auth/hooks/useAuthenticatedProfileHandler";
import UserButton from "@/components/buttons/user-btn";
import { UserNav } from "@workspace/ui/blocks/layout/nav-user";
import { useGetOwnedOrganizations } from "@/api";
import { useSelectedOrganizationContext } from "@/providers/selected-org-provider";

export default function WorkSpaceLayout({ children }: { children: ReactNode }) {
  const { locale, updateLocale, rtl } = useUserPreferencesContext();
  const { setTheme } = useTheme();
  const router = useRouter();
  const { user, isLoading } = useAuthenticatedProfile();
  const { data: organizations } = useGetOwnedOrganizations();
  const { selectedOrganizationId, setSelectedOrganizationId } =
    useSelectedOrganizationContext();
  if (isLoading) {
    return <LoadingPage />;
  }
  if (!user) {
    redirect(ROUTES.auth.index);
  }

  return (
    <CustomLayout
      rtl={rtl}
      collapsible="icon"
      sidebarHeader={
        <Switcher
          onItemSelect={(id) => {
            const found = organizations?.find((org) => org.id === id);
            if (found) {
              router.replace(ROUTES.app.index(id));
            }
            setSelectedOrganizationId(id);
          }}
          initialSelectedItem={
            organizations?.find((org) => org.id === selectedOrganizationId) ||
            undefined
          }
          items={
            organizations?.map((org) => ({
              name: org.name,
              description: org.description || "Admin",
              //  logo: HomeIcon,
              id: org.id,
            })) || []
          }
          // TODO: Pass the correct prop for selection if Switcher supports it
          onAddClick={() => router.push(ROUTES.app.create_org)}
        />
      }
      sidebarContent={
        <>
          <NavMain items={[]} />
        </>
      }
      sidebarFooter={
        <UserNav
          sections={{
            account: { enabled: true },
            notifications: { enabled: true },
          }}
          user={user}
        />
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
      end={
        <>
          <UserButton user={user} isLoading={isLoading} />
          <ModeToggle setTheme={setTheme} />
          <LanguageSwitcher locale={locale} updateLocale={updateLocale} />
        </>
      }
    >
      {children}
    </CustomLayout>
  );
}
