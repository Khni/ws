import prisma from "../../database/prisma.js";

export const getOrganizationFormDataService = async () => {
  const [
    countries,
    languages,
    timezones,
    fiscalYearPattern,
    currencies,
    industryCategories,
  ] = await Promise.all([
    prisma.country.findMany({
      select: {
        id: true,
        name: true,
      },
    }),
    prisma.language.findMany({
      select: {
        id: true,
        name: true,
        code: true,
      },
    }),
    prisma.timeZone.findMany({
      select: {
        id: true,
        name: true,
      },
    }),
    prisma.fiscalYearPattern.findMany({
      select: {
        id: true,
        label: true,
        code: true,
      },
    }),
    prisma.currency.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        symbol: true,
      },
    }),
    prisma.industryCategory.findMany({
      select: {
        id: true,
        label: true,
      },
    }),
  ]);

  return {
    countries,
    languages,
    timezones,
    fiscalYearPattern,
    currencies,
    industryCategories,
  };
};
