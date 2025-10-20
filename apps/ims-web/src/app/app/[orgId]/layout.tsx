"use client";
import { CustomLayout } from "@workspace/ui/blocks/layout/custom-layout";
import { NavMain } from "@workspace/ui/blocks/layout/nav-main";

import { Switcher } from "@workspace/ui/blocks/layout/switcher";
import { ReactNode, useEffect, useState } from "react";
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
import { useRouter, usePathname } from "next/navigation";

import { redirect } from "next/navigation";
import { ROUTES } from "@/constants";
import LoadingPage from "@workspace/ui/core/loading/loading-page";
import { useAuthenticatedProfile } from "@/features/auth/hooks/useAuthenticatedProfileHandler";
import UserButton from "@/components/buttons/user-btn";
import { UserNav } from "@workspace/ui/blocks/layout/nav-user";
import { useGetOwnedOrganizations } from "@/api";
import { useSelectedOrganizationContext } from "@/providers/selected-org-provider";
import { menuData } from "@/features/sidebar/data";
import React from "react";

export default function WorkSpaceLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = React.use(params);
  const pathName = usePathname();
  const { locale, updateLocale, rtl } = useUserPreferencesContext();
  const { setTheme } = useTheme();
  const router = useRouter();
  const { user, isLoading } = useAuthenticatedProfile();
  const { data: organizations } = useGetOwnedOrganizations();
  const { selectedOrganizationId, setSelectedOrganizationId } =
    useSelectedOrganizationContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoadingPage />;
  }
  if (!selectedOrganizationId) {
    throw new Error("selectedOrganizationId is undefiend");
  }
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
          initialSelectedItem={organizations?.find(
            (org) => org.id === selectedOrganizationId
          )}
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
          <NavMain
            onSubItemClick={(subitem) =>
              router.replace(
                subitem.url.replace(":orgId", selectedOrganizationId)
              )
            }
            isSubItemActive={(subItem) =>
              pathName.includes(subItem.title.toLowerCase())
            }
            isItemActive={(item) =>
              !!item.items?.find((subItem) =>
                pathName.includes(subItem.title.toLowerCase())
              )
            }
            items={menuData}
          />
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
