export const RoleDomainErrorCodes = {
  ROLE_NAME_USED: "ROLE_NAME_USED",
  ROLE_NOT_FOUND: "ROLE_NOT_FOUND",
  ROLE_CREATION_LIMIT_REACHED: "ROLE_CREATION_LIMIT_REACHED",
} as const;

// Unexpected/Internal Errors
export const RoleUnexpectedErrorCodes = {
  ROLE_CREATION_FAILED: "ROLE_CREATION_FAILED",
  ROLE_UPDATE_FAILED: "ROLE_UPDATE_FAILED",
} as const;

export type RoleDomainErrorCodesType =
  (typeof RoleDomainErrorCodes)[keyof typeof RoleDomainErrorCodes];

export type RoleUnexpectedErrorCodesType =
  (typeof RoleUnexpectedErrorCodes)[keyof typeof RoleUnexpectedErrorCodes];

// Combined
export const RoleErrorCodes = {
  ...RoleDomainErrorCodes,
  ...RoleUnexpectedErrorCodes,
} as const;

export type RoleErrorCodesType =
  (typeof RoleErrorCodes)[keyof typeof RoleErrorCodes];
