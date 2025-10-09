import prisma from "../../database/prisma.js";

export const getCountriesService = async ({
  where,
}: {
  where?: { name?: string };
}) => {
  const countries = await prisma.country.findMany({
    select: {
      id: true,
      name: true,
    },
    where: where?.name
      ? {
          name: {
            contains: where.name,
          },
        }
      : undefined,
  });

  return countries;
};
