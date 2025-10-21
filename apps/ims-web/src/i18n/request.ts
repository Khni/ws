import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";

  // Dynamically import multiple message files
  const [common, auth, organization, roles] = await Promise.all([
    (await import(`../../messages/common/${locale}.json`)).default,
    (await import(`../../messages/auth/${locale}.json`)).default,
    (await import(`../../messages/organization/${locale}.json`)).default,
    (await import(`../features/role/translations/messages/${locale}.json`))
      .default,
  ]);

  return {
    locale,
    messages: {
      ...common,
      ...auth,
      ...organization,
      ...roles,
    },
  };
});
