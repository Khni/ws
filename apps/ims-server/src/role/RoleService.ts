import {
  RoleCreateInput,
  RolePermissionCreateManyInput,
  RoleUpdateInput,
} from "@khaled/ims-shared";
import { RoleRepository } from "./RoleRepository.js";
import { RoleDomainError } from "./errors/RoleDomainError.js";

export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository = new RoleRepository(),
    private readonly roleCreationLimit: number = 10
  ) {}
  async create({
    data,
    rolePermissionsData,
  }: {
    data: RoleCreateInput;
    rolePermissionsData: RolePermissionCreateManyInput;
  }) {
    const rolesCount = await this.roleRepository.count({
      where: {
        organizationId: data.organizationId,
      },
    });
    if (rolesCount >= this.roleCreationLimit) {
      throw new RoleDomainError("ROLE_CREATION_LIMIT_REACHED");
    }
    const isUsedName = await this.roleRepository.findUnique({
      where: {
        organizationId_name: {
          organizationId: data.organizationId,
          name: data.name,
        },
      },
    });
    if (isUsedName) {
      throw new RoleDomainError("ROLE_NAME_USED");
    }
    return await this.roleRepository.create({
      data,
      rolePermissionsData:
        rolePermissionsData.length > 0 ? rolePermissionsData : undefined,
    });
  }

  async update({
    data,
    rolePermissionsData,
    id,
  }: {
    data: RoleUpdateInput;
    rolePermissionsData: RolePermissionCreateManyInput;
    id: string;
  }) {
    const { organizationId, name, description } = data;
    const isUsedName = await this.roleRepository.findUnique({
      where: {
        organizationId_name: {
          name,
          organizationId,
        },
      },
    });
    if (isUsedName) {
      throw new RoleDomainError("ROLE_NAME_USED");
    }
    return await this.roleRepository.createTransaction(async (tx) => {
      const role = await this.roleRepository.update({
        where: { id },
        data: { name, description, organizationId },
        tx,
      });

      await this.roleRepository.deleteManyRolePermissions({
        where: { roleId: id },
        tx,
      });
      //re create with the updated list
      await this.roleRepository.createManyRolePermissions({
        data: rolePermissionsData,
        tx,
      });
      return role;
    });
  }

  async find(id: string) {
    return await this.roleRepository.findUnique({
      where: { id },
    });
  }

  async delete(id: string) {
    return await this.roleRepository.delete({
      where: { id },
    });
  }
}
