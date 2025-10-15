import {
  RoleCreateInput,
  RoleOrderByInput,
  RolePermissionCreateManyInput,
  RoleUpdateInput,
  RoleWhereInput,
  RoleWhereUniqueInput,
} from "@khaled/ims-shared";

import { PrismaTransactionManager } from "../core/database/PrismaTransactionManager.js";
import prisma from "../database/prisma.js";
import {
  Prisma,
  PrismaClient,
  RolePermission,
} from "../../generated/prisma/index.js";

export class RoleRepository {
  constructor(private db: PrismaClient["role"] = prisma.role) {}

  async findFirst({
    where,
    orderBy,
  }: {
    where: RoleWhereInput;
    orderBy?: RoleOrderByInput;
  }) {
    try {
      return await this.db.findFirst({
        where,
        orderBy,
      });
    } catch (error: any) {
      throw new Error(`Error finding role: ${error.message}`, {
        cause: error,
      });
    }
  }

  async createTransaction<T>(
    callback: (tx: PrismaTransactionManager) => Promise<T>
  ): Promise<T> {
    try {
      return await prisma.$transaction(async (tx) => {
        return await callback(tx);
      });
    } catch (error) {
      throw new Error(`Error: Role Transaction failed`, {
        cause: error,
      });
    }
  }
  // Create a new role with error handling
  async create({
    data,
    rolePermissionsData,
    tx,
  }: {
    data: RoleCreateInput;
    rolePermissionsData?: RolePermissionCreateManyInput;
    tx?: PrismaTransactionManager | undefined;
  }) {
    const db = tx ? tx.role : this.db;
    try {
      return await db.create({
        data: {
          ...data,
          rolePermissions: rolePermissionsData && {
            createMany: {
              data: rolePermissionsData,
            },
          },
        },
        select: { id: true, name: true },
      });
    } catch (error: any) {
      throw new Error(`Error while creating role: ${error.message}`, {
        cause: error,
      });
    }
  }

  // Update an existing role with error handling
  async update({
    data,
    where,
    tx,
  }: {
    data: RoleUpdateInput;
    where: RoleWhereUniqueInput;
    tx?: PrismaTransactionManager;
  }) {
    const db = tx ? tx.role : this.db;
    try {
      return await db.update({
        data,
        where,
      });
    } catch (error: any) {
      throw new Error(`Error while updating role: ${error.message}`, {
        cause: error,
      });
    }
  }

  // Find multiple roles with error handling
  async findMany({
    where,
    limit,
    offset,
    orderBy,
  }: {
    offset?: number;
    limit?: number;
    orderBy?: RoleOrderByInput;
    where?: RoleWhereInput;
  }) {
    try {
      return await this.db.findMany({
        where,
        take: limit,
        orderBy,
        skip: offset,
      });
    } catch (error: any) {
      throw new Error(`Error fetching roles: ${error.message}`, {
        cause: error,
      });
    }
  }

  // Delete a role with error handling
  async delete({
    where,
    tx,
  }: {
    where: RoleWhereUniqueInput;
    tx?: PrismaTransactionManager | undefined;
  }) {
    const db = tx ? tx.role : this.db;
    try {
      return await db.delete({ where, select: { id: true } });
    } catch (error: any) {
      throw new Error(`Error deleting role: ${error.message}`, {
        cause: error,
      });
    }
  }

  // Find a unique role with error handling
  async findUnique({ where }: { where: RoleWhereUniqueInput }) {
    try {
      return await this.db.findUnique({
        where,
      });
    } catch (error: any) {
      throw new Error(`Error finding role: ${error.message}`, {
        cause: error,
      });
    }
  }

  // Count roles with error handling
  async count(params?: { where?: RoleWhereInput }) {
    try {
      return await this.db.count({
        where: params?.where,
      });
    } catch (error: any) {
      throw new Error(`Error counting roles: ${error.message}`, {
        cause: error,
      });
    }
  }
}
