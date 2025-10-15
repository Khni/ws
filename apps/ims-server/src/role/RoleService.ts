import {
  RoleCreateInput,
  RolePermissionCreateManyInput,
  RoleUpdateInput,
} from "@khaled/ims-shared";
import { RoleRepository } from "./RoleRepository.js";
import { RoleDomainError } from "./errors/RoleDomainError.js";

export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly roleCreationLimit: number = 10
  ) {}
  async createRole(
    data: RoleCreateInput,
    rolePermissionsData: RolePermissionCreateManyInput
  ) {
    const rolesCount = await this.roleRepository.count({
      where: {
        organizationId: data.organizationId,
      },
    });
    if (rolesCount >= this.roleCreationLimit) {
      throw new RoleDomainError("CREATION_ROLE_REACH_LIMIT");
    }
    const isUsedRoleName = await this.roleRepository.findUnique({
      where: {
        organizationId_name: {
          organizationId: data.organizationId,
          name: data.name,
        },
      },
    });
    if (isUsedRoleName) {
      throw new RoleDomainError("ROLE_NAME_USED");
    }
    return await this.roleRepository.create({
      data,
      rolePermissionsData:
        rolePermissionsData.length > 0 ? rolePermissionsData : undefined,
    });
  }

  async updateRole(id: string, data: RoleUpdateInput) {
    return await this.roleRepository.update({
      where: { id },
      data,
    });
  }

  async findRole(id: string) {
    return await this.roleRepository.findUnique({
      where: { id },
    });
  }

  async deleteRole(id: string) {
    return await this.roleRepository.delete({
      where: { id },
    });
  }
}
