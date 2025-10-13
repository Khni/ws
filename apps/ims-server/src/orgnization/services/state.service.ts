import prisma from "../../database/prisma.js";

export const getFilterdCountryStatesServices = async (
  countryId: string,
  name?: string
) => {
  return await prisma.state.findMany({
    where: {
      countryId,
      name: {
        contains: name,
      },
    },

    select: {
      id: true,
      name: true,
      country: { select: { timezones: true } },
    },
  });
};
