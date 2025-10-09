import { Prisma } from "../../../generated/prisma/index.js";
import prisma from "../../database/prisma.js";

export const createOrgnization = async (
  data: Prisma.OrganizationUncheckedCreateInput
) => {
  const isNameTaken = await prisma.organization.findUnique({
    where: { name_ownedById: { name: data.name, ownedById: data.ownedById } },
  });
  if (isNameTaken) {
    throw new Error("Organization name is already taken");
  }
  const organization = await prisma.organization.create({
    data,
  });
  return organization;
};
