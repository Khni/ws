import {
  RoleDomainErrorCodes,
  RoleErrorCodesType,
  RoleUnexpectedErrorCodes,
} from "@khaled/ims-shared";

// --- Domain Mapping ---
export const roleDomainErrorMapping = {
  [RoleDomainErrorCodes.ROLE_NAME_USED]: {
    statusCode: 400, // Bad Request
    responseMessage: "Role name is already taken.",
  },
  [RoleDomainErrorCodes.ROLE_NOT_FOUND]: {
    statusCode: 404, // Not Found
    responseMessage: "Role not found.",
  },
  [RoleDomainErrorCodes.ROLE_CREATION_LIMIT_REACHED]: {
    statusCode: 403, // Forbidden
    responseMessage: "Role creation limit reached.",
  },
} as const;

// --- Unexpected Mapping ---
export const roleUnexpectedErrorMapping = {
  [RoleUnexpectedErrorCodes.ROLE_CREATION_FAILED]: {
    statusCode: 500, // Internal Server Error
    responseMessage: "Failed to create role due to an internal error.",
  },
  [RoleUnexpectedErrorCodes.ROLE_UPDATE_FAILED]: {
    statusCode: 500, // Internal Server Error
    responseMessage: "Failed to update role due to an internal error.",
  },
} as const;

// --- Combined Mapping ---
export const roleErrorMapping = {
  ...roleDomainErrorMapping,
  ...roleUnexpectedErrorMapping,
} as const satisfies Record<
  RoleErrorCodesType,
  {
    statusCode: number;
    responseMessage: string;
  }
>;
