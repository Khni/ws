import prisma from "../../database/prisma.js";

export const isUserMemberOfOrganization = async (
  userId: string,
  organizationId: string
): Promise<boolean> => {
  const membership = await prisma.userRole.findFirst({
    where: {
      organizationId,
      userId,
    },
  });
  return membership !== null;
};
