import prisma from "../../database/prisma.js";

export const getFilterdCountryTimesZonesServices = async (
  countryId: string
) => {
  return await prisma.timeZone.findMany({
    where: {
      Country: {
        some: {
          id: countryId,
        },
      },
    },

    select: {
      id: true,
      name: true,
    },
  });
};
