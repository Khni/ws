import {
  OrganizationDomainErrorCodes,
  OrganizationErrorCodesType,
  OrganizationUnexpectedErrorCodes,
} from "@khaled/ims-shared";

// --- Domain Mapping ---
export const organizationDomainErrorMapping = {
  [OrganizationDomainErrorCodes.ORGANIZATION_NAME_USED]: {
    statusCode: 400, // Bad Request
    responseMessage: "Organization name is already taken.",
  },
  [OrganizationDomainErrorCodes.ORGANIZATION_NOT_FOUND]: {
    statusCode: 404, // Not Found
    responseMessage: "Organization not found.",
  },
  [OrganizationDomainErrorCodes.CREATION_ORGANIZATION_REACH_LIMIT]: {
    statusCode: 403, // Forbidden
    responseMessage: "Organization creation limit reached.",
  },
} as const;

// --- Unexpected Mapping ---
export const organizationUnexpectedErrorMapping = {
  [OrganizationUnexpectedErrorCodes.ORGANIZATION_CREATION_FAILED]: {
    statusCode: 500, // Internal Server Error
    responseMessage: "Failed to create organization due to an internal error.",
  },
  [OrganizationUnexpectedErrorCodes.ORGANIZATION_UPDATE_FAILED]: {
    statusCode: 500, // Internal Server Error
    responseMessage: "Failed to update organization due to an internal error.",
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
