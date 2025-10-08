import prisma from "../../database/prisma.js";

export const getCountryStatesServices = async (
  countryId: number,
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
    },
  });
};
