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

export type RoleWhereInput = Partial<RoleModel>;

// create types

// remove default types
export type RoleCreateInput = Omit<
  RoleModel,
  "id" | "createdAt" | "updatedAt" | "expiresAt"
>;
export type RoleCreateForm = Omit<
  RoleCreateInput,
  "createdById" | "organizationId"
> & {
  permissions: RolePermissionCreateManyInput;
};
export type RoleCreateBody = Omit<RoleCreateInput, "createdById"> & {
  permissions: RolePermissionCreateManyInput;
};
// role permission types
export type RolePermissionCreateManyInput = {
  roleId: string;
  permissionId: string;
}[];
///
export type RoleUpdateInput = Partial<RoleModel>;
export type RoleWhereUniqueInput =
  | { id: string }
  | { organizationId_name: { name: string; organizationId: string } };

export type RoleOrderByInput =
  | Partial<Record<keyof RoleModel, "asc" | "desc">>
  | undefined;
////-----------------------------------------------////
