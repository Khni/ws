import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
// locales.ts
export const LOCALE_LABELS = {
  en: "EN",
  ar: "AR",
} as const;

export type Locale = keyof typeof LOCALE_LABELS;

export const SUPPORTED_LOCALES: Locale[] = Object.keys(
  LOCALE_LABELS
) as Locale[];

import React from "react";

export type LanguageSwitcherProps = {
  updateLocale: (locale: Locale) => void;
  locale: Locale;
};

export default function LanguageSwitcher({
  locale,
  updateLocale,
}: LanguageSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <div className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all">
            {LOCALE_LABELS[locale] ?? "??"}
          </div>
          <span className="sr-only">Language Switcher</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LOCALES.map((loc) => (
          <DropdownMenuItem key={loc} onClick={() => updateLocale(loc)}>
            {LOCALE_LABELS[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
