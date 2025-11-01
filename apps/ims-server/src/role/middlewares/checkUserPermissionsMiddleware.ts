import { Request, Response, NextFunction } from "express";
import { ActionName, ResourceName } from "../../../generated/prisma/index.js";
import { getUserRolesInOrgByPermissionQuery } from "../roleQueries.js";

/**
 * Middleware factory to check if a user has any of the given permissions.
 */
export function checkPermissionMiddleware(
  permissions: { action: ActionName; resource: ResourceName }[]
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id; // assumes user is already authenticated and set on req
      const organizationId = req.params.organizationId;

      if (!userId || !organizationId) {
        return res
          .status(401)
          .json({
            message: "Unauthorized: missing user or organization context.",
          });
      }

      const roles = await getUserRolesInOrgByPermissionQuery({
        organizationId,
        userId,
        permissions,
      });

      if (roles.length === 0) {
        return res
          .status(403)
          .json({ message: "Forbidden: insufficient permissions." });
      }

      next();
    } catch (error) {
      console.error("Permission check failed:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error while checking permissions." });
    }
  };
}
