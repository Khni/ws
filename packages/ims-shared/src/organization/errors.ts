export const OrganizationDomainErrorCodes = {
  ORGANIZATION_NAME_USED: "ORGANIZATION_NAME_USED",
  ORGANIZATION_NOT_FOUND: "ORGANIZATION_NOT_FOUND",
  CREATION_ORGANIZATION_REACH_LIMIT: "CREATION_ORGANIZATION_REACH_LIMIT",
} as const;

// Unexpected/Internal Errors
export const OrganizationUnexpectedErrorCodes = {
  ORGANIZATION_CREATION_FAILED: "ORGANIZATION_CREATION_FAILED",
  ORGANIZATION_UPDATE_FAILED: "ORGANIZATION_UPDATE_FAILED",
} as const;

export type OrganizationDomainErrorCodesType =
  (typeof OrganizationDomainErrorCodes)[keyof typeof OrganizationDomainErrorCodes];

export type OrganizationUnexpectedErrorCodesType =
  (typeof OrganizationUnexpectedErrorCodes)[keyof typeof OrganizationUnexpectedErrorCodes];

// Combined
export const OrganizationErrorCodes = {
  ...OrganizationDomainErrorCodes,
  ...OrganizationUnexpectedErrorCodes,
} as const;

export type OrganizationErrorCodesType =
  (typeof OrganizationErrorCodes)[keyof typeof OrganizationErrorCodes];
