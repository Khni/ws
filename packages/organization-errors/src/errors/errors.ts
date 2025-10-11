// Domain Errors (expected, user-facing)
export const OrganizationDomainErrorCodes = {
  ORGANIZATION_NAME_USED: "ORGANIZATION_NAME_USED",
} as const;

// Unexpected/Internal Errors
export const OrganizationUnexpectedErrorCodes = {
  ORGANIZATION_CREATION_FAILED: "ORGANIZATION_CREATION_FAILED",
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

// --- Domain Mapping ---
export const organizationDomainErrorMapping = {
  [OrganizationDomainErrorCodes.ORGANIZATION_NAME_USED]: {
    statusCode: 400, // Bad Request
    responseMessage: "Organization name is already taken.",
  },
} as const;

// --- Unexpected Mapping ---
export const organizationUnexpectedErrorMapping = {
  [OrganizationUnexpectedErrorCodes.ORGANIZATION_CREATION_FAILED]: {
    statusCode: 500, // Internal Server Error
    responseMessage: "Failed to create organization due to an internal error.",
  },
} as const;

// --- Combined Mapping ---
export const organizationErrorMapping = {
  ...organizationDomainErrorMapping,
  ...organizationUnexpectedErrorMapping,
} as const satisfies Record<
  OrganizationErrorCodesType,
  {
    statusCode: number;
    responseMessage: string;
  }
>;
