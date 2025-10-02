"use client";

import { ModeToggle } from "@workspace/ui/core/settings/mode-toggle";
import { useTheme } from "next-themes";

export default function ModeSwitcherBtn() {
  const { setTheme } = useTheme();
  return <ModeToggle setTheme={setTheme} />;
}
