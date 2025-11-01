import { ActionName, ResourceName } from "../../generated/prisma/index.js";
import prisma from "../database/prisma.js";

export async function getUserRolesInOrgByPermissionQuery({
  organizationId,
  userId,
  permissions,
}: {
  organizationId: string;
  userId: string;
  permissions: { action: ActionName; resource: ResourceName }[];
}) {
  const result = await prisma.userRole.findMany({
    where: {
      userId,
      organizationId,
      status: "ACTIVE",
      role: {
        rolePermissions: {
          some: {
            isActive: true,
            OR: permissions.map(({ action, resource }) => ({
              permission: {
                action: { name: action },
                resource: { name: resource },
              },
            })),
          },
        },
      },
    },
    select: { id: true },
  });

  return result;
}
