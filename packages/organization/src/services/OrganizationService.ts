import { OrganizationDomainError } from "@khaled/organization-errors";
import {
  IOrganizationRepository,
  OrganizationCreateInput,
  Organization,
  OrganizationUpdateInput,
} from "../interfaces/IOrganizationRepository.js";
import { ICache } from "@khaled/utils";

export class OrganizationService {
  constructor(
    protected readonly organizationRepository: IOrganizationRepository,
    protected readonly cache: ICache,
    protected readonly organizationCachePathKey: string = "organizations",
    protected readonly organizationCreationLimit: number = 5
  ) {}

  protected getCacheKey(organizationId: string): string {
    return `${this.organizationCachePathKey}:${organizationId}`;
  }

  protected getOwnerCacheKey(ownerId: string): string {
    return `${this.organizationCachePathKey}:owner:${ownerId}`;
  }

  protected getUserCacheKey(userId: string): string {
    return `${this.organizationCachePathKey}:user:${userId}`;
  }

  protected async invalidateOrganizationCache(
    organizationId: string,
    ownerId: string
  ): Promise<void> {
    await Promise.all([
      this.cache.del(this.getCacheKey(organizationId)),
      this.cache.del(this.getOwnerCacheKey(ownerId)),
      this.cache.del(`${this.organizationCachePathKey}:list`),
    ]);
  }

  async create({
    data,
  }: {
    data: OrganizationCreateInput;
  }): Promise<Organization> {
    // Check if organization name is taken for this owner
    const existingOrganization = await this.organizationRepository.findUnique({
      name: data.name,
      ownerId: data.ownerId,
    });

    if (existingOrganization) {
      throw new OrganizationDomainError(
        "ORGANIZATION_NAME_USED",
        "Organization name is already taken for this owner"
      );
    }

    // Check organization creation limit
    const ownedOrgsCount = await this.organizationRepository.count({
      ownerId: data.ownerId,
    });

    if (ownedOrgsCount >= this.organizationCreationLimit) {
      throw new OrganizationDomainError(
        "CREATION_ORGANIZATION_REACH_LIMIT",
        `User cannot create more than ${this.organizationCreationLimit} organizations`
      );
    }

    const organization = await this.organizationRepository.create(data);

    // Invalidate relevant caches
    await this.invalidateOrganizationCache(
      organization.id,
      organization.ownerId
    );

    return organization;
  }

  async update({
    data,
    where,
  }: {
    data: OrganizationUpdateInput;
    where: { id: string };
  }): Promise<Organization> {
    if (data.name) {
      const existingOrg = await this.organizationRepository.findUnique({
        id: where.id,
      });
      if (!existingOrg) {
        throw new OrganizationDomainError(
          "ORGANIZATION_NOT_FOUND",
          "Organization not found"
        );
      }

      // Check if name is taken by another organization of the same owner
      const nameTakenOrg = await this.organizationRepository.findUnique({
        name: data.name,
        ownerId: existingOrg.ownerId,
      });

      if (nameTakenOrg && nameTakenOrg.id !== where.id) {
        throw new OrganizationDomainError(
          "ORGANIZATION_NAME_USED",
          "Organization name is already taken for this owner"
        );
      }
    }

    const organization = await this.organizationRepository.update(data, where);

    // Invalidate relevant caches
    await this.invalidateOrganizationCache(
      organization.id,
      organization.ownerId
    );

    return organization;
  }

  async findById(id: string): Promise<Organization | null> {
    const cacheKey = this.getCacheKey(id);

    // Try cache first
    const cached = await this.cache.get<Organization>(cacheKey);
    if (cached) {
      return cached;
    }

    const organization = await this.organizationRepository.findUnique({ id });

    if (organization) {
      // Cache for 5 minutes
      await this.cache.set(cacheKey, organization, 300);
    }

    return organization;
  }

  async getByOwnerId(ownerId: string): Promise<Organization[]> {
    const cacheKey = this.getOwnerCacheKey(ownerId);

    const cached = await this.cache.get<Organization[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const organizations = await this.organizationRepository.findMany({
      ownerId,
    });

    // Cache for 2 minutes
    await this.cache.set(cacheKey, organizations, 120);

    return organizations;
  }

  async countByOwner(ownerId: string): Promise<number> {
    return this.organizationRepository.count({ ownerId });
  }

  //   async isUserMember(userId: string, organizationId: string): Promise<boolean> {
  //     const membership = await this.organizationRepository.findUserMembership({
  //       organizationId,
  //       userId,
  //     });
  //     return membership !== null;
  //   }

  //   async getManyByUserId(userId: string): Promise<Organization[]> {
  //     const cacheKey = this.getUserCacheKey(userId);

  //     // Try cache first
  //     const cached = await this.cache.get<Organization[]>(cacheKey);
  //     if (cached) {
  //       return cached;
  //     }

  //     const organizations =
  //       await this.organizationRepository.findUserOrganizations(userId);

  //     // Cache for 2 minutes
  //     await this.cache.set(cacheKey, organizations, 120);

  //     return organizations;
  //   }
}
