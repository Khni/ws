import prisma from "../../database/prisma.js";

export const getOrganizationFormDataService = async () => {
  const countriesWithStates = await prisma.country.findMany({
    select: {
      id: true,
      name: true,
      states: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const languages = await prisma.language.findMany({
    select: {
      id: true,
      name: true,
      code: true,
    },
  });

  const timezones = await prisma.timeZone.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  const fiscalYearPattern = await prisma.fiscalYearPattern.findMany({
    select: {
      id: true,
      label: true,
      code: true,
    },
  });

  const currencies = await prisma.currency.findMany({
    select: {
      id: true,
      name: true,
      code: true,
      symbol: true,
    },
  });

  return {
    countries: countriesWithStates,
    languages,
    timezones,
    fiscalYearPattern,
    currencies,
  };
};
