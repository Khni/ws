"use client";

import { useGetProfile } from "@/api";
import { GetUserProfileResponse } from "@/api/model";
import { ROUTES } from "@/constants";
import { Button } from "@workspace/ui/components/button";
import Loading from "@workspace/ui/core/loading/loading";
import { BriefcaseBusinessIcon, HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type DashboardButtonProps = {
  user: GetUserProfileResponse | undefined;
  isLoading: boolean;
};
export default function DashboardButton({
  isLoading,
  user,
}: DashboardButtonProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <Button variant="outline" size="icon" className="cursor-pointer">
        <Loading />
      </Button>
    );
  }
  if (!user) {
    return null;
  }

  return (
    <Button
      onClick={() => router.replace(ROUTES.app)}
      variant="outline"
      size="icon"
      className="cursor-pointer"
    >
      <BriefcaseBusinessIcon />
    </Button>
  );
}
