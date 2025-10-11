import {
  IOrganizationRepository,
  OrganizationFilterInput,
  OrganizationUniqueInput,
} from "@khaled/organization";
import prisma from "../database/prisma.js";
import { Organization, Prisma } from "../../generated/prisma/index.js";

export class OrganizationRepository
  implements IOrganizationRepository<Organization>
{
  async findUnique(
    where: OrganizationUniqueInput
  ): Promise<Organization | null> {
    const prismaWhere: Prisma.OrganizationWhereUniqueInput =
      this.buildWhereClause(where);

    return prisma.organization.findUnique({
      where: prismaWhere,
    });
  }

  /**
   * Builds a Prisma-compatible where clause from OrganizationUniqueInput
   */
  private buildWhereClause(
    where: OrganizationUniqueInput
  ): Prisma.OrganizationWhereUniqueInput {
    if ("id" in where) {
      return { id: where.id };
    }

    if ("name" in where && "ownerId" in where) {
      return {
        name_ownerId: {
          name: where.name,
          ownerId: where.ownerId,
        },
      };
    }

    throw new Error(
      "Invalid OrganizationUniqueInput: must include either `id` or both `name` and `ownerId`."
    );
  }
  async findMany(where: OrganizationFilterInput): Promise<Organization[]> {
    return await prisma.organization.findMany({
      where,
    });
  }
  async count(where: OrganizationFilterInput): Promise<number> {
    return await prisma.organization.count({
      where,
    });
  }
  async create(
    data: Prisma.OrganizationCreateManyInput
  ): Promise<Organization> {
    return await prisma.organization.create({
      data,
    });
  }
  async update(
    data: Prisma.OrganizationUpdateInput,
    where: { id: string }
  ): Promise<Organization> {
    return await prisma.organization.update({
      data,
      where,
    });
  }
}
