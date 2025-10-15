export enum UserRoleStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
}
export type RoleModel = {
  name: string;
  id: string;
  description?: string | null;
  organizationId: string;
  createdById: string;
  isSystem: boolean;
  status: UserRoleStatus;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date | null;
};

export type RoleCreateInput = Omit<RoleModel, "id" | "createdAt" | "updatedAt">;
export type RoleCreateBody = Omit<
  RoleModel,
  "id" | "createdAt" | "updatedAt" | "createdById"
>;

export type RoleUpdateInput = Partial<RoleModel>;
export type RoleWhereUniqueInput =
  | { id: string }
  | { organizationId_name: { name: string; organizationId: string } };
export type RoleWhereInput = Partial<RoleModel>;
export type RoleOrderByInput =
  | Partial<Record<keyof RoleModel, "asc" | "desc">>
  | undefined;
////-----------------------------------------------////
// role permission types
export type RolePermissionCreateManyInput = {
  roleId: string;
  permissionId: string;
}[];
