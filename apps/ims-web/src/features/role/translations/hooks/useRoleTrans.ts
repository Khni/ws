import { useTranslations } from "next-intl";

export const useRoleTranslations = () => {
  const roleFieldTranslations = useTranslations("role.fields");
  const roleHeaderTranslations = useTranslations("role.headers");
  const roleErrorTranslations = useTranslations("role.errors");
  const roleColumnHeaderTranslations = useTranslations("role.columnHeaders");

  return {
    roleFieldTranslations,
    roleHeaderTranslations,
    roleErrorTranslations,
    roleColumnHeaderTranslations,
  };
};
