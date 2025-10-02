"use client";

import { useUserPreferencesContext } from "@workspace/ui/blocks/providers/UserPreferencesContext";
import LanguageSwitcher from "@workspace/ui/core/settings/langauge-switcher";

export default function LangaugeSwitcherBtn() {
  const { locale, updateLocale, rtl } = useUserPreferencesContext();

  return <LanguageSwitcher locale={locale} updateLocale={updateLocale} />;
}
