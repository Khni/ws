import { OrganizationDomainError } from "./errors/OrganizationDomainError.js";
import { OrganizationUnexpectedError } from "./errors/OrganizationUnexpectedError.js";
import { OrganizationRepository } from "./OrganizationRepository.js";
import {
  OrganizationCreateInput,
  OrganizationOrderByInput,
  OrganizationUnexpectedErrorCodesType,
  OrganizationUpdateInput,
  OrganizationWhereInput,
} from "@khaled/ims-shared";
export class OrganizationService {
  constructor(
    protected readonly organizationRepository: OrganizationRepository = new OrganizationRepository(),
    protected readonly organizationCreationLimit: number = 5
  ) {}

  private handleOrganizationError(
    error: unknown,
    code: OrganizationUnexpectedErrorCodesType,
    msg?: string,
    meta?: {}
  ): never {
    if (error instanceof OrganizationDomainError) throw error;
    throw new OrganizationUnexpectedError(code, error, msg, meta);
  }

  async create({ data }: { data: OrganizationCreateInput }) {
    try {
      // Check if organization name is taken for this owner
      const existingOrganization = await this.organizationRepository.findUnique(
        {
          where: { name_ownerId: { name: data.name, ownerId: data.ownerId } },
        }
      );

      if (existingOrganization) {
        throw new OrganizationDomainError(
          "ORGANIZATION_NAME_USED",
          "Organization name is already taken for this owner"
        );
      }

      // Check organization creation limit
      const ownedOrgsCount = await this.organizationRepository.count({
        where: { ownerId: data.ownerId },
      });

      if (ownedOrgsCount >= this.organizationCreationLimit) {
        throw new OrganizationDomainError(
          "CREATION_ORGANIZATION_REACH_LIMIT",
          `User cannot create more than ${this.organizationCreationLimit} organizations`
        );
      }

      const organization = await this.organizationRepository.create({ data });

      return organization;
    } catch (error) {
      this.handleOrganizationError(
        error,
        "ORGANIZATION_CREATION_FAILED",
        "Failed to create organization",
        { data }
      );
    }
  }

  async update({
    data,
    where,
  }: {
    data: OrganizationUpdateInput;
    where: { id: string };
  }) {
    try {
      const existingOrg = await this.organizationRepository.findUnique({
        where: { id: where.id },
      });
      if (!existingOrg) {
        throw new OrganizationDomainError(
          "ORGANIZATION_NOT_FOUND",
          "Organization not found"
        );
      }

      if (data.name) {
        // Check if name is taken by another organization of the same owner
        const nameTakenOrg = await this.organizationRepository.findUnique({
          where: {
            name_ownerId: { name: data.name, ownerId: existingOrg.ownerId },
          },
        });

        if (nameTakenOrg && nameTakenOrg.id !== where.id) {
          throw new OrganizationDomainError(
            "ORGANIZATION_NAME_USED",
            "Organization name is already taken for this owner"
          );
        }
      }

      const organization = await this.organizationRepository.update({
        data,
        where,
      });

      return organization;
    } catch (error) {
      this.handleOrganizationError(
        error,
        "ORGANIZATION_UPDATE_FAILED",
        "Failed to update organization",
        { data, where }
      );
    }
  }

  async findById(id: string) {
    const organization = await this.organizationRepository.findUnique({
      where: { id },
    });

    return organization;
  }
  protected async findMany({
    page = 0,
    pageSize = 200,
    where,
    orderBy,
  }: {
    where?: OrganizationWhereInput;
    limit?: number;
    offset?: number;
    orderBy?: OrganizationOrderByInput;
    page?: number;
    pageSize?: number;
  }) {
    if (pageSize > 300) {
      throw new Error("Organization page size must not exceed 300");
    }

    const offset = page * pageSize;
    const limit = pageSize;
    const totalCount = await this.organizationRepository.count({
      where,
    });
    const list = await this.organizationRepository.findMany({
      where,
      limit,
      offset,
      orderBy,
    });
    return {
      list,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }
  findUserOrganizations = async (userId: string) => {
    return await this.organizationRepository.findMany({
      where: { userRoles: { some: { userId } } },
    });
  };
  findOwnedOrganizations = async (ownerId: string) => {
    return await this.organizationRepository.findMany({
      where: { ownerId },
    });
  };
  async delete(id: string) {
    const deleted = await this.organizationRepository.delete({
      where: { id },
    });
    return deleted;
  }
}
