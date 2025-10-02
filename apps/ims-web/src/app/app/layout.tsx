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

export default function WorkSpaceLayout({ children }: { children: ReactNode }) {
  const { locale, updateLocale, rtl } = useUserPreferencesContext();
  const { setTheme } = useTheme();
  const router = useRouter();
  const { user, isLoading } = useAuthenticatedProfile();
  if (isLoading) {
    return <LoadingPage />;
  }
  if (!user) {
    redirect(ROUTES.auth.index);
  }
  const data = {
    user: {
      firstName: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        description: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        description: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        description: "Free",
      },
    ],
    navMain: [
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };
  return (
    <CustomLayout
      rtl={rtl}
      collapsible="icon"
      sidebarHeader={
        <Switcher
          items={data.teams}
          onAddClick={() => console.log("OnAddClick")}
        />
      }
      sidebarContent={
        <>
          <NavMain items={data.navMain} />
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
          onClick={() => router.replace("/")}
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
