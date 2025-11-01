/* -------------------------------------------------------------------------- */
/*                                  ROLE MODEL                                */
/* -------------------------------------------------------------------------- */

/**
 * Base Role model definition.
 */
export type RoleModel = {
  id: string;
  name: string;
  description?: string;
  organizationId: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
};

/**
 * Flexible filter type for querying roles.
 */
export type RoleWhereInput = Partial<RoleModel>;

export interface RoleFilters {
  /**
   * @format uuid
   */
  organizationId: string;
  name?: string; // this for containing
}

/* -------------------------------------------------------------------------- */
/*                             CREATE ROLE TYPES                              */
/* -------------------------------------------------------------------------- */

/**
 * Base input type for creating a role in the service layer.
 * Excludes automatically managed fields like ID and timestamps.
 */
export type RoleCreateInput = Omit<
  RoleModel,
  "id" | "createdAt" | "updatedAt" | "expiresAt"
>;

/**
 * Form input type — used in frontend forms.
 * Excludes backend-managed fields (organization & creator).
 */
export type RoleCreateForm = Omit<
  RoleCreateInput,
  "createdById" | "organizationId"
>;

/**
 * API request body type — sent to backend.
 * Includes permissions array.
 */
export type RoleCreateBody = Omit<RoleCreateInput, "createdById"> & {
  permissions: RolePermissionCreateManyInput;
};

/* -------------------------------------------------------------------------- */
/*                             UPDATE ROLE TYPES                              */
/* -------------------------------------------------------------------------- */

/**
 * Base input type for updating a role.
 * Similar to creation, but excludes createdById.
 */
export type RoleUpdateInput = Omit<RoleCreateInput, "createdById">;

/**
 * Form input type — used in frontend forms for updating roles.
 */
export type RoleUpdateForm = Omit<RoleUpdateInput, "organizationId">;

/**
 * API request body type — sent to backend during updates.
 * Includes permissions array.
 */
export type RoleUpdateBody = RoleUpdateInput & {
  permissions: RolePermissionCreateManyInput;
};

/* -------------------------------------------------------------------------- */
/*                           ROLE PERMISSION TYPES                            */
/* -------------------------------------------------------------------------- */

/**
 * Represents multiple role-permission associations.
 */
export type RolePermissionCreateManyInput = {
  roleId: string;
  permissionId: string;
}[];

/* -------------------------------------------------------------------------- */
/*                           QUERY SUPPORT TYPES                              */
/* -------------------------------------------------------------------------- */

/**
 * Unique identifier options for fetching a role.
 */
export type RoleWhereUniqueInput =
  | { id: string }
  | { organizationId_name: { name: string; organizationId: string } };

/**
 * Defines sorting options for role queries.
 */
export type RoleOrderByInput =
  | Partial<Record<keyof RoleModel, "asc" | "desc">>
  | undefined;
