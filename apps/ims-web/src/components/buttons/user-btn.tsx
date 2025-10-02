"use client";

import { UserResponseType } from "@/api/model";
import { ROUTES } from "@/constants";
import { useLogoutHandler } from "@/features/auth/hooks/useLogoutHandler";
import { UserNav } from "@workspace/ui/blocks/layout/nav-user";

import { Button } from "@workspace/ui/components/button";
import Loading from "@workspace/ui/core/loading/loading";

import { LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export type UserButtonProps = {
  user: UserResponseType | undefined;
  isLoading: boolean;
};
export default function UserButton({ user, isLoading }: UserButtonProps) {
  const router = useRouter();
  if (isLoading) {
    <Button variant="outline" size="icon" className="cursor-pointer">
      <Loading />
    </Button>;
  }
  if (!user) {
    return (
      <Button
        onClick={() => router.push(ROUTES.auth.index)}
        variant="outline"
        size="icon"
        className="cursor-pointer"
      >
        <LogInIcon />
      </Button>
    );
  }
  const { submit } = useLogoutHandler();
  return (
    <UserNav
      iconOnly
      sections={{
        account: { enabled: true },
        notifications: { enabled: true },
        logout: { enabled: true, onClick: submit },
      }}
      user={user}
    />
  );
}
