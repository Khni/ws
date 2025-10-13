import {
  OrganizationCreateInput,
  OrganizationOrderByInput,
  OrganizationUpdateInput,
  OrganizationWhereInput,
  OrganizationWhereUniqueInput,
} from "@khaled/ims-shared";

import { PrismaTransactionManager } from "../core/database/PrismaTransactionManager.js";
import prisma from "../database/prisma.js";
import { Prisma, PrismaClient } from "../../generated/prisma/index.js";
import { OrganizationCreateManyInputSchema } from "../../generated/zod/index.js";

export class OrganizationRepository {
  constructor(private db: PrismaClient["organization"] = prisma.organization) {}

  async findFirst({
    where,
    orderBy,
  }: {
    where: OrganizationWhereInput;
    orderBy?: OrganizationOrderByInput;
  }) {
    try {
      return await this.db.findFirst({
        where,
        orderBy,
      });
    } catch (error: any) {
      throw new Error(`Error finding organization: ${error.message}`, {
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
      throw new Error(`Error: Organization Transaction failed`, {
        cause: error,
      });
    }
  }
  // Create a new organization with error handling
  async create({
    data,
    tx,
  }: {
    data: OrganizationCreateInput;
    tx?: PrismaTransactionManager | undefined;
  }) {
    const db = tx ? tx.organization : this.db;
    try {
      return await db.create({
        data,
        select: { id: true, name: true },
      });
    } catch (error: any) {
      throw new Error(`Error while creating organization: ${error.message}`, {
        cause: error,
      });
    }
  }

  // Update an existing organization with error handling
  async update({
    data,
    where,
    tx,
  }: {
    data: OrganizationUpdateInput;
    where: OrganizationWhereUniqueInput;
    tx?: PrismaTransactionManager;
  }) {
    const db = tx ? tx.organization : this.db;
    try {
      return await db.update({
        data,
        where,
      });
    } catch (error: any) {
      throw new Error(`Error while updating organization: ${error.message}`, {
        cause: error,
      });
    }
  }

  // Find multiple organizations with error handling
  async findMany({
    where,
    limit,
    offset,
    orderBy,
  }: {
    offset?: number;
    limit?: number;
    orderBy?: OrganizationOrderByInput;
    where?: OrganizationWhereInput;
  }) {
    try {
      return await this.db.findMany({
        where,
        take: limit,
        orderBy,
        skip: offset,
      });
    } catch (error: any) {
      throw new Error(`Error fetching organizations: ${error.message}`, {
        cause: error,
      });
    }
  }

  // Delete a organization with error handling
  async delete({
    where,
    tx,
  }: {
    where: OrganizationWhereUniqueInput;
    tx?: PrismaTransactionManager | undefined;
  }) {
    const db = tx ? tx.organization : this.db;
    try {
      return await db.delete({ where, select: { id: true } });
    } catch (error: any) {
      throw new Error(`Error deleting organization: ${error.message}`, {
        cause: error,
      });
    }
  }

  // Find a unique organization with error handling
  async findUnique({ where }: { where: OrganizationWhereUniqueInput }) {
    try {
      return await this.db.findUnique({
        where,
      });
    } catch (error: any) {
      throw new Error(`Error finding organization: ${error.message}`, {
        cause: error,
      });
    }
  }

  // Count organizations with error handling
  async count(params?: { where?: OrganizationWhereInput }) {
    try {
      return await this.db.count({
        where: params?.where,
      });
    } catch (error: any) {
      throw new Error(`Error counting organizations: ${error.message}`, {
        cause: error,
      });
    }
  }
}
